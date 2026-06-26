import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playDoorbell } from '../services/audio.js';

export default function Door3D({ onComplete }) {
  const containerRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);
  const [clickPrompt, setClickPrompt] = useState('Tap to Enter');

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Dark background initially
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 6); // Look at door directly

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Materials
    // Luxury Mahogany Wood Material
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.6,
      metalness: 0.1
    });

    // Premium Gold Material for handles & hinges
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A227,
      roughness: 0.2,
      metalness: 0.9
    });

    // Outer Beige Wall
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5EFE6,
      roughness: 0.9,
      metalness: 0.0
    });

    // 3. Meshes
    // Create Hinge Anchors (Pivot groups) so the doors rotate around their outer edges
    const leftHinge = new THREE.Group();
    leftHinge.position.set(-2, 0, 0); // Position at left edge of left door
    scene.add(leftHinge);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(2, 0, 0); // Position at right edge of right door
    scene.add(rightHinge);

    // Left Door Panel (geometry centered so offset X makes the pivot act on the outer edge)
    const doorGeometry = new THREE.BoxGeometry(2, 4.5, 0.15);
    const leftDoorMesh = new THREE.Mesh(doorGeometry, woodMaterial);
    leftDoorMesh.position.set(1, 0, 0); // Offset X by half width
    leftDoorMesh.castShadow = true;
    leftDoorMesh.receiveShadow = true;
    leftHinge.add(leftDoorMesh);

    // Right Door Panel
    const rightDoorMesh = new THREE.Mesh(doorGeometry, woodMaterial);
    rightDoorMesh.position.set(-1, 0, 0); // Offset X by half width (opposite direction)
    rightDoorMesh.castShadow = true;
    rightDoorMesh.receiveShadow = true;
    rightHinge.add(rightDoorMesh);

    // Door Handles (Golden Spheres)
    const handleGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    
    const leftHandle = new THREE.Mesh(handleGeometry, goldMaterial);
    leftHandle.position.set(1.7, 0, 0.15); // near center gap on front face
    leftHinge.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeometry, goldMaterial);
    rightHandle.position.set(-1.7, 0, 0.15); // near center gap on front face
    rightHinge.add(rightHandle);

    // Surrounding Wall Frame
    const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 0.5), wallMaterial);
    wallLeft.position.set(-3, 0, -0.1);
    wallLeft.receiveShadow = true;
    scene.add(wallLeft);

    const wallRight = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 0.5), wallMaterial);
    wallRight.position.set(3, 0, -0.1);
    wallRight.receiveShadow = true;
    scene.add(wallRight);

    const wallTop = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 0.5), wallMaterial);
    wallTop.position.set(0, 2.75, -0.1);
    wallTop.receiveShadow = true;
    scene.add(wallTop);

    // Floor (Beige Marble-like plane)
    const floorGeometry = new THREE.PlaneGeometry(12, 12);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xE8D5B7,
      roughness: 0.4
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // 4. Lighting
    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffe6cc, 0.5);
    scene.add(ambientLight);

    // Front Spotlight casting soft shadows onto the door
    const frontLight = new THREE.SpotLight(0xffffff, 1.2);
    frontLight.position.set(0, 3, 5);
    frontLight.castShadow = true;
    frontLight.shadow.mapSize.width = 1024;
    frontLight.shadow.mapSize.height = 1024;
    scene.add(frontLight);

    // Warm, Intense Light BEHIND the Door
    const backGlowLight = new THREE.PointLight(0xFFC107, 0, 15); // Initially 0 intensity
    backGlowLight.position.set(0, 0.5, -2);
    scene.add(backGlowLight);

    const backAmbient = new THREE.AmbientLight(0xFFB300, 0); // Back ambient
    scene.add(backAmbient);

    // 5. Animation Logic Variables
    let currentOpenAngle = 0;
    let targetOpenAngle = 0;
    let cameraTargetZ = 6;
    let backLightTargetIntensity = 0;

    // Hook up trigger variables to class/scoping variables
    const handleOpenTrigger = () => {
      targetOpenAngle = Math.PI / 1.7; // Swing open
      cameraTargetZ = 2.0; // Zoom camera in
      backLightTargetIntensity = 6.0; // Crank up the bright gold background light
      playDoorbell();
      setIsOpening(true);
      setClickPrompt('Welcome');
    };

    // Store trigger on window or element ref for mouse click mapping
    containerRef.current.addEventListener('click', () => {
      if (targetOpenAngle === 0) {
        handleOpenTrigger();
      }
    });

    // 6. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let animationFrameId;
    let completeCalled = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation (lerping)
      currentOpenAngle += (targetOpenAngle - currentOpenAngle) * 0.04;
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.035;
      
      // Interpolate background glow
      backGlowLight.intensity += (backLightTargetIntensity - backGlowLight.intensity) * 0.04;

      // Apply rotations to pivot hinges
      leftHinge.rotation.y = currentOpenAngle;    // Rotates outward (CW)
      rightHinge.rotation.y = -currentOpenAngle;  // Rotates outward (CCW)

      // Animate handles hovering micro-movement when closed
      if (targetOpenAngle === 0) {
        const time = Date.now() * 0.002;
        leftHandle.position.z = 0.15 + Math.sin(time) * 0.01;
        rightHandle.position.z = 0.15 + Math.sin(time) * 0.01;
      }

      renderer.render(scene, camera);

      // Trigger reveal completion callback when doors are mostly open and camera has zoomed
      if (isOpening && Math.abs(currentOpenAngle - targetOpenAngle) < 0.05 && !completeCalled) {
        completeCalled = true;
        setTimeout(() => {
          onComplete(); // Call React parent handler to switch view
        }, 800);
      }
    };
    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      doorGeometry.dispose();
      handleGeometry.dispose();
      floorGeometry.dispose();
      woodMaterial.dispose();
      goldMaterial.dispose();
      wallMaterial.dispose();
      floorMaterial.dispose();
      renderer.dispose();
    };
  }, [isOpening]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111111',
        zIndex: 999,
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Premium Glassmorphic Click overlay overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 36px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(201, 162, 39, 0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '50px',
          color: '#FFFFFF',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 0.5s ease',
          animation: 'pulseGlow 2s infinite'
        }}
      >
        {clickPrompt}
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px rgba(201, 162, 39, 0.2); border-color: rgba(201, 162, 39, 0.3); }
          50% { box-shadow: 0 0 25px rgba(201, 162, 39, 0.5); border-color: rgba(201, 162, 39, 0.7); }
          100% { box-shadow: 0 0 10px rgba(201, 162, 39, 0.2); border-color: rgba(201, 162, 39, 0.3); }
        }
      `}</style>
    </div>
  );
}
