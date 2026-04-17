/**
 * Global Asset Registry for Future Brew
 * Centralized location for all images, logos, and branding identifiers.
 */

export const ASSETS = {
  // BRANDING
  BRAND_NAME: "Future Brew",
  BRAND_SLOGAN: "The global leader in molecular extraction and hyper-caffeinated experience labs.",
  BRAND_ICON: "cyclone", // Material Icons name
  ADMIN_PASSPHRASE: "FW2026",
  
  // LOGOS & ICONS
  LOGOS: {
    PRIMARY: "/logo.png", // Fallback if local exists
    MATERIAL_ICON: "cyclone",
    THEME_LIGHT: "light_mode",
    THEME_DARK: "dark_mode",
    CART: "shopping_cart",
  },
  
  // HOME PAGE ASSETS
  HOME: {
    HERO_BG: "https://lh3.googleusercontent.com/aida-public/AB6AXuATFcUF-KktlW76Gjr478mTRrfvnnFyct3ySS1pA1550WcK9ZmOn7j5toraF-L4GJOqyyib-yKJnwF-yp3G8A_s50CwXb2Q-7VCM6a0O9BFQr8sRGaV9gagjPG0duC_82KwtRL6c6S9CbVBy9rlUdT5bsrSUubmzqRvBtQbwxoyacehLfiZnvLNBRjwGEbTy0RpbiFLJTzZo1isVPap2V5Rigot6GPMlmvKZ2KmK1Z_tQoHdWJXQbPrd3K2pdPqHFQpfgRwKAQ6Jyo",
    LAB_GEAR: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEbZNucJT_VXKzjNr3GH6bNXpyvqkcHQFkH5sN5W5j3ZWp-GNeLq1YIY7n2qehekaKXT77eDTBJsZEyxJYwSXRiEc8IOdpaEoPxVfpazak9B28rqH_4Tj4cKvhsdQcGbuD22cNZzMs5RE_vNuGI7jsLyQD7XPZ02b0AJoa1B4G8XFnqjgc6J69xYhIdL1-02lljAmciRGKA4Da_aHp8mVZv76ksG70veLOuMITi1RUHBgi-6h4FQCo-p2AAzmB9HwOnlXe88nZM6M",
    LAB_FILES: [
      { 
        title: "Nitro Oak", 
        category: "COLD EXTRACTION", 
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYX4waW6PlhNH56Rszn6HZ4hk3OtynauSw3LHEPnPDW6vuEjnabOCPt56mj4WCQ3R_f_zGq0ecodlGvAlpJsa0tWaYhqbjkReyeGfZhyMtbTagmqSUX8b4UfTmKGvSFcHas3T8YmzlOvfhuFkbTSwfKGzbwhY81AETHE_nefg9OS88odgLnr5nXL1y_EG_2mLO9LUk6gRvDxEbm7Y2PVzAyeLY6feE6XrkBWRhj24ow3XRDbzRT1X8T_wUedfbsUTesSzE3nm_qiE" 
      },
      { 
        title: "Spherified Matcha", 
        category: "MOLECULAR", 
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg0WDT9q8UWN63YSfJk7s_NaSyQntTN4Z8H2xhG9JVilfrmNWODep1qTjLOx0f4J2CAiYgjakmJbvyPTGySnZilzNzIot9xNVY4WFMqMOxPkPB9-XhbW5fnPVg-OiVSyV24LnL8ZqWicoKZlPZP0UI_I9pSHHRRbakUAyvNGoP-YV7T8T249Wt5cPZMuRe746SWCo-rPaY67CbnyQZIJqyc-9UMbpnTND2ERtHg74d1WgD20BdmPOHt4bT1_QWLNu-WiId8N2FB1k" 
      },
      { 
        title: "Plasma Cortado", 
        category: "THERMAL", 
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtFaVwAJRI9vPEub9L-xAPgPOkZebkVVS1VkCT1vwXiA-1HUBqhKABFPp2PGB7Y4TkNbiDmkPTopJc2VgQ0XOrabiz-QYrLC_PfkKqCvw774N0p9hpHhAEqcgrIGEWXdtBPfxBN-qIjXTCyGp577G8wy0V24ICQdPpdvjURbWoy7WRNb9WdXLEloxBbhzmtOQO1a-NjFUJIPfXkiSZsS0l1a8d-TKVAXXN4GKwV9oD3WSJDsyMnvy24m94iKO18LrF75P8DnuKdzg" 
      }
    ]
  },
  
  // DEFAULT PRODUCT SEED IMAGES
  SEED_IMAGES: {
    ESPRESSO: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400",
    CRYO_BREW: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400",
    LATTE: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=400",
    TEA: "https://images.unsplash.com/photo-1594631252845-29fc4586d5d7?auto=format&fit=crop&q=80&w=400",
    PASTRY: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=400"
  },
  
  // SOCIAL LINKS
  SOCIAL: [
    { label: "X", icon: "x", url: "#" },
    { label: "INSTAGRAM", icon: "instagram", url: "#" },
    { label: "LINKEDIN", icon: "linkedin", url: "#" }
  ]
};
