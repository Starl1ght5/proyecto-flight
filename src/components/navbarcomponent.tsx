import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logoroyal.png";

export default function Navbar() {
  const [cookies, , removeCookie] = useCookies(["RoyalUserToken"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(Boolean(cookies.RoyalUserToken));
  }, [cookies]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    removeCookie("RoyalUserToken", { path: "/" });
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .ra-nav { font-family: 'DM Sans', sans-serif; }
        .ra-nav-link:hover { background: rgba(255,255,255,0.07) !important; color: rgba(255,255,255,0.9) !important; }
        .ra-user-btn:hover { border-color: rgba(37,99,235,0.5) !important; background: rgba(29,78,216,0.1) !important; }
        .ra-login-btn:hover { background: #2563eb !important; }
        .ra-dd-item:hover { background: rgba(255,255,255,0.05) !important; }
        .ra-dd-logout:hover { background: rgba(248,113,113,0.08) !important; }
        .ra-mobile-item:hover { background: rgba(255,255,255,0.06) !important; color: rgba(255,255,255,0.9) !important; }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="ra-nav sticky top-0 z-50"
        style={{
          background: scrolled ? "rgba(10,12,18,0.96)" : "rgba(10,12,18,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1280, margin: "0 auto", width: "100%" }}>

          {/* LOGO */}
          <motion.div
            onClick={() => navigateTo("/")}
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={logo}
              alt="Royal Airlines Logo"
              className="w-10 lg:w-12"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span
              className="hidden sm:block font-bold text-lg transition-colors"
              style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.01em' }}
            >
              Royal <span style={{ color: '#3b82f6' }}>Airlines</span>
            </span>
          </motion.div>

          {/* NAV DESKTOP */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 2 }}>
            <NavLink onClick={() => navigateTo("/#recommendation")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3c-2 2.5-3 5-3 9s1 6.5 3 9M12 3c2 2.5 3 5 3 9s-1 6.5-3 9"/></svg>
              ¿No sabes a dónde ir?
            </NavLink>
            <NavLink onClick={() => navigateTo("/explore")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
              Explorar
            </NavLink>
            <NavLink onClick={() => navigateTo("/help-center")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 17v.01M12 13a2 2 0 0 0 .914-3.782 1.98 1.98 0 0 0-2.414.483"/></svg>
              Centro de Ayuda
            </NavLink>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div style={{ position: "relative" }}>
                  <motion.button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="ra-user-btn"
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 14px 6px 6px", borderRadius: 24,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      cursor: "pointer", transition: "all 0.15s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div style={{ width: 30, height: 30, background: '#1d4ed8', borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>Mi Cuenta</span>
                    <motion.svg
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M19 9l-7 7-7-7"/>
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          style={{
                            position: "absolute", right: 0, marginTop: 8, width: 240,
                            background: "#0f1117",
                            borderRadius: 14,
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                            padding: 6, zIndex: 20,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {/* Header */}
                          <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 4 }}>
                            <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Mi gestión</p>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                              Royal <span style={{ color: '#3b82f6' }}>Airlines</span>
                            </p>
                          </div>

                          <DropdownItem
                            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                            onClick={() => navigateTo("/user-profile")}
                          >
                            Mi Perfil
                          </DropdownItem>

                          <DropdownItem
                            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>}
                            onClick={() => navigateTo("/my-tickets")}
                          >
                            Mis Tiquetes
                          </DropdownItem>

                          {/* Logout */}
                          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 4, paddingTop: 4 }}>
                            <motion.button
                              onClick={handleLogout}
                              className="ra-dd-logout"
                              style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "8px 12px", borderRadius: 8, width: "100%",
                                border: "none", background: "none", cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif", transition: "background 0.12s",
                              }}
                              whileHover={{ x: 3 }}
                            >
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(248,113,113,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 500, color: "#f87171" }}>Cerrar Sesión</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => navigateTo("/login")}
                  className="ra-login-btn"
                  style={{
                    background: "#1d4ed8", color: "#fff", border: "none",
                    borderRadius: 10, padding: "9px 20px", fontSize: 13,
                    fontWeight: 500, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.01em", transition: "background 0.15s",
                    boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Iniciar Sesión
                </motion.button>
              )}
            </div>

            {/* HAMBURGER */}
            <motion.button
              className="md:hidden"
              style={{
                padding: 8, borderRadius: 8, cursor: "pointer",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              style={{
                position: "fixed", right: 0, top: 0, height: "100%",
                width: "85%", maxWidth: 340,
                background: "#0f1117",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "-8px 0 48px rgba(0,0,0,0.7)",
                display: "flex", flexDirection: "column",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {/* Mobile header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, background: "#1d4ed8", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    Royal <span style={{ color: "#3b82f6" }}>Airlines</span>
                  </span>
                </div>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </motion.button>
              </div>

              {/* Mobile links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 16px", flex: 1, overflowY: "auto" }}>
                <MobileMenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3c-2 2.5-3 5-3 9s1 6.5 3 9M12 3c2 2.5 3 5 3 9s-1 6.5-3 9"/></svg>} onClick={() => navigateTo("/#recommendation")}>
                  ¿No sabes a dónde ir?
                </MobileMenuItem>
                <MobileMenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>} onClick={() => navigateTo("/explore")}>
                  Explorar
                </MobileMenuItem>
                <MobileMenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 17v.01M12 13a2 2 0 0 0 .914-3.782 1.98 1.98 0 0 0-2.414.483"/></svg>} onClick={() => navigateTo("/help-center")}>
                  Centro de Ayuda
                </MobileMenuItem>

                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />

                {isAuthenticated ? (
                  <>
                    <MobileMenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>} onClick={() => navigateTo("/user-profile")}>
                      Mi Perfil
                    </MobileMenuItem>
                    <MobileMenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>} onClick={() => navigateTo("/my-tickets")}>
                      Mis Tiquetes
                    </MobileMenuItem>
                    <motion.button
                      onClick={handleLogout}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 14px", borderRadius: 10,
                        border: "none", background: "none", cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                        fontWeight: 500, color: "#f87171",
                        marginTop: 8, transition: "background 0.12s",
                        width: "100%", textAlign: "left",
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                      </svg>
                      Cerrar Sesión
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => navigateTo("/login")}
                    style={{
                      background: "#1d4ed8", color: "#fff", border: "none",
                      borderRadius: 10, padding: "13px", fontSize: 14,
                      fontWeight: 500, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: 8, width: "100%",
                      boxShadow: "0 4px 20px rgba(29,78,216,0.35)",
                      transition: "background 0.15s",
                    }}
                    whileHover={{ scale: 1.02, background: '#2563eb' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Iniciar Sesión
                  </motion.button>
                )}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    className="ra-nav-link"
    style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "7px 14px", borderRadius: 8,
      fontSize: 13, fontWeight: 500,
      color: "rgba(255,255,255,0.5)",
      border: "none", background: "none", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
    }}
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

const DropdownItem: React.FC<{ icon: React.ReactNode; onClick: () => void; children: React.ReactNode }> = ({ icon, onClick, children }) => (
  <motion.button
    onClick={onClick}
    className="ra-dd-item"
    style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 12px", borderRadius: 8, width: "100%",
      border: "none", background: "none", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif", transition: "background 0.12s",
    }}
    whileHover={{ x: 3 }}
  >
    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {icon}
    </div>
    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{children}</span>
  </motion.button>
);

const MobileMenuItem: React.FC<{ icon: React.ReactNode; onClick: () => void; children: React.ReactNode }> = ({ icon, onClick, children }) => (
  <motion.button
    onClick={onClick}
    className="ra-mobile-item"
    style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 14px", borderRadius: 10,
      border: "none", background: "none", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif", fontSize: 14,
      fontWeight: 500, color: "rgba(255,255,255,0.55)",
      transition: "background 0.12s", width: "100%", textAlign: "left",
    }}
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon}
    {children}
  </motion.button>
);