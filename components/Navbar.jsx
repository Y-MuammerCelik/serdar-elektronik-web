'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyOpen, setFlyOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const links = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/hizmetlerimiz', label: 'HİZMETLERİMİZ' },
    { href: '/yetkili-servis', label: 'YETKİLİ SERVİS' },
    { href: '/foto-galeri', label: 'FOTO GALERİ' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link href="/">SERDAR <span>ELEKTRONİK</span></Link>
        </div>

        <div className={`hamburger ${menuOpen ? 'toggle' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} title="Tema Değiştir">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="fly-menu-btn" onClick={() => { setFlyOpen(true); setMenuOpen(false); }}>
              İletişim & Geliştirici
            </button>
          </div>
        </div>
      </nav>

      {/* Fly Menu */}
      <div id="flyMenu" className={flyOpen ? 'open' : ''}>
        <button className="close-menu-btn" onClick={() => setFlyOpen(false)}>&times;</button>
        <div className="photo">
          <img src="/img/foto.jpg" alt="Muammer Çelik" />
        </div>
        <div className="title">
          <h2>Muammer Çelik</h2>
          <h4>Öğrenci & Geliştirici</h4>
        </div>
        <ul className="mainMenu">
          <li><a target="_blank" href="https://www.instagram.com/mmmr_clk_61/">📸 İnstagram</a></li>
          <li><a target="_blank" href="https://www.facebook.com/muammer.celik.121">📘 Facebook</a></li>
          <li><a target="_blank" href="https://www.youtube.com/channel/UC6ljECf1dqznIpgFBCwc6nQ">🎥 YouTube</a></li>
          <li><a target="_blank" href="https://github.com/smithcimuo">💻 Github</a></li>
          <li><a href="mailto:muammeer.clk@gmail.com">✉️ Mail Gönder</a></li>
        </ul>
      </div>
    </>
  );
}
