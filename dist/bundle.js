// src/main.jsx
import React11 from "react";
import ReactDOM from "react-dom/client";

// src/App.jsx
import React10, { useState as useState8, useEffect as useEffect8 } from "react";

// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
function Navbar({ activeSection, onNavigate, onToggleAdmin, isAdminMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "staff", label: "Staff" },
    { id: "contact", label: "Contact" }
  ];
  const handleLinkClick = (id) => {
    setIsSidebarOpen(false);
    onNavigate(id);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", { className: `navbar-header ${isScrolled ? "scrolled" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "navbar-container" }, /* @__PURE__ */ React.createElement("a", { href: "#home", className: "logo", onClick: () => handleLinkClick("home") }, /* @__PURE__ */ React.createElement("img", { src: "./logo.png", alt: "Sadhana Salon Logo", className: "logo-img" }), /* @__PURE__ */ React.createElement("div", { className: "logo-text-wrapper" }, /* @__PURE__ */ React.createElement("span", null, "Sadhana"), /* @__PURE__ */ React.createElement("span", { className: "logo-sub" }, "Luxury Salon"))), /* @__PURE__ */ React.createElement("nav", { className: "nav-links" }, navItems.map((item) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: item.id,
      href: `#${item.id}`,
      className: `nav-link ${activeSection === item.id && !isAdminMode ? "active" : ""}`,
      onClick: () => handleLinkClick(item.id)
    },
    item.label
  )), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#dashboard",
      className: `nav-link ${isAdminMode ? "active" : ""}`,
      onClick: (e) => {
        e.preventDefault();
        onToggleAdmin();
      },
      style: { display: "flex", alignItems: "center", gap: "6px" }
    },
    /* @__PURE__ */ React.createElement(User, { size: 16 }),
    "Dashboard"
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "mobile-menu-btn",
      onClick: () => setIsSidebarOpen(true),
      "aria-label": "Open navigation menu"
    },
    /* @__PURE__ */ React.createElement(Menu, { size: 24 })
  ))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `sidebar-overlay ${isSidebarOpen ? "open" : ""}`,
      onClick: () => setIsSidebarOpen(false)
    }
  ), /* @__PURE__ */ React.createElement("div", { className: `mobile-sidebar ${isSidebarOpen ? "open" : ""}` }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "sidebar-close-btn",
      onClick: () => setIsSidebarOpen(false),
      "aria-label": "Close navigation menu"
    },
    /* @__PURE__ */ React.createElement(X, { size: 24 })
  ), /* @__PURE__ */ React.createElement("ul", { className: "sidebar-links" }, navItems.map((item) => /* @__PURE__ */ React.createElement("li", { key: item.id }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: `#${item.id}`,
      className: `sidebar-link ${activeSection === item.id && !isAdminMode ? "active" : ""}`,
      onClick: () => handleLinkClick(item.id)
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#dashboard",
      className: `sidebar-link ${isAdminMode ? "active" : ""}`,
      onClick: (e) => {
        e.preventDefault();
        setIsSidebarOpen(false);
        onToggleAdmin();
      },
      style: { display: "flex", alignItems: "center", gap: "8px" }
    },
    /* @__PURE__ */ React.createElement(User, { size: 18 }),
    "Admin Dashboard"
  )))));
}

// src/components/OffersBanner.jsx
import React2, { useEffect as useEffect2, useState as useState2 } from "react";

