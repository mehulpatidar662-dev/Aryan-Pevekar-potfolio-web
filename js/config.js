/**
 * Automotive Design Portfolio Configuration
 * -------------------------------------------------------------
 * Curated for Aryan Pevekar - Transportation & Motorcycle Designer
 * MIT ADT University, Pune | Bachelor of Design (2023 - 2027)
 */

const PORTFOLIO_CONFIG = {
  // Personal & Contact Details
  designer: {
    name: "Aryan Pevekar",
    tagline: "Transportation & Motorcycle Designer",
    monogram: "AP",
    photo: "assets/branding/aryan-photo.webp",
    status: "Available for Automotive Design Internships & Full-Time Roles",
    institute: "MIT ADT University, Pune",
    location: "Pune, Maharashtra, India",
    email: "pevekararyan@gmail.com",
    phone: "+91 81693 68461",
    phoneClean: "+918169368461",
    whatsapp: "+918169368461",
    instagram: "https://www.instagram.com/aryan_pevekar",
    behance: "https://www.behance.net",
    linkedin: "https://www.linkedin.com"
  },

  // About Section & Design Philosophy
  about: {
    heroHeading: "SCULPTING VISCERAL MOTORCYCLE ARCHITECTURE",
    heroSubheading: "Transportation & Motorcycle Design Student at MIT ADT University, Pune. Translating aerodynamic tension, raw mechanical packaging, and biomorphic human ergonomics into production-ready physical and digital mobility concepts.",
    bio: [
      "I am Aryan Pevekar, a Transportation Design student at MIT ADT University with an intense focus on two-wheeler architecture, motorcycle styling, and ergonomic mobility solutions. Experienced in end-to-end concept development, rapid analogue sketching, digital Class-A surfacing, 3D polygon & NURBS modelling, and physical 1:1 scale prototyping.",
      "As a hearing-impaired designer, I experience vehicle design with heightened spatial sensitivity and an intensely visual, detail-oriented methodology. My philosophy bridges the raw emotional impact of track-focused superbikes with rigorous mechanical engineering, human ergonomics, and real-world manufacturability."
    ]
  },

  // Work Experience & Industry Apprenticeship
  experience: [
    {
      company: "YC Design Motorcycle Restoration",
      role: "Motorcycle Restoration & Component Development Apprentice",
      period: "Jun — Jul 2025",
      type: "Remote / Prototype Studio",
      description: "Hands-on component reverse-engineering, classic motorcycle restoration geometry, and bespoke metal fabrication detailing."
    },
    {
      company: "Bombay Custom Works",
      role: "Motorcycle Customization & Metal Sculpting",
      period: "Apprenticeship & Fabrication",
      type: "Custom Workshop",
      description: "Custom motorcycle chassis modifications, sheet metal sculpting, tank surfacing, bespoke exhaust routing, and functional mockup assembly."
    }
  ],

  // Academic Background
  resume: {
    pdfPath: "Resume/Resume.pdf",
    education: [
      {
        degree: "Bachelor Of Design, Transportation Design",
        institute: "MIT ADT University, Pune",
        period: "2023 — 2027",
        highlights: "Specializing in Motorcycle Design, Aerodynamic Class-A Surfacing, 1:1 Scale Clay/3D-Print Prototyping, and Ergonomic Mobility Systems."
      },
      {
        degree: "Higher Education",
        institute: "The New Sarvajanik High School",
        period: "2021 — 2023",
        highlights: "Foundations in Physics of Mechanics, Technical Drawing, Mathematics, and Analytical Problem Solving."
      },
      {
        degree: "Secondary Education",
        institute: "P.G. Vora School",
        period: "2015 — 2020",
        highlights: "Secondary education with active engagement in visual arts, technical sketching, and scientific principles."
      },
      {
        degree: "Lower Education",
        institute: "Central School For The Deaf, Mumbai Central",
        period: "2009 — 2015",
        highlights: "Developed acute visual observation, 3D spatial awareness, and intuitive tactile problem-solving skills."
      }
    ]
  },

  // 3 Flagship Projects Showcase
  projects: [
    {
      id: "bespoke-motorcycle",
      title: "APEX Bespoke Hyper-Streetfighter",
      category: "01 // Concept Motorcycle & Vehicle Architecture",
      badge: "Flagship Hyperbike",
      brand: "MV Agusta Inspired",
      logo: "assets/branding/mv-agusta-logo.webp",
      heroImage: "assets/bespoke/apex-hero-3quarter.webp",
      summary: "A high-performance bespoke motorcycle concept exploring Formula 1 aerodynamic downforce language, sculpted precision, and a minimalist floating cantilevered tail.",
      views: {
        quarter: "assets/bespoke/apex-hero-3quarter.webp",
        front: "assets/bespoke/apex-front-view.webp",
        top: "assets/bespoke/apex-top-view.webp",
        charcoal: "assets/bespoke/apex-charcoal-render.webp",
        studioDark: "assets/bespoke/apex-studio-dark.webp",
        studioGold: "assets/bespoke/apex-studio-gold.webp"
      },
      compare: {
        before: "assets/bespoke/apex-proportions-sketch.webp",
        beforeLabel: "Raw Pencil Proportion Architecture",
        after: "assets/bespoke/apex-studio-dark.webp",
        afterLabel: "Photorealistic Obsidian Studio Render"
      }
    },
    {
      id: "aprilia-accessory",
      title: "Aprilia Tuono 457 Modular Side Rack",
      category: "02 // Automotive Accessory & Ergonomic Utility",
      badge: "1:1 Validated Prototype",
      brand: "Aprilia Racing",
      logo: "assets/branding/aprilia-logo.webp",
      heroImage: "assets/accessory/tuono-commuter-bag-loadout.webp",
      summary: "Tool-free, slide-in luggage architecture engineered specifically for the Aprilia Tuono 457. Solves urban commuter backpack fatigue while maintaining the aggressive silhouette of the motorcycle.",
      views: {
        loaded: "assets/accessory/tuono-commuter-bag-loadout.webp",
        component: "assets/accessory/tuono-rack-component.webp",
        dualMaterial: "assets/accessory/tuono-dual-material-frame.webp",
        colorMatched: "assets/accessory/tuono-color-match-study.webp",
        cad3d: "assets/accessory/tuono-cad-latch-clearance.webp",
        liveTest: "assets/accessory/tuono-proto-bike-test.webp"
      }
    },
    {
      id: "jawa-bobber",
      title: "Custom JAWA Bobber Motorcycle Architecture",
      category: "03 // Modern Classic Cruiser & Custom Surfacing",
      badge: "Complete Motorcycle Architecture Case Study",
      brand: "Jawa Motorcycles",
      logo: "assets/branding/jawa-logo.webp",
      heroImage: "assets/bobber/bobber-slide-34.webp",
      summary: "A contemporary reinterpretation of the iconic Jawa Bobber. Combines classic heritage cruiser teardrop tank surfacing with clean modern chassis packaging, low-slung ergonomics, and a bespoke cantilevered solo saddle.",
      views: {
        hero3quarter: "assets/bobber/bobber-slide-34.webp",
        sideProfile: "assets/bobber/bobber-slide-35.webp",
        frontLowAngle: "assets/bobber/bobber-slide-36.webp",
        tankSurfacing: "assets/bobber/bobber-slide-37.webp",
        rearFloatingTail: "assets/bobber/bobber-slide-38.webp",
        wireframeMesh: "assets/bobber/bobber-cad-wireframe-mesh.webp"
      },
      compare: {
        before: "assets/bobber/bobber-slide-32.webp",
        beforeLabel: "Selected Ideation Form & Vector Line Drawing",
        after: "assets/bobber/bobber-slide-34.webp",
        afterLabel: "Photorealistic Dynamic 3/4 Studio Render"
      }
    }
  ]
};

// Export to window
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
