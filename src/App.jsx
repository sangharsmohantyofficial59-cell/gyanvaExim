import React, { useState, useEffect } from "react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import WhyPage from "./pages/WhyPage";
import NewsPage from "./pages/NewsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import { PAGE_PATHS } from "./constants";

const PAGE_META = {
  home: {
    title: "Gyanav Exim | Global Export, Import & Turnkey Projects",
    description: "Gyanav Exim Private Limited supplies minerals, metals, agricultural commodities, edible oils, cargo logistics and turnkey project consultancy worldwide.",
  },
  about: { title: "About Gyanav Exim | Global Trade Partner", description: "Learn about Gyanav Exim Private Limited, an Indian export and import house serving global customers since 2022." },
  products: { title: "Products | Minerals, Metals & Agricultural Commodities | Gyanav Exim", description: "Explore Gyanav Exim products including bauxite, coal, iron ore, copper, spices, sesame, beans and edible oils." },
  services: { title: "Services | Cargo Logistics & Project Consultancy | Gyanav Exim", description: "Gyanav Exim provides cargo logistics, international trade support and turnkey project consultancy." },
  why: { title: "Why Gyanav Exim | Quality, Commitment & Value", description: "Discover why customers choose Gyanav Exim for dependable quality products, services and international trade support." },
  news: { title: "News, Events & Blogs | Gyanav Exim", description: "News, events and updates from Gyanav Exim Private Limited." },
  reviews: { title: "Customer Reviews | Gyanav Exim", description: "Read customer feedback and reviews for Gyanav Exim Private Limited." },
  contact: { title: "Contact Gyanav Exim | Export, Import & Consultancy", description: "Contact Gyanav Exim Private Limited for minerals, metals, agricultural commodities, edible oils and turnkey project services." },
};

function pageFromPath(pathname) {
  return Object.keys(PAGE_PATHS).find((key) => PAGE_PATHS[key] === pathname) || "home";
}

export default function App() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));

  const navigate = (nextPage) => {
    const nextPath = PAGE_PATHS[nextPage] || PAGE_PATHS.home;
    if (window.location.pathname !== nextPath) window.history.pushState({}, "", nextPath);
    setPage(nextPage);
  };

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = PAGE_META[page] || PAGE_META.home;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://gyanavexim.com${PAGE_PATHS[page]}`);
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    products: <ProductsPage />,
    services: <ServicesPage />,
    why: <WhyPage />,
    news: <NewsPage />,
    reviews: <ReviewsPage />,
    contact: <ContactPage />,
  };

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#F7F2E7",
        color: "#2A2A26",
        minHeight: "100vh",
        fontSize: 17,
        lineHeight: 1.6,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html { font-size: 17px; }
        * { box-sizing: border-box; }
        button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid #B5502D;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
        @media (min-width: 900px) {
          .ge-desktop-nav { display: flex !important; }
          .ge-menu-btn { display: none !important; }
        }
        @media (min-width: 640px) {
          .ge-footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .ge-why-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .ge-frame { padding: 0 22px !important; }
        }
      `}</style>
      <Header page={page} setPage={navigate} />
      {pages[page]}
      <Footer setPage={navigate} />
      <WhatsAppButton />
    </div>
  );
}
