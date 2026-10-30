import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const sitemapLinks = [
    { label: "Home", to: "/" },
    { label: "Machinery", to: "/products" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  return (
    <footer style={{ background: '#001a35', color: 'white', padding: '6rem 0 2rem' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          {/* Company Identity */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              BHAMA <span style={{ color: 'var(--accent)' }}>INDUSTRIES</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Leading manufacturer and exporter of precision pharmaceutical, cosmetic, and beverage machinery.
              Engineering excellence since 1995.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              {/* Social placeholders */}
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>in</div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>f</div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--accent-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Sitemap</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sitemapLinks.map(link => (
                <li key={link.label} style={{ marginBottom: '0.8rem' }}>
                  <Link to={link.to} style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: '0.3s'
                  }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li style={{ marginBottom: '0.8rem' }}>
                <a href="/brochure.pdf" download="Bhama_Industries_Catalog.pdf" target="_blank" rel="noopener noreferrer" style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: '0.3s'
                }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  Download Brochure
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details from PDF */}
          <div>
            <h4 style={{ color: 'var(--accent-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Get in Touch</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Contact Number:</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>+91 95584 83100</p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Email:</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>bhamasind@gmail.com</p>
            </div>
          </div>

          {/* Office Address from PDF */}
          <div>
            <h4 style={{ color: 'var(--accent-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Addresses</h4>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)' }}>REGISTER OFFICE:</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                90, Shahitay Industrial Hub, Bakrol-Bujrang, Ahmedabad-382430
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent)' }}>WORKS ADDRESS:</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Shed No 156, Abhishree Industrial Park, Odhav, Ahmedabad-382415
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            © {currentYear} Bhama Industries. All Rights Reserved. Designed for Industrial Excellence.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