// src/services/db.js
var generateSVGPlaceholder = (bg, text, label) => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="'Poppins', sans-serif" font-weight="bold" font-size="28" fill="${text}">${label}</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="16" fill="${text}">Sadhana Luxury Salon</text></svg>`;
};
var SEED_SERVICES = [
  // Men's Salon
  {
    id: "m_haircut",
    gender: "men",
    category: "hair",
    name: "Classic Haircut",
    description: "Personalized haircut and styling by our senior barber, complete with a refreshing hair wash and hot towel service.",
    basePrice: 200,
    duration: 30,
    rating: 4.9,
    reviewsCount: 124,
    hasRange: false
  },
  {
    id: "m_beard",
    gender: "men",
    category: "hair",
    name: "Beard Trim & Detail",
    description: "Precision beard shaping, line definition, and conditioning with premium beard oils and hot towels.",
    basePrice: 100,
    duration: 20,
    rating: 4.8,
    reviewsCount: 96,
    hasRange: false
  },
  {
    id: "m_combo",
    gender: "men",
    category: "hair",
    name: "Hair + Beard Combo",
    description: "Our signature luxury grooming service combining the Classic Haircut and Beard Detail at an attractive price.",
    basePrice: 300,
    duration: 45,
    rating: 4.9,
    reviewsCount: 310,
    hasRange: false
  },
  {
    id: "m_massage",
    gender: "men",
    category: "facial",
    name: "Relaxing Face Massage",
    description: "A soothing head and facial massage using premium herbal oils to boost blood circulation and relieve stress.",
    basePrice: 200,
    duration: 25,
    rating: 4.7,
    reviewsCount: 52,
    hasRange: false
  },
  {
    id: "m_scrub",
    gender: "men",
    category: "facial",
    name: "Deep Cleansing Scrub",
    description: "Exfoliating massage using natural walnut and apricot scrub to remove dead cells, blackheads, and skin tan.",
    basePrice: 200,
    maxPrice: 300,
    defaultPrice: 250,
    duration: 30,
    rating: 4.8,
    reviewsCount: 84,
    hasRange: true,
    rangeLabel: "Scrub Intensity"
  },
  {
    id: "m_dtan",
    gender: "men",
    category: "facial",
    name: "D-Tan Therapy",
    description: "Advanced active tan removal therapy using lactic acid and gold scrub to restore skin's natural brightness.",
    basePrice: 350,
    maxPrice: 450,
    defaultPrice: 400,
    duration: 35,
    rating: 4.9,
    reviewsCount: 112,
    hasRange: true,
    rangeLabel: "Face & Neck Coverage"
  },
  {
    id: "m_cleanup",
    gender: "men",
    category: "facial",
    name: "Intense Face Cleanup",
    description: "Customized skin cleansing targeting acne, open pores, and blackhead removal, suitable for all oily/dry skins.",
    basePrice: 750,
    maxPrice: 1250,
    defaultPrice: 950,
    duration: 45,
    rating: 4.8,
    reviewsCount: 68,
    hasRange: true,
    rangeLabel: "Product Quality (Regular / Gold)"
  },
  {
    id: "m_facial",
    gender: "men",
    category: "facial",
    name: "Anti-Ageing Facial",
    description: "Nourishing facial therapy using vitamin-rich creams and gold masks to reduce wrinkles, firming skin texture.",
    basePrice: 1500,
    maxPrice: 3500,
    defaultPrice: 2e3,
    duration: 60,
    rating: 4.7,
    reviewsCount: 41,
    hasRange: true,
    rangeLabel: "Luxury Product Range"
  },
  {
    id: "m_hydra",
    gender: "men",
    category: "facial",
    name: "Luxury Hydra Facial",
    description: "Medical-grade hydradermabrasion system that cleanses, exfoliates, and hydrates with specialized nourishing serums.",
    basePrice: 3500,
    maxPrice: 7500,
    defaultPrice: 5e3,
    duration: 75,
    rating: 4.9,
    reviewsCount: 89,
    hasRange: true,
    rangeLabel: "Serum Formula Upgrades"
  },
  {
    id: "m_color1",
    gender: "men",
    category: "treatment",
    name: "Hair Color (Matrix)",
    description: "Ammonia-free Matrix color offering 100% gray coverage with rich, natural gloss and damage protection.",
    basePrice: 350,
    duration: 40,
    rating: 4.7,
    reviewsCount: 78,
    hasRange: false
  },
  {
    id: "m_color2",
    gender: "men",
    category: "treatment",
    name: "Hair Color (L'Oreal Professional)",
    description: "Premium L'Oreal INOA oil-delivery system coloring that strengthens hair fibers while giving long-lasting radiant color.",
    basePrice: 400,
    duration: 40,
    rating: 4.8,
    reviewsCount: 145,
    hasRange: false
  },
  {
    id: "m_keratin",
    gender: "men",
    category: "treatment",
    name: "Keratin Treatment",
    description: "Deep conditioning keratin infusion that eliminates frizz, relaxes curls, and restores protein strength.",
    basePrice: 2500,
    maxPrice: 4500,
    defaultPrice: 3500,
    duration: 90,
    rating: 4.9,
    reviewsCount: 92,
    hasRange: true,
    rangeLabel: "Hair Length / Density"
  },
  {
    id: "m_botox",
    gender: "men",
    category: "treatment",
    name: "Hair Botox Treatment",
    description: "Advanced anti-aging hair therapy that repairs split ends and deeply reconstructs broken bonds for ultra shine.",
    basePrice: 3500,
    maxPrice: 4500,
    defaultPrice: 4e3,
    duration: 90,
    rating: 4.9,
    reviewsCount: 56,
    hasRange: true,
    rangeLabel: "Product Volume Needed"
  },
  {
    id: "m_kerasmooth",
    gender: "men",
    category: "treatment",
    name: "Kerasmooth Smoothing",
    description: "Combination straightening & smoothing service containing keratin nourishment to make coarse hair manageable.",
    basePrice: 3800,
    maxPrice: 4500,
    defaultPrice: 4200,
    duration: 120,
    rating: 4.8,
    reviewsCount: 38,
    hasRange: true,
    rangeLabel: "Hair Texture Complexity"
  },
  {
    id: "m_headmassage",
    gender: "men",
    category: "treatment",
    name: "Therapeutic Head Massage",
    description: "Scalp massage using cooling camphor and olive oils to relieve headaches and boost relaxation.",
    basePrice: 150,
    duration: 20,
    rating: 4.8,
    reviewsCount: 201,
    hasRange: false
  },
  // Women's Salon
  {
    id: "w_haircut",
    gender: "women",
    category: "hair",
    name: "Stylist Haircut & Blowdry",
    description: "Fashion haircut (Layer, Step, Pixie, Bob) by senior stylists including deep hair wash and volume blow-dry.",
    basePrice: 400,
    maxPrice: 800,
    defaultPrice: 600,
    duration: 45,
    rating: 4.9,
    reviewsCount: 284,
    hasRange: true,
    rangeLabel: "Stylist Expertise (Senior / Master)"
  },
  {
    id: "w_styling",
    gender: "women",
    category: "hair",
    name: "Blow Dry & Hot Styling",
    description: "Elegant crimping, straightening, or soft curls for parties, corporate events, or casual get-togethers.",
    basePrice: 300,
    maxPrice: 600,
    defaultPrice: 450,
    duration: 30,
    rating: 4.8,
    reviewsCount: 162,
    hasRange: true,
    rangeLabel: "Ironing & Tong Upgrades"
  },
  {
    id: "w_color",
    gender: "women",
    category: "hair",
    name: "Root Touch-up & Global Color",
    description: "L'Oreal Majirel root touch-up or full hair coloring with customized highlights or balayage patterns.",
    basePrice: 600,
    maxPrice: 1200,
    defaultPrice: 850,
    duration: 60,
    rating: 4.7,
    reviewsCount: 198,
    hasRange: true,
    rangeLabel: "Color Brand & Volume"
  },
  {
    id: "w_smoothing",
    gender: "women",
    category: "hair",
    name: "Permanent Smoothening",
    description: "L'Oreal X-Tenso permanent straightening therapy giving straight, silky, and frizz-free hair for 6-8 months.",
    basePrice: 3e3,
    maxPrice: 5e3,
    defaultPrice: 4e3,
    duration: 150,
    rating: 4.9,
    reviewsCount: 88,
    hasRange: true,
    rangeLabel: "Hair Length (Shoulder / Waist)"
  },
  {
    id: "w_spa",
    gender: "women",
    category: "hair",
    name: "Deep Restorative Hair Spa",
    description: "Steam-infused scalp therapy using active matrix oils to target hair loss, split ends, and dry texture.",
    basePrice: 500,
    maxPrice: 1500,
    defaultPrice: 1e3,
    duration: 50,
    rating: 4.8,
    reviewsCount: 220,
    hasRange: true,
    rangeLabel: "Spa Treatment Type (Anti-Dandruff / Repair)"
  },
  {
    id: "w_basicfacial",
    gender: "women",
    category: "facial",
    name: "Radiance Basic Facial",
    description: "Standard skin cleanup with gentle scrub, cream massage, and soothing cucumber glow pack.",
    basePrice: 800,
    maxPrice: 1500,
    defaultPrice: 1200,
    duration: 45,
    rating: 4.7,
    reviewsCount: 104,
    hasRange: true,
    rangeLabel: "Massage Pack Brand"
  },
  {
    id: "w_bridal_facial",
    gender: "women",
    category: "facial",
    name: "O3+ Bridal Glow Facial",
    description: "Premium whitening & brightening facial therapy designed for brides, providing natural fairness and high glow.",
    basePrice: 2e3,
    maxPrice: 3500,
    defaultPrice: 2800,
    duration: 75,
    rating: 4.9,
    reviewsCount: 95,
    hasRange: true,
    rangeLabel: "O3+ Kit Selection"
  },
  {
    id: "w_hydra",
    gender: "women",
    category: "facial",
    name: "Advanced Hydra Facial",
    description: "Ultra-hydrating skin polishing treatment using vacuum extraction and skin serum infusion for immediate glass skin.",
    basePrice: 3500,
    maxPrice: 7500,
    defaultPrice: 5e3,
    duration: 75,
    rating: 4.9,
    reviewsCount: 167,
    hasRange: true,
    rangeLabel: "Serum Cocktail Potency"
  },
  {
    id: "w_peel",
    gender: "women",
    category: "facial",
    name: "Dermatological Chemical Peel",
    description: "Glycolic or Salicylic acid peel administered under expert care to remove blemishes, dark circles, and pigmentation.",
    basePrice: 2500,
    maxPrice: 4500,
    defaultPrice: 3500,
    duration: 45,
    rating: 4.8,
    reviewsCount: 61,
    hasRange: true,
    rangeLabel: "Peel Concentration"
  },
  {
    id: "w_threading",
    gender: "women",
    category: "facial",
    name: "Threading Services",
    description: "Eyebrows shaping, upper lip, chin, and forehead threading with cotton organic threads.",
    basePrice: 100,
    maxPrice: 300,
    defaultPrice: 150,
    duration: 15,
    rating: 4.7,
    reviewsCount: 520,
    hasRange: true,
    rangeLabel: "Threaded Areas Combo"
  },
  {
    id: "w_waxing",
    gender: "women",
    category: "facial",
    name: "Full Body Waxing (Rica)",
    description: "Smooth tan removal waxing using premium Rica chocolate wax, minimizing pain and rashes.",
    basePrice: 200,
    maxPrice: 800,
    defaultPrice: 500,
    duration: 45,
    rating: 4.8,
    reviewsCount: 390,
    hasRange: true,
    rangeLabel: "Body Part selection (Half arms / Full legs)"
  },
  {
    id: "w_partymakeup",
    gender: "women",
    category: "makeup",
    name: "Glam Party Makeup",
    description: "Full face HD party makeup including eyelashes, foundation matching, and setting spray for 12hr wear.",
    basePrice: 1500,
    maxPrice: 3e3,
    defaultPrice: 2200,
    duration: 60,
    rating: 4.9,
    reviewsCount: 142,
    hasRange: true,
    rangeLabel: "Stylist Tier (Senior / MAC Master)"
  },
  {
    id: "w_bridalmakeup",
    gender: "women",
    category: "makeup",
    name: "Luxury Bridal Makeup",
    description: "Elite wedding day makeup package: Airbrush or HD base, premium eyelashes, draping (Saree/Lehenga), and hair accessory assistance.",
    basePrice: 5e3,
    maxPrice: 1e4,
    defaultPrice: 7500,
    duration: 120,
    rating: 5,
    reviewsCount: 78,
    hasRange: true,
    rangeLabel: "HD / Airbrush Technique"
  },
  {
    id: "w_eyemakeup",
    gender: "women",
    category: "makeup",
    name: "Eye Makeup Only",
    description: "Smokey eye, glitter details, winged liner, and lash application to highlight eyes.",
    basePrice: 500,
    maxPrice: 1e3,
    defaultPrice: 750,
    duration: 30,
    rating: 4.8,
    reviewsCount: 93,
    hasRange: true,
    rangeLabel: "Glitter & Lash Selection"
  }
];
var SEED_STAFF = [
  {
    id: "rahul",
    name: "Rahul Sharma",
    photo: generateSVGPlaceholder("#3e2723", "#ffffff", "Rahul Sharma"),
    specialty: "Master Barber & Hair Stylist",
    experience: 8,
    rating: 4.9,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableHours: "10:00 AM - 8:00 PM",
    certifications: ["Matrix Color Master", "Male Styling Expert"]
  },
  {
    id: "priya",
    name: "Priya Patel",
    photo: generateSVGPlaceholder("#4a148c", "#ffffff", "Priya Patel"),
    specialty: "Aesthetician & Facial Specialist",
    experience: 6,
    rating: 4.8,
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    availableHours: "11:00 AM - 8:00 PM",
    certifications: ["HydraFacial Certified MD", "Chemical Peel Expert"]
  },
  {
    id: "vikram",
    name: "Vikram Singh",
    photo: generateSVGPlaceholder("#006064", "#ffffff", "Vikram Singh"),
    specialty: "Senior Stylist & Grooming Expert",
    experience: 7,
    rating: 4.7,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday", "Sunday"],
    availableHours: "10:00 AM - 7:00 PM",
    certifications: ["L'Oreal Color Specialist", "Bond Treatment Master"]
  },
  {
    id: "ananya",
    name: "Ananya Sen",
    photo: generateSVGPlaceholder("#880e4f", "#ffffff", "Ananya Sen"),
    specialty: "Bridal Makeup Artist & Hair Spa",
    experience: 10,
    rating: 4.9,
    availableDays: ["Friday", "Saturday", "Sunday"],
    availableHours: "10:00 AM - 8:00 PM",
    certifications: ["MAC Pro Makeup Artist", "Bridal Draping Expert"]
  }
];
var SEED_REVIEWS = [
  {
    id: "rev1",
    author: "Amit Verma",
    rating: 5,
    text: "Got the Hair + Beard combo from Rahul. Absolute professional work. The hot towel massage was extremely relaxing and worth every rupee!",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    date: "2026-06-18",
    helpful: 12
  },
  {
    id: "rev2",
    author: "Shreya Ghoshal",
    rating: 5,
    text: "Priya performed the Hydra Facial, and my skin felt absolutely glowing and plump instantly. Very luxurious experience, highly recommended!",
    serviceId: "w_hydra",
    serviceName: "Advanced Hydra Facial",
    date: "2026-06-20",
    helpful: 24
  },
  {
    id: "rev3",
    author: "Rohan Das",
    rating: 4,
    text: "Decent Anti-Ageing Facial. Price is slightly on the higher range but service is top-notch. Clean atmosphere.",
    serviceId: "m_facial",
    serviceName: "Anti-Ageing Facial",
    date: "2026-06-15",
    helpful: 5
  },
  {
    id: "rev4",
    author: "Meera Nair",
    rating: 5,
    text: "Had my Bridal Makeup done by Ananya. Her work is perfect. She did both the HD foundation base and the saree draping wonderfully.",
    serviceId: "w_bridalmakeup",
    serviceName: "Luxury Bridal Makeup",
    date: "2026-06-10",
    helpful: 48
  },
  {
    id: "rev5",
    author: "Siddharth Malhotra",
    rating: 5,
    text: "Very neat haircut and precise beard trimming. Vikram is my go-to guy at Sadhana. Clean workspace.",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    date: "2026-06-21",
    helpful: 8
  }
];
var SEED_OFFERS = [
  {
    id: "coupon_gold",
    discount: "20%",
    type: "percentage",
    code: "GOLD20",
    description: "20% Off Bridal Makeup Packages",
    validTill: "2026-07-31",
    applicableServices: ["w_bridalmakeup"]
  },
  {
    id: "coupon_first",
    discount: "\u20B9100",
    type: "flat",
    code: "BEARD100",
    description: "Flat \u20B9100 Off Hair + Beard Grooming Combo",
    validTill: "2026-07-15",
    applicableServices: ["m_combo"]
  },
  {
    id: "coupon_glow",
    discount: "15%",
    type: "percentage",
    code: "GLOW15",
    description: "15% Off HydraFacials & Premium Facials",
    validTill: "2026-07-25",
    applicableServices: ["w_hydra", "m_hydra", "w_bridal_facial"]
  }
];
var SEED_GALLERY = [
  {
    id: "gal1",
    category: "hair",
    title: "Signature Undercut & Beard Shape",
    before: generateSVGPlaceholder("#333333", "#bbbbbb", "Before (Messy Hair & Beard)"),
    after: generateSVGPlaceholder("#1a1a1a", "#C9A227", "After (Crisp Undercut & Defined Beard)")
  },
  {
    id: "gal2",
    category: "facial",
    title: "Hydra Facial Glow Transformation",
    before: generateSVGPlaceholder("#f0f0f0", "#888888", "Before (Dull, Tanned Skin)"),
    after: generateSVGPlaceholder("#ffffff", "#27AE60", "After (Bright, Hydrated Skin)")
  },
  {
    id: "gal3",
    category: "makeup",
    title: "Bridal Draping & Glow Makeup",
    before: generateSVGPlaceholder("#ffebee", "#c2185b", "Before (Casual Makeup)"),
    after: generateSVGPlaceholder("#fce4ec", "#d81b60", "After (HD Airbrush Bridal Finish)")
  }
];
var SEED_BOOKINGS = [
  {
    id: "b_001",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "10:30 AM",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    price: 300,
    staffId: "rahul",
    staffName: "Rahul Sharma",
    customerName: "Sanjay Kumar",
    customerPhone: "9876543210",
    customerEmail: "sanjay@gmail.com",
    status: "confirmed"
  },
  {
    id: "b_002",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "12:00 PM",
    serviceId: "w_hydra",
    serviceName: "Advanced Hydra Facial",
    price: 5e3,
    staffId: "priya",
    staffName: "Priya Patel",
    customerName: "Aditi Rao",
    customerPhone: "9988776655",
    customerEmail: "aditi@outlook.com",
    status: "completed"
  },
  {
    id: "b_003",
    date: new Date(Date.now() + 864e5).toISOString().split("T")[0],
    // Tomorrow
    time: "02:30 PM",
    serviceId: "w_bridalmakeup",
    serviceName: "Luxury Bridal Makeup",
    price: 7500,
    staffId: "ananya",
    staffName: "Ananya Sen",
    customerName: "Kriti Sanon",
    customerPhone: "9000800070",
    customerEmail: "kriti@wedding.in",
    status: "confirmed"
  }
];
var LocalDatabase = class {
  constructor() {
    this.init();
  }
  init() {
    if (!localStorage.getItem("sadhana_services")) {
      localStorage.setItem("sadhana_services", JSON.stringify(SEED_SERVICES));
    }
    if (!localStorage.getItem("sadhana_staff")) {
      localStorage.setItem("sadhana_staff", JSON.stringify(SEED_STAFF));
    }
    if (!localStorage.getItem("sadhana_reviews")) {
      localStorage.setItem("sadhana_reviews", JSON.stringify(SEED_REVIEWS));
    }
    if (!localStorage.getItem("sadhana_offers")) {
      localStorage.setItem("sadhana_offers", JSON.stringify(SEED_OFFERS));
    }
    if (!localStorage.getItem("sadhana_gallery")) {
      localStorage.setItem("sadhana_gallery", JSON.stringify(SEED_GALLERY));
    }
    if (!localStorage.getItem("sadhana_bookings")) {
      localStorage.setItem("sadhana_bookings", JSON.stringify(SEED_BOOKINGS));
    }
  }
  getServices() {
    return JSON.parse(localStorage.getItem("sadhana_services"));
  }
  getStaff() {
    return JSON.parse(localStorage.getItem("sadhana_staff"));
  }
  getReviews() {
    return JSON.parse(localStorage.getItem("sadhana_reviews"));
  }
  getOffers() {
    return JSON.parse(localStorage.getItem("sadhana_offers"));
  }
  getGallery() {
    return JSON.parse(localStorage.getItem("sadhana_gallery"));
  }
  getBookings() {
    return JSON.parse(localStorage.getItem("sadhana_bookings"));
  }
  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      id: `b_${Date.now()}`,
      status: "confirmed",
      ...booking
    };
    bookings.push(newBooking);
    localStorage.setItem("sadhana_bookings", JSON.stringify(bookings));
    return newBooking;
  }
  updateBookingStatus(bookingId, status) {
    const bookings = this.getBookings();
    const updated = bookings.map((b) => b.id === bookingId ? { ...b, status } : b);
    localStorage.setItem("sadhana_bookings", JSON.stringify(updated));
    return true;
  }
  addReview(review) {
    const reviews = this.getReviews();
    const newReview = {
      id: `rev_${Date.now()}`,
      helpful: 0,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      ...review
    };
    reviews.unshift(newReview);
    localStorage.setItem("sadhana_reviews", JSON.stringify(reviews));
    const services = this.getServices();
    const serviceIndex = services.findIndex((s) => s.id === review.serviceId);
    if (serviceIndex !== -1) {
      const s = services[serviceIndex];
      const newReviewsCount = (s.reviewsCount || 0) + 1;
      const currentAvg = s.rating || 4.5;
      const newRating = parseFloat(((currentAvg * s.reviewsCount + review.rating) / newReviewsCount).toFixed(1));
      services[serviceIndex] = {
        ...s,
        rating: newRating,
        reviewsCount: newReviewsCount
      };
      localStorage.setItem("sadhana_services", JSON.stringify(services));
    }
    return newReview;
  }
  incrementHelpful(reviewId) {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r);
    localStorage.setItem("sadhana_reviews", JSON.stringify(updated));
    return true;
  }
  // Get aggregated stats for Admin Dashboard
  getStats() {
    const bookings = this.getBookings();
    const totalRev = bookings.reduce((sum, b) => b.status === "completed" || b.status === "confirmed" ? sum + b.price : sum, 0);
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const todayBookings = bookings.filter((b) => b.date === today);
    const todayRev = todayBookings.reduce((sum, b) => b.status === "completed" || b.status === "confirmed" ? sum + b.price : sum, 0);
    const services = this.getServices();
    const categoryRevenue = { hair: 0, facial: 0, makeup: 0, treatment: 0 };
    bookings.forEach((b) => {
      if (b.status === "completed" || b.status === "confirmed") {
        const s = services.find((srv) => srv.id === b.serviceId);
        if (s) {
          categoryRevenue[s.category] = (categoryRevenue[s.category] || 0) + b.price;
        } else {
          categoryRevenue.hair += b.price;
        }
      }
    });
    return {
      totalAppointments: bookings.length,
      revenueTotal: totalRev,
      revenueToday: todayRev,
      bookingsTodayCount: todayBookings.length,
      bookingsToday: todayBookings,
      upcomingBookings: bookings.filter((b) => b.date >= today && b.status === "confirmed").sort((a, b) => a.date.localeCompare(b.date)),
      categoryRevenue
    };
  }
};
var db = new LocalDatabase();

// src/components/OffersBanner.jsx
import { Tag, Sparkles } from "lucide-react";
function OffersBanner() {
  const [offers, setOffers] = useState2([]);
  useEffect2(() => {
    setOffers(db.getOffers());
  }, []);
  if (offers.length === 0)
    return null;
  const marqueeItems = [...offers, ...offers, ...offers];
  return /* @__PURE__ */ React2.createElement("div", { className: "offers-marquee" }, /* @__PURE__ */ React2.createElement("div", { className: "offers-marquee-track" }, marqueeItems.map((offer, idx) => /* @__PURE__ */ React2.createElement("div", { key: `${offer.id}-${idx}`, className: "offers-marquee-item" }, /* @__PURE__ */ React2.createElement(Sparkles, { size: 14, className: "text-gold" }), /* @__PURE__ */ React2.createElement("span", null, offer.description), /* @__PURE__ */ React2.createElement("span", null, "\u2022 Valid till: ", offer.validTill), /* @__PURE__ */ React2.createElement("span", { className: "offers-coupon-badge" }, offer.code)))));
}

// src/components/ServiceCard.jsx
import React3 from "react";
import { Clock, Star } from "lucide-react";
function ServiceCard({ service }) {
  const { id, name, description, duration, rating, reviewsCount } = service;
  return /* @__PURE__ */ React3.createElement("div", { className: "card-glass service-card animate-fade-in" }, /* @__PURE__ */ React3.createElement("div", { className: "service-header" }, /* @__PURE__ */ React3.createElement("h3", { className: "service-title" }, name)), /* @__PURE__ */ React3.createElement("div", { className: "service-meta" }, /* @__PURE__ */ React3.createElement("div", { className: "service-meta-item" }, /* @__PURE__ */ React3.createElement(Clock, { size: 14, className: "text-gold" }), /* @__PURE__ */ React3.createElement("span", null, duration, " Mins")), rating && /* @__PURE__ */ React3.createElement("div", { className: "service-meta-item" }, /* @__PURE__ */ React3.createElement(Star, { size: 14, className: "service-rating", fill: "#F1C40F", stroke: "none" }), /* @__PURE__ */ React3.createElement("span", null, rating, " (", reviewsCount, " reviews)"))), /* @__PURE__ */ React3.createElement("p", { className: "service-desc" }, description));
}

// src/components/BeforeAfter.jsx
import React4, { useState as useState3, useRef, useEffect as useEffect3 } from "react";
import { Sparkles as Sparkles2, Eye } from "lucide-react";
function BeforeAfter() {
  const [gallery, setGallery] = useState3([]);
  const [activeCategory, setActiveCategory] = useState3("hair");
  const [sliderPos, setSliderPos] = useState3(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  useEffect3(() => {
    setGallery(db.getGallery());
  }, []);
  const handleMove = (clientX) => {
    if (!containerRef.current)
      return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, x / rect.width * 100));
    setSliderPos(percentage);
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current)
      return;
    handleMove(e.clientX);
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current)
      return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };
  useEffect3(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  const categories = [
    { id: "hair", label: "Hair Styles" },
    { id: "facial", label: "Facial Glow" },
    { id: "makeup", label: "Bridal Makeup" }
  ];
  const activeItem = gallery.find((item) => item.category === activeCategory);
  const activeCategoryCount = gallery.filter((item) => item.category === activeCategory).length;
  return /* @__PURE__ */ React4.createElement("section", { id: "gallery", className: "section", style: { backgroundColor: "var(--secondary)" } }, /* @__PURE__ */ React4.createElement("div", { className: "container" }, /* @__PURE__ */ React4.createElement("div", { className: "section-title" }, /* @__PURE__ */ React4.createElement("h2", null, "Transformations Gallery"), /* @__PURE__ */ React4.createElement("p", null, "Real before-and-after results showing our hair, skin, and makeup artistry.")), /* @__PURE__ */ React4.createElement("div", { className: "gallery-tabs" }, categories.map((cat) => /* @__PURE__ */ React4.createElement(
    "button",
    {
      key: cat.id,
      className: `category-btn ${activeCategory === cat.id ? "active" : ""}`,
      onClick: () => {
        setActiveCategory(cat.id);
        setSliderPos(50);
      }
    },
    cat.label
  ))), activeItem ? /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("div", { style: { textAlign: "center", marginBottom: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React4.createElement("span", { className: "review-service-tag", style: { margin: 0, display: "flex", alignItems: "center", gap: "4px" } }, /* @__PURE__ */ React4.createElement(Eye, { size: 12 }), activeItem.title), /* @__PURE__ */ React4.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "(", activeCategoryCount, " item verified)")), /* @__PURE__ */ React4.createElement(
    "div",
    {
      ref: containerRef,
      className: "ba-container",
      onMouseMove: handleMouseMove,
      onTouchMove: handleTouchMove,
      onMouseDown: (e) => {
        e.preventDefault();
        isDragging.current = true;
        handleMove(e.clientX);
      },
      onTouchStart: (e) => {
        isDragging.current = true;
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      },
      style: { "--slider-pos": `${sliderPos}%` }
    },
    /* @__PURE__ */ React4.createElement(
      "img",
      {
        src: activeItem.after,
        alt: "After transformation",
        className: "ba-image"
      }
    ),
    /* @__PURE__ */ React4.createElement("div", { className: "ba-label ba-label-after" }, "After Treatment"),
    /* @__PURE__ */ React4.createElement(
      "img",
      {
        src: activeItem.before,
        alt: "Before transformation",
        className: "ba-image ba-image-before"
      }
    ),
    /* @__PURE__ */ React4.createElement("div", { className: "ba-label ba-label-before" }, "Before Treatment"),
    /* @__PURE__ */ React4.createElement("div", { className: "ba-handle" }, /* @__PURE__ */ React4.createElement("div", { className: "ba-handle-button" }, /* @__PURE__ */ React4.createElement(Sparkles2, { size: 16 })))
  ), /* @__PURE__ */ React4.createElement("p", { style: { textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "16px", fontWeight: 600 } }, "\u2190 Drag slider handle to compare before and after \u2192")) : /* @__PURE__ */ React4.createElement("p", { style: { textAlign: "center", color: "var(--text-muted)" } }, "No transformations available for this category.")));
}

// src/components/StaffCarousel.jsx
import React5, { useState as useState4, useEffect as useEffect4 } from "react";
import { Award, Clock as Clock2, Star as Star2 } from "lucide-react";
function StaffCarousel() {
  const [staff, setStaff] = useState4([]);
  useEffect4(() => {
    setStaff(db.getStaff());
  }, []);
  return /* @__PURE__ */ React5.createElement("section", { id: "staff", className: "section" }, /* @__PURE__ */ React5.createElement("div", { className: "container" }, /* @__PURE__ */ React5.createElement("div", { className: "section-title" }, /* @__PURE__ */ React5.createElement("h2", null, "Stylists & Beauticians"), /* @__PURE__ */ React5.createElement("p", null, "Meet our premium grooming and beauty experts who redefine style and rejuvenation.")), /* @__PURE__ */ React5.createElement("div", { className: "staff-grid" }, staff.map((member) => /* @__PURE__ */ React5.createElement("div", { key: member.id, className: "card-glass staff-card animate-fade-in" }, /* @__PURE__ */ React5.createElement("div", { className: "staff-img-container" }, /* @__PURE__ */ React5.createElement(
    "img",
    {
      src: member.photo,
      alt: member.name,
      className: "staff-img"
    }
  ), member.certifications && member.certifications.length > 0 && /* @__PURE__ */ React5.createElement("span", { className: "staff-cert-badge" }, member.certifications[0])), /* @__PURE__ */ React5.createElement("div", { className: "staff-info" }, /* @__PURE__ */ React5.createElement("h3", { className: "staff-name" }, member.name), /* @__PURE__ */ React5.createElement("p", { className: "staff-specialty" }, member.specialty), /* @__PURE__ */ React5.createElement("p", { className: "staff-experience" }, member.experience, " Years Salon Experience"), /* @__PURE__ */ React5.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React5.createElement("span", { className: "staff-rating" }, /* @__PURE__ */ React5.createElement(Star2, { size: 14, fill: "#F1C40F", stroke: "none" }), /* @__PURE__ */ React5.createElement("span", null, member.rating, " Rating"))), /* @__PURE__ */ React5.createElement(
    "div",
    {
      style: {
        borderTop: "1px solid var(--secondary)",
        paddingTop: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        textAlign: "left"
      }
    },
    /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React5.createElement(Clock2, { size: 12, className: "text-gold" }), /* @__PURE__ */ React5.createElement("span", null, member.availableHours)),
    /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React5.createElement(Award, { size: 12, className: "text-gold" }), /* @__PURE__ */ React5.createElement("span", null, "Days: ", member.availableDays.join(", ")))
  )))))));
}

// src/components/ReviewSection.jsx
import React6, { useState as useState5, useEffect as useEffect5 } from "react";
import { Star as Star3, ThumbsUp, Send } from "lucide-react";
function ReviewSection({ onNewReviewAdded }) {
  const [reviews, setReviews] = useState5([]);
  const [services, setServices] = useState5([]);
  const [name, setName] = useState5("");
  const [rating, setRating] = useState5(5);
  const [selectedServiceId, setSelectedServiceId] = useState5("");
  const [reviewText, setReviewText] = useState5("");
  const [helpfulClicked, setHelpfulClicked] = useState5({});
  useEffect5(() => {
    setReviews(db.getReviews());
    setServices(db.getServices());
  }, []);
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)) : 4.8;
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (starCounts[r.rating] !== void 0) {
      starCounts[r.rating]++;
    }
  });
  const getStarPercentage = (starNum) => {
    if (totalReviewsCount === 0)
      return starNum === 5 ? 100 : 0;
    return starCounts[starNum] / totalReviewsCount * 100;
  };
  const handleHelpfulClick = (reviewId) => {
    if (helpfulClicked[reviewId])
      return;
    db.incrementHelpful(reviewId);
    setReviews(db.getReviews());
    setHelpfulClicked((prev) => ({ ...prev, [reviewId]: true }));
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name || !reviewText || !selectedServiceId) {
      alert("Please fill in all review details.");
      return;
    }
    const srv = services.find((s) => s.id === selectedServiceId);
    const serviceName = srv ? srv.name : "General Salon Service";
    const newReview = {
      author: name,
      rating,
      text: reviewText.slice(0, 200),
      // restrict to 200 chars
      serviceId: selectedServiceId,
      serviceName
    };
    db.addReview(newReview);
    setName("");
    setRating(5);
    setSelectedServiceId("");
    setReviewText("");
    setReviews(db.getReviews());
    onNewReviewAdded();
  };
  return /* @__PURE__ */ React6.createElement("section", { id: "reviews", className: "section" }, /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { className: "section-title" }, /* @__PURE__ */ React6.createElement("h2", null, "Customer Reviews"), /* @__PURE__ */ React6.createElement("p", null, "Read what our luxury guests say about their grooming and beauty experiences.")), /* @__PURE__ */ React6.createElement("div", { className: "reviews-summary animate-fade-in" }, /* @__PURE__ */ React6.createElement("div", { className: "rating-avg-card" }, /* @__PURE__ */ React6.createElement("span", { className: "rating-avg-num" }, averageRating), /* @__PURE__ */ React6.createElement("div", { className: "rating-stars" }, [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ React6.createElement(
    Star3,
    {
      key: star,
      size: 18,
      fill: star <= Math.round(averageRating) ? "#F1C40F" : "none",
      stroke: star <= Math.round(averageRating) ? "none" : "#F1C40F"
    }
  ))), /* @__PURE__ */ React6.createElement("span", { style: { fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 } }, "Based on ", totalReviewsCount, " reviews")), /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center" } }, [5, 4, 3, 2, 1].map((stars) => /* @__PURE__ */ React6.createElement("div", { key: stars, className: "rating-bar-row" }, /* @__PURE__ */ React6.createElement("span", { style: { width: "50px", fontWeight: 600 } }, stars, " Star"), /* @__PURE__ */ React6.createElement("div", { className: "rating-bar-track" }, /* @__PURE__ */ React6.createElement(
    "div",
    {
      className: "rating-bar-fill",
      style: { width: `${getStarPercentage(stars)}%` }
    }
  )), /* @__PURE__ */ React6.createElement("span", { className: "rating-bar-count" }, starCounts[stars]))))), /* @__PURE__ */ React6.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "48px", alignItems: "start" } }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("h3", { className: "dash-section-title" }, "Recent Feedback"), reviews.length === 0 ? /* @__PURE__ */ React6.createElement("p", { style: { color: "var(--text-muted)" } }, "No reviews available yet. Be the first to write one!") : reviews.map((rev) => /* @__PURE__ */ React6.createElement("div", { key: rev.id, className: "card-glass review-card animate-fade-in" }, /* @__PURE__ */ React6.createElement("div", { className: "review-header" }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("h4", { className: "review-author" }, rev.author), /* @__PURE__ */ React6.createElement("span", { className: "review-date" }, rev.date)), /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", gap: "2px", color: "#F1C40F" } }, [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ React6.createElement(
    Star3,
    {
      key: s,
      size: 14,
      fill: s <= rev.rating ? "#F1C40F" : "none",
      stroke: s <= rev.rating ? "none" : "#F1C40F"
    }
  )))), /* @__PURE__ */ React6.createElement("span", { className: "review-service-tag" }, rev.serviceName), /* @__PURE__ */ React6.createElement("p", { style: { fontSize: "0.95rem", color: "var(--text-muted)", fontStyle: "italic" } }, '"', rev.text, '"'), /* @__PURE__ */ React6.createElement("div", { className: "review-actions" }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "helpful-btn",
      onClick: () => handleHelpfulClick(rev.id),
      disabled: helpfulClicked[rev.id],
      style: { opacity: helpfulClicked[rev.id] ? 0.6 : 1 }
    },
    /* @__PURE__ */ React6.createElement(ThumbsUp, { size: 14 }),
    /* @__PURE__ */ React6.createElement("span", null, "Helpful (", rev.helpful, ")")
  ))))), /* @__PURE__ */ React6.createElement("div", { className: "card-glass", style: { padding: "30px" } }, /* @__PURE__ */ React6.createElement("h3", { style: { fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" } }, "Share Your Experience"), /* @__PURE__ */ React6.createElement("form", { onSubmit: handleSubmitReview }, /* @__PURE__ */ React6.createElement("div", { className: "form-group" }, /* @__PURE__ */ React6.createElement("label", { htmlFor: "review-name" }, "Your Name"), /* @__PURE__ */ React6.createElement(
    "input",
    {
      id: "review-name",
      type: "text",
      required: true,
      className: "form-control",
      placeholder: "e.g. Priyanjali Roy",
      value: name,
      onChange: (e) => setName(e.target.value)
    }
  )), /* @__PURE__ */ React6.createElement("div", { className: "form-group" }, /* @__PURE__ */ React6.createElement("label", { htmlFor: "review-service" }, "Treatment Received"), /* @__PURE__ */ React6.createElement(
    "select",
    {
      id: "review-service",
      required: true,
      className: "form-control",
      value: selectedServiceId,
      onChange: (e) => setSelectedServiceId(e.target.value)
    },
    /* @__PURE__ */ React6.createElement("option", { value: "" }, "-- Choose service --"),
    services.map((s) => /* @__PURE__ */ React6.createElement("option", { key: s.id, value: s.id }, s.name, " (", s.gender === "men" ? "Men's" : "Women's", ")"))
  )), /* @__PURE__ */ React6.createElement("div", { className: "form-group" }, /* @__PURE__ */ React6.createElement("label", null, "Rating"), /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", gap: "8px", marginTop: "6px" } }, [1, 2, 3, 4, 5].map((num) => /* @__PURE__ */ React6.createElement(
    "button",
    {
      key: num,
      type: "button",
      onClick: () => setRating(num),
      style: { cursor: "pointer" }
    },
    /* @__PURE__ */ React6.createElement(
      Star3,
      {
        size: 28,
        fill: num <= rating ? "#F1C40F" : "none",
        stroke: "#F1C40F"
      }
    )
  )))), /* @__PURE__ */ React6.createElement("div", { className: "form-group" }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", justifyContent: "space-between", width: "100%" } }, /* @__PURE__ */ React6.createElement("label", { htmlFor: "review-content" }, "Review Description"), /* @__PURE__ */ React6.createElement("span", { style: { fontSize: "0.75rem", color: reviewText.length > 200 ? "var(--error)" : "var(--text-muted)", fontWeight: 600 } }, reviewText.length, "/200 chars")), /* @__PURE__ */ React6.createElement(
    "textarea",
    {
      id: "review-content",
      required: true,
      rows: 4,
      className: "form-control",
      placeholder: "Describe your session, ambiance, and service style... (max 200 characters)",
      value: reviewText,
      onChange: (e) => setReviewText(e.target.value.slice(0, 200))
    }
  )), /* @__PURE__ */ React6.createElement(
    "button",
    {
      type: "submit",
      className: "btn btn-primary",
      style: { width: "100%", marginTop: "10px" }
    },
    /* @__PURE__ */ React6.createElement(Send, { size: 16 }),
    "Submit Feedback"
  ))))));
}

// src/components/Contact.jsx
import React7 from "react";
import { MapPin, Phone, Mail, Clock as Clock3, MessageCircle, AlertCircle } from "lucide-react";
function Contact() {
  const address = "Sadhana Salon, 1st Floor, Luxury Tower, MG Road, Bengaluru, Karnataka 560001";
  const phone = "+91 98765 43210";
  const email = "contact@sadhanasalon.in";
  const getWhatsAppLink = () => {
    const text = "Hello Sadhana Salon, I'd like to inquire about your services and available slots.";
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };
  return /* @__PURE__ */ React7.createElement("section", { id: "contact", className: "section", style: { borderTop: "1px solid var(--secondary)" } }, /* @__PURE__ */ React7.createElement("div", { className: "container" }, /* @__PURE__ */ React7.createElement("div", { className: "section-title" }, /* @__PURE__ */ React7.createElement("h2", null, "Location & Contact"), /* @__PURE__ */ React7.createElement("p", null, "Visit our flagship luxury salon or get in touch for corporate bookings.")), /* @__PURE__ */ React7.createElement("div", { className: "contact-grid" }, /* @__PURE__ */ React7.createElement("div", { className: "card-glass contact-info-card animate-fade-in" }, /* @__PURE__ */ React7.createElement("div", { className: "contact-detail-row" }, /* @__PURE__ */ React7.createElement("div", { className: "contact-icon-wrapper" }, /* @__PURE__ */ React7.createElement(MapPin, { size: 20 })), /* @__PURE__ */ React7.createElement("div", { className: "contact-text" }, /* @__PURE__ */ React7.createElement("h4", null, "Our Address"), /* @__PURE__ */ React7.createElement("p", null, address), /* @__PURE__ */ React7.createElement(
    "a",
    {
      href: "https://maps.google.com/?q=MG+Road+Bengaluru",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-gold",
      style: { display: "inline-block", marginTop: "8px", fontSize: "0.85rem", fontWeight: 600 }
    },
    "Get Directions \u2192"
  ))), /* @__PURE__ */ React7.createElement("div", { className: "contact-detail-row" }, /* @__PURE__ */ React7.createElement("div", { className: "contact-icon-wrapper" }, /* @__PURE__ */ React7.createElement(Phone, { size: 20 })), /* @__PURE__ */ React7.createElement("div", { className: "contact-text" }, /* @__PURE__ */ React7.createElement("h4", null, "Phone Call & Chat"), /* @__PURE__ */ React7.createElement("p", null, "Call: ", /* @__PURE__ */ React7.createElement("a", { href: `tel:${phone.replace(/\s/g, "")}`, className: "text-gold", style: { fontWeight: 700 } }, phone)), /* @__PURE__ */ React7.createElement(
    "a",
    {
      href: getWhatsAppLink(),
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn btn-secondary",
      style: {
        marginTop: "12px",
        background: "rgba(39, 174, 96, 0.1)",
        color: "#27AE60",
        border: "1px solid rgba(39, 174, 96, 0.3)",
        padding: "8px 16px",
        fontSize: "0.85rem",
        minHeight: "38px"
      }
    },
    /* @__PURE__ */ React7.createElement(MessageCircle, { size: 16, fill: "#27AE60", stroke: "none" }),
    "Chat on WhatsApp"
  ))), /* @__PURE__ */ React7.createElement("div", { className: "contact-detail-row" }, /* @__PURE__ */ React7.createElement("div", { className: "contact-icon-wrapper" }, /* @__PURE__ */ React7.createElement(Mail, { size: 20 })), /* @__PURE__ */ React7.createElement("div", { className: "contact-text" }, /* @__PURE__ */ React7.createElement("h4", null, "Email Support"), /* @__PURE__ */ React7.createElement("p", null, /* @__PURE__ */ React7.createElement("a", { href: `mailto:${email}`, className: "text-gold" }, email)))), /* @__PURE__ */ React7.createElement("div", { className: "contact-detail-row" }, /* @__PURE__ */ React7.createElement("div", { className: "contact-icon-wrapper" }, /* @__PURE__ */ React7.createElement(Clock3, { size: 20 })), /* @__PURE__ */ React7.createElement("div", { className: "contact-text" }, /* @__PURE__ */ React7.createElement("h4", null, "Opening Hours"), /* @__PURE__ */ React7.createElement("p", null, "Monday - Sunday: 10:00 AM - 08:30 PM"), /* @__PURE__ */ React7.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", color: "var(--text-muted)", fontSize: "0.8rem" } }, /* @__PURE__ */ React7.createElement(AlertCircle, { size: 14, className: "text-gold" }), /* @__PURE__ */ React7.createElement("span", null, "Open on all national holidays. Prior booking advised."))))), /* @__PURE__ */ React7.createElement("div", { className: "map-container animate-fade-in delay-1" }, /* @__PURE__ */ React7.createElement(
    "iframe",
    {
      title: "Sadhana Salon Google Map Location",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.925565590928!2d77.6083161!3d12.9765825!2m3!1f0!2f0!3f0!3m2!1i1024|2i768|4f13.1!3m3!1m2!1s0x3bae167d4f8f4a33%3A0xe54e6ffbbd688cf5!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      className: "map-iframe",
      allowFullScreen: "",
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade"
    }
  )))));
}

// src/components/Dashboard.jsx
import React8, { useState as useState6, useEffect as useEffect6 } from "react";
import { TrendingUp, Users, DollarSign, Calendar, CheckCircle, XCircle, Info } from "lucide-react";
function Dashboard({ triggerRefresh }) {
  const [stats, setStats] = useState6(null);
  const [staff, setStaff] = useState6([]);
  const [attendance, setAttendance] = useState6({});
  const loadDashboardData = () => {
    setStats(db.getStats());
    const staffList = db.getStaff();
    setStaff(staffList);
    const initialAttendance = {};
    staffList.forEach((s) => {
      initialAttendance[s.id] = true;
    });
    setAttendance((prev) => ({ ...initialAttendance, ...prev }));
  };
  useEffect6(() => {
    loadDashboardData();
  }, [triggerRefresh]);
  const handleStatusChange = (bookingId, newStatus) => {
    db.updateBookingStatus(bookingId, newStatus);
    loadDashboardData();
  };
  const handleAttendanceToggle = (staffId) => {
    setAttendance((prev) => ({
      ...prev,
      [staffId]: !prev[staffId]
    }));
  };
  if (!stats)
    return /* @__PURE__ */ React8.createElement("p", { style: { textAlign: "center", padding: "40px" } }, "Loading analytics panel...");
  const trendData = [
    { label: "Mon", value: 3 },
    { label: "Tue", value: 5 },
    { label: "Wed", value: 4 },
    { label: "Thu", value: 7 },
    { label: "Fri", value: stats.totalAppointments - 3 },
    // adjust based on live count
    { label: "Sat", value: stats.totalAppointments - 1 },
    { label: "Sun", value: stats.totalAppointments }
  ];
  const chartWidth = 500;
  const chartHeight = 150;
  const maxVal = Math.max(...trendData.map((d) => d.value), 10);
  const points = trendData.map((d, i) => {
    const x = i / (trendData.length - 1) * (chartWidth - 60) + 30;
    const y = chartHeight - (d.value / maxVal * (chartHeight - 40) + 20);
    return `${x},${y}`;
  }).join(" ");
  const totalCatRevenue = Object.values(stats.categoryRevenue).reduce((a, b) => a + b, 0) || 1;
  const categoryMeta = [
    { id: "hair", label: "Hair services", color: "#C9A227" },
    // Gold
    { id: "facial", label: "Facials & Skin", color: "#E8D5B7" },
    // Soft Gold
    { id: "makeup", label: "Makeup & Bridal", color: "#222222" },
    // Black
    { id: "treatment", label: "Special Treatments", color: "#888888" }
    // Gray
  ];
  return /* @__PURE__ */ React8.createElement("section", { id: "dashboard", className: "section", style: { backgroundColor: "var(--secondary)", borderTop: "1px solid var(--glass-border)" } }, /* @__PURE__ */ React8.createElement("div", { className: "container" }, /* @__PURE__ */ React8.createElement("div", { className: "section-title" }, /* @__PURE__ */ React8.createElement("h2", null, "Management Dashboard"), /* @__PURE__ */ React8.createElement("p", null, "Real-time salon analytics, appointment scheduler logs, and staff attendance.")), /* @__PURE__ */ React8.createElement("div", { className: "dashboard-grid" }, /* @__PURE__ */ React8.createElement("div", { className: "card-glass dash-card" }, /* @__PURE__ */ React8.createElement("div", { className: "dash-card-header" }, /* @__PURE__ */ React8.createElement("span", null, "Total Appointments"), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-icon" }, /* @__PURE__ */ React8.createElement(Calendar, { size: 18 }))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("span", { className: "dash-card-value" }, stats.totalAppointments), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-trend up" }, /* @__PURE__ */ React8.createElement(TrendingUp, { size: 12 }), /* @__PURE__ */ React8.createElement("span", null, "+12.4% this week")))), /* @__PURE__ */ React8.createElement("div", { className: "card-glass dash-card" }, /* @__PURE__ */ React8.createElement("div", { className: "dash-card-header" }, /* @__PURE__ */ React8.createElement("span", null, "Cumulative Revenue"), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-icon" }, /* @__PURE__ */ React8.createElement(DollarSign, { size: 18 }))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("span", { className: "dash-card-value" }, "\u20B9", stats.revenueTotal), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-trend up" }, /* @__PURE__ */ React8.createElement(TrendingUp, { size: 12 }), /* @__PURE__ */ React8.createElement("span", null, "Active Bookings Included")))), /* @__PURE__ */ React8.createElement("div", { className: "card-glass dash-card" }, /* @__PURE__ */ React8.createElement("div", { className: "dash-card-header" }, /* @__PURE__ */ React8.createElement("span", null, "Today's Turnover"), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-icon" }, /* @__PURE__ */ React8.createElement(DollarSign, { size: 18 }))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("span", { className: "dash-card-value" }, "\u20B9", stats.revenueToday), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-trend up" }, /* @__PURE__ */ React8.createElement(TrendingUp, { size: 12 }), /* @__PURE__ */ React8.createElement("span", null, "Today's transactions")))), /* @__PURE__ */ React8.createElement("div", { className: "card-glass dash-card" }, /* @__PURE__ */ React8.createElement("div", { className: "dash-card-header" }, /* @__PURE__ */ React8.createElement("span", null, "Today's Sessions"), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-icon" }, /* @__PURE__ */ React8.createElement(Users, { size: 18 }))), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("span", { className: "dash-card-value" }, stats.bookingsTodayCount), /* @__PURE__ */ React8.createElement("div", { className: "dash-card-trend" }, /* @__PURE__ */ React8.createElement("span", null, "Slots left: ", 21 - stats.bookingsTodayCount))))), /* @__PURE__ */ React8.createElement("div", { className: "dash-layout-split" }, /* @__PURE__ */ React8.createElement("div", { className: "card-glass chart-container" }, /* @__PURE__ */ React8.createElement("h3", { className: "dash-section-title" }, "Bookings Growth Trend (7 Days)"), /* @__PURE__ */ React8.createElement("svg", { viewBox: `0 0 ${chartWidth} ${chartHeight}`, className: "chart-svg" }, /* @__PURE__ */ React8.createElement("defs", null, /* @__PURE__ */ React8.createElement("linearGradient", { id: "chart-gradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React8.createElement("stop", { offset: "0%", stopColor: "var(--primary)", stopOpacity: "0.4" }), /* @__PURE__ */ React8.createElement("stop", { offset: "100%", stopColor: "var(--primary)", stopOpacity: "0.0" }))), [0, 0.25, 0.5, 0.75, 1].map((p, idx) => /* @__PURE__ */ React8.createElement(
    "line",
    {
      key: idx,
      x1: "30",
      y1: 20 + p * (chartHeight - 40),
      x2: chartWidth - 30,
      y2: 20 + p * (chartHeight - 40),
      className: "chart-grid-line"
    }
  )), /* @__PURE__ */ React8.createElement(
    "path",
    {
      d: `M ${trendData.map((d, i) => `${i / (trendData.length - 1) * (chartWidth - 60) + 30},${chartHeight - (d.value / maxVal * (chartHeight - 40) + 20)}`).join(" L ")} L ${(trendData.length - 1) * ((chartWidth - 60) / (trendData.length - 1)) + 30},${chartHeight - 20} L 30,${chartHeight - 20} Z`,
      className: "chart-data-area"
    }
  ), /* @__PURE__ */ React8.createElement("polyline", { points, className: "chart-data-line" }), trendData.map((d, i) => {
    const x = i / (trendData.length - 1) * (chartWidth - 60) + 30;
    const y = chartHeight - (d.value / maxVal * (chartHeight - 40) + 20);
    return /* @__PURE__ */ React8.createElement("g", { key: i }, /* @__PURE__ */ React8.createElement("circle", { cx: x, cy: y, r: "5", className: "chart-dot" }), /* @__PURE__ */ React8.createElement("text", { x, y: y - 10, textAnchor: "middle", className: "chart-text" }, d.value), /* @__PURE__ */ React8.createElement("text", { x, y: chartHeight - 5, textAnchor: "middle", className: "chart-text", style: { fontWeight: 700 } }, d.label));
  }))), /* @__PURE__ */ React8.createElement("div", { className: "card-glass chart-container", style: { display: "flex", flexDirection: "column", justifyContent: "center" } }, /* @__PURE__ */ React8.createElement("h3", { className: "dash-section-title" }, "Revenue Breakdown"), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px" } }, categoryMeta.map((cat) => {
    const rev = stats.categoryRevenue[cat.id] || 0;
    const pct = Math.round(rev / totalCatRevenue * 100);
    return /* @__PURE__ */ React8.createElement("div", { key: cat.id }, /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" } }, /* @__PURE__ */ React8.createElement("span", null, cat.label), /* @__PURE__ */ React8.createElement("span", null, "\u20B9", rev, " (", pct, "%)")), /* @__PURE__ */ React8.createElement("div", { className: "rating-bar-track", style: { height: "12px" } }, /* @__PURE__ */ React8.createElement(
      "div",
      {
        className: "rating-bar-fill",
        style: {
          width: `${pct}%`,
          backgroundColor: cat.color,
          backgroundImage: `linear-gradient(90deg, ${cat.color} 0%, var(--accent) 100%)`
        }
      }
    )));
  })))), /* @__PURE__ */ React8.createElement("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", alignItems: "start" } }, /* @__PURE__ */ React8.createElement("div", { className: "card-glass booking-list-card" }, /* @__PURE__ */ React8.createElement("h3", { className: "dash-section-title" }, "Upcoming Appointments (7 Days)"), stats.upcomingBookings.length === 0 ? /* @__PURE__ */ React8.createElement("p", { style: { color: "var(--text-muted)", padding: "20px 0" } }, "No pending or confirmed appointments booked.") : /* @__PURE__ */ React8.createElement("div", { className: "bookings-table-wrapper" }, /* @__PURE__ */ React8.createElement("table", { className: "bookings-table" }, /* @__PURE__ */ React8.createElement("thead", null, /* @__PURE__ */ React8.createElement("tr", null, /* @__PURE__ */ React8.createElement("th", null, "Time & Date"), /* @__PURE__ */ React8.createElement("th", null, "Customer"), /* @__PURE__ */ React8.createElement("th", null, "Service"), /* @__PURE__ */ React8.createElement("th", null, "Stylist"), /* @__PURE__ */ React8.createElement("th", null, "Amount"), /* @__PURE__ */ React8.createElement("th", null, "Actions"))), /* @__PURE__ */ React8.createElement("tbody", null, stats.upcomingBookings.map((b) => /* @__PURE__ */ React8.createElement("tr", { key: b.id }, /* @__PURE__ */ React8.createElement("td", null, /* @__PURE__ */ React8.createElement("strong", { style: { display: "block" } }, b.time), /* @__PURE__ */ React8.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, b.date)), /* @__PURE__ */ React8.createElement("td", null, /* @__PURE__ */ React8.createElement("div", { style: { fontWeight: 600 } }, b.customerName), /* @__PURE__ */ React8.createElement("span", { style: { fontSize: "0.75rem", color: "var(--text-muted)" } }, b.customerPhone)), /* @__PURE__ */ React8.createElement("td", null, b.serviceName), /* @__PURE__ */ React8.createElement("td", { style: { color: "var(--primary)", fontWeight: 600 } }, b.staffName), /* @__PURE__ */ React8.createElement("td", { style: { fontWeight: 700 } }, "\u20B9", b.price), /* @__PURE__ */ React8.createElement("td", null, b.status === "confirmed" ? /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", gap: "8px" } }, /* @__PURE__ */ React8.createElement(
    "button",
    {
      className: "btn btn-secondary",
      style: { padding: "4px 8px", minHeight: "32px", color: "var(--success)" },
      onClick: () => handleStatusChange(b.id, "completed"),
      title: "Mark as Completed"
    },
    /* @__PURE__ */ React8.createElement(CheckCircle, { size: 16 })
  ), /* @__PURE__ */ React8.createElement(
    "button",
    {
      className: "btn btn-secondary",
      style: { padding: "4px 8px", minHeight: "32px", color: "var(--error)" },
      onClick: () => handleStatusChange(b.id, "cancelled"),
      title: "Cancel Appointment"
    },
    /* @__PURE__ */ React8.createElement(XCircle, { size: 16 })
  )) : /* @__PURE__ */ React8.createElement("span", { className: `status-badge status-${b.status}` }, b.status)))))))), /* @__PURE__ */ React8.createElement("div", { className: "card-glass booking-list-card" }, /* @__PURE__ */ React8.createElement("h3", { className: "dash-section-title" }, "Staff Attendance"), /* @__PURE__ */ React8.createElement("div", { className: "attendance-list" }, staff.map((s) => /* @__PURE__ */ React8.createElement("div", { key: s.id, className: "attendance-item" }, /* @__PURE__ */ React8.createElement("div", { className: "attendance-staff-info" }, /* @__PURE__ */ React8.createElement(
    "img",
    {
      src: s.photo,
      alt: s.name,
      className: "attendance-staff-avatar"
    }
  ), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("div", { className: "attendance-staff-name" }, s.name), /* @__PURE__ */ React8.createElement("span", { className: `attendance-status-label ${attendance[s.id] ? "present" : "absent"}` }, attendance[s.id] ? "Present" : "Absent"))), /* @__PURE__ */ React8.createElement("label", { className: "attendance-toggle-wrapper", htmlFor: `attend-toggle-${s.id}` }, /* @__PURE__ */ React8.createElement(
    "input",
    {
      id: `attend-toggle-${s.id}`,
      type: "checkbox",
      className: "attendance-toggle-input",
      checked: !!attendance[s.id],
      onChange: () => handleAttendanceToggle(s.id)
    }
  ), /* @__PURE__ */ React8.createElement("span", { className: "attendance-toggle-slider" }))))), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", color: "var(--text-muted)", fontSize: "0.75rem" } }, /* @__PURE__ */ React8.createElement(Info, { size: 12, className: "text-gold" }), /* @__PURE__ */ React8.createElement("span", null, "Absent staff are automatically filtered out from client scheduling grids."))))));
}

// src/components/HeroCarousel.jsx
import React9, { useState as useState7, useEffect as useEffect7 } from "react";
import { ChevronLeft, ChevronRight, Sparkles as Sparkles3 } from "lucide-react";
var CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
    title: "Precision Styling & Hair Artistry",
    subtitle: "Crafted by Master Stylists",
    quote: "Where sophistication meets expertise."
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80",
    title: "Luxury Rejuvenation & Treatments",
    subtitle: "Nourish Your Body & Soul",
    quote: "Indulge in absolute pampering and elite skincare."
  },
  {
    url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1600&q=80",
    title: "Immersive Luxury Salon Experience",
    subtitle: "Sadhana Luxury Salon & Spa",
    quote: "Step into a world of timeless beauty."
  },
  {
    url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=80",
    title: "Elite Wellness & Rejuvenating Therapy",
    subtitle: "Uncompromising Quality",
    quote: "Exquisite rituals tailored for your lifestyle."
  }
];
function HeroCarousel({ onExploreServices }) {
  const [currentIndex, setCurrentIndex] = useState7(0);
  useEffect7(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5e3);
    return () => clearInterval(timer);
  }, [currentIndex]);
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };
  return /* @__PURE__ */ React9.createElement("section", { id: "home", className: "hero-carousel-section" }, /* @__PURE__ */ React9.createElement("div", { className: "hero-carousel-container" }, CAROUSEL_IMAGES.map((slide, idx) => /* @__PURE__ */ React9.createElement(
    "div",
    {
      key: idx,
      className: `hero-slide ${idx === currentIndex ? "active" : ""}`
    },
    /* @__PURE__ */ React9.createElement(
      "img",
      {
        src: slide.url,
        alt: slide.title,
        className: "hero-slide-image",
        loading: idx === 0 ? "eager" : "lazy"
      }
    ),
    /* @__PURE__ */ React9.createElement("div", { className: "hero-overlay" })
  ))), /* @__PURE__ */ React9.createElement("div", { className: "hero-content" }, /* @__PURE__ */ React9.createElement("span", { className: "hero-subtitle animate-fade-in" }, /* @__PURE__ */ React9.createElement(Sparkles3, { size: 14, style: { marginRight: "6px", color: "var(--primary)" } }), CAROUSEL_IMAGES[currentIndex].subtitle), /* @__PURE__ */ React9.createElement("h1", { className: "hero-title animate-fade-in" }, "Beauty That Speaks ", /* @__PURE__ */ React9.createElement("span", null, "For Itself")), /* @__PURE__ */ React9.createElement("p", { className: "hero-quote animate-fade-in" }, '"', CAROUSEL_IMAGES[currentIndex].quote, '"'), /* @__PURE__ */ React9.createElement("p", { className: "hero-description animate-fade-in" }, CAROUSEL_IMAGES[currentIndex].title), /* @__PURE__ */ React9.createElement("div", { className: "hero-buttons animate-fade-in" }, /* @__PURE__ */ React9.createElement("button", { className: "btn btn-primary", onClick: onExploreServices }, "Explore Services"))), /* @__PURE__ */ React9.createElement("button", { className: "hero-arrow hero-arrow-left", onClick: handlePrev, "aria-label": "Previous Slide" }, /* @__PURE__ */ React9.createElement(ChevronLeft, { size: 24 })), /* @__PURE__ */ React9.createElement("button", { className: "hero-arrow hero-arrow-right", onClick: handleNext, "aria-label": "Next Slide" }, /* @__PURE__ */ React9.createElement(ChevronRight, { size: 24 })), /* @__PURE__ */ React9.createElement("div", { className: "hero-indicators" }, CAROUSEL_IMAGES.map((_, idx) => /* @__PURE__ */ React9.createElement(
    "button",
    {
      key: idx,
      className: `hero-indicator ${idx === currentIndex ? "active" : ""}`,
      onClick: () => setCurrentIndex(idx),
      "aria-label": `Go to slide ${idx + 1}`
    }
  ))));
}

// src/App.jsx
import { Sparkles as Sparkles4, ShieldAlert } from "lucide-react";
function App() {
  const [activeSection, setActiveSection] = useState8("home");
  const [activeGender, setActiveGender] = useState8("men");
  const [activeCategory, setActiveCategory] = useState8("all");
  const [services, setServices] = useState8([]);
  const [filteredServices, setFilteredServices] = useState8([]);
  const [isAdminMode, setIsAdminMode] = useState8(false);
  const [toasts, setToasts] = useState8([]);
  const [refreshTrigger, setRefreshTrigger] = useState8(0);
  useEffect8(() => {
    setServices(db.getServices());
  }, [refreshTrigger]);
  useEffect8(() => {
    let list = services.filter((s) => s.gender === activeGender);
    if (activeCategory !== "all") {
      list = list.filter((s) => s.category === activeCategory);
    }
    setFilteredServices(list);
  }, [services, activeGender, activeCategory]);
  const handleNavigate = (sectionId) => {
    setIsAdminMode(false);
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };
  return /* @__PURE__ */ React10.createElement("div", { className: "animate-fade-in" }, /* @__PURE__ */ React10.createElement("div", { className: "toast-container" }, toasts.map((t) => /* @__PURE__ */ React10.createElement("div", { key: t.id, className: `toast toast-${t.type}` }, t.type === "success" ? /* @__PURE__ */ React10.createElement(Sparkles4, { size: 16 }) : /* @__PURE__ */ React10.createElement(ShieldAlert, { size: 16 }), /* @__PURE__ */ React10.createElement("span", null, t.message)))), /* @__PURE__ */ React10.createElement(
    Navbar,
    {
      activeSection,
      isAdminMode,
      onNavigate: handleNavigate,
      onToggleAdmin: () => setIsAdminMode(!isAdminMode)
    }
  ), /* @__PURE__ */ React10.createElement(OffersBanner, null), /* @__PURE__ */ React10.createElement("main", { style: { marginTop: "var(--nav-height)", minHeight: "calc(100vh - var(--nav-height) - 100px)" } }, isAdminMode ? (
    /* ======================================================== */
    /* ADMIN DASHBOARD VIEW                                      */
    /* ======================================================== */
    /* @__PURE__ */ React10.createElement(Dashboard, { triggerRefresh: refreshTrigger })
  ) : (
    /* ======================================================== */
    /* CLIENT SALON INTERFACE                                   */
    /* ======================================================== */
    /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
      HeroCarousel,
      {
        onExploreServices: () => handleNavigate("services")
      }
    ), /* @__PURE__ */ React10.createElement("section", { id: "services", className: "section" }, /* @__PURE__ */ React10.createElement("div", { className: "container" }, /* @__PURE__ */ React10.createElement("div", { className: "section-title" }, /* @__PURE__ */ React10.createElement("h2", null, "Our Treatments & Services"), /* @__PURE__ */ React10.createElement("p", null, "Browse our complete list of customized men's and women's grooming treatments.")), /* @__PURE__ */ React10.createElement("div", { className: "gender-tabs-container" }, /* @__PURE__ */ React10.createElement("div", { className: "gender-tabs" }, /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `gender-tab ${activeGender === "men" ? "active" : ""}`,
        onClick: () => {
          setActiveGender("men");
          setActiveCategory("all");
        }
      },
      "Men's Salon"
    ), /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `gender-tab ${activeGender === "women" ? "active" : ""}`,
        onClick: () => {
          setActiveGender("women");
          setActiveCategory("all");
        }
      },
      "Women's Salon"
    ))), /* @__PURE__ */ React10.createElement("div", { className: "category-filter-container" }, /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `category-btn ${activeCategory === "all" ? "active" : ""}`,
        onClick: () => setActiveCategory("all")
      },
      "All Services"
    ), /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `category-btn ${activeCategory === "hair" ? "active" : ""}`,
        onClick: () => setActiveCategory("hair")
      },
      "Hair Care"
    ), /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `category-btn ${activeCategory === "facial" ? "active" : ""}`,
        onClick: () => setActiveCategory("facial")
      },
      "Facials & Skin"
    ), /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `category-btn ${activeCategory === "treatment" ? "active" : ""}`,
        onClick: () => setActiveCategory("treatment")
      },
      "Treatments"
    ), activeGender === "women" && /* @__PURE__ */ React10.createElement(
      "button",
      {
        className: `category-btn ${activeCategory === "makeup" ? "active" : ""}`,
        onClick: () => setActiveCategory("makeup")
      },
      "Bridal & Makeup"
    )), /* @__PURE__ */ React10.createElement("div", { className: "services-grid" }, filteredServices.map((srv) => /* @__PURE__ */ React10.createElement(
      ServiceCard,
      {
        key: srv.id,
        service: srv
      }
    ))))), /* @__PURE__ */ React10.createElement(BeforeAfter, null), /* @__PURE__ */ React10.createElement(StaffCarousel, null), /* @__PURE__ */ React10.createElement(ReviewSection, { onNewReviewAdded: () => {
      setRefreshTrigger((prev) => prev + 1);
      addToast("Feedback submitted successfully. Thank you!", "success");
    } }), /* @__PURE__ */ React10.createElement(Contact, null))
  )), /* @__PURE__ */ React10.createElement("footer", { style: { backgroundColor: "var(--text)", color: "#FFFFFF", padding: "40px 0", textAlign: "center", borderTop: "2px solid var(--primary)" } }, /* @__PURE__ */ React10.createElement("div", { className: "container" }, /* @__PURE__ */ React10.createElement("h3", { style: { textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 800 } }, "Sadhana"), /* @__PURE__ */ React10.createElement("p", { style: { color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginTop: "8px" } }, "\xA9 2026 Sadhana Luxury Salon & Spa. All Rights Reserved. Designed for Visual Excellence."))));
}

// src/main.jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React11.createElement(React11.StrictMode, null, /* @__PURE__ */ React11.createElement(App, null))
);
