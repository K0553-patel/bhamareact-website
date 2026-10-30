import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Machinery", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header style={{
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'white',
      boxShadow: isScrolled ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.4s ease',
      height: isScrolled ? '70px' : '90px',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 5000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002b5b' }}>BHAMA</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--accent)', marginLeft: '6px' }}>INDUSTRIES</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#002b5b' : '#64748b',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.95rem',
                position: 'relative',
                padding: '5px 0'
              })}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--accent)'
                    }}></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }} className="desktop-nav">
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 700 }}>Sales/Support</p>
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#002b5b', margin: 0 }}>+91 95584 83100</p>
          </div>
          <Link to="/contact" className="btn btn-primary desktop-nav" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Enquiry
          </Link>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#002b5b'
            }}
            className="mobile-burger"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: isScrolled ? '70px' : '90px',
          left: 0,
          width: '100%',
          height: `calc(100vh - ${isScrolled ? '70px' : '90px'})`,
          background: 'white',
          zIndex: 4000,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem'
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#002b5b',
                fontSize: '1.5rem',
                fontWeight: 700,
                padding: '1.5rem 0',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              {link.name}
            </NavLink>
          ))}
          <div style={{ marginTop: 'auto', padding: '2rem 0' }}>
            <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Direct Line</p>
            <h3 style={{ fontSize: '1.5rem', color: '#002b5b' }}>+91 95584 83100</h3>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
