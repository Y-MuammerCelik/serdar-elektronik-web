'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function FotoGaleri() {
  const sliderRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    if (!clientX) return;
    
    let xPos = ((clientX - rect.left) / rect.width) * 100;
    if (xPos < 0) xPos = 0;
    if (xPos > 100) xPos = 100;
    setSliderPos(xPos);
  };

  const images = [
    { src: '/img/dukkan.jpeg', title: 'Mağazamız' },
    { src: '/img/lcd ekran tamiri.jpg', title: 'TV Panel Onarımı' },
    { src: '/img/uydu ve tv kurulumu.webp', title: 'Uydu Kurulumu' },
    { src: '/img/ses sistemleri.webp', title: 'Ses Sistemleri' },
    { src: '/img/merkezi güvenlik sistemleri.jpg', title: 'Kamera Montajı' },
    { src: '/img/tv tamiri.jpg', title: 'Servis Anı' }
  ];

  return (
    <>
      <Navbar />
      
      <div className="page-header">
        <h1>Foto Galeri</h1>
        <p>Yaptığımız işlerden kareler ve onarım süreçlerimiz</p>
      </div>

      <section>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title">TV Panel Onarımı (Öncesi / Sonrası)</h2>
          <p style={{ color: '#555', marginBottom: '30px' }}>
            Kırık, çizgili veya karanlık panelleri nasıl yenilediğimizi kendi gözlerinizle görün. 
            Kaydırıcıyı sağa sola hareket ettirin.
          </p>

          <div 
            ref={sliderRef}
            className="ba-slider-container" 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '400px', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              touchAction: 'none'
            }}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* After Image (Background) */}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              backgroundImage: 'url(/img/lcd%20ekran%20tamiri.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 
            }}>
              <span style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>Sonrası ✨</span>
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', 
              backgroundImage: 'url(/img/tv%20tamiri.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1,
              borderRight: '4px solid var(--secondary-color)'
            }}>
              <span style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>Öncesi 🔧</span>
            </div>

            {/* Slider Button */}
            <div style={{
              position: 'absolute', top: '50%', left: `${sliderPos}%`, transform: 'translate(-50%, -50%)',
              width: '40px', height: '40px', background: 'var(--secondary-color)', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)', zIndex: 2, pointerEvents: 'none'
            }}>
              <span style={{ transform: 'rotate(90deg)' }}>⇅</span>
            </div>
          </div>
        </div>

        <h2 className="section-title">Çalışmalarımızdan Kareler</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {images.map((img, i) => (
            <div key={i} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', position: 'relative', aspectRatio: '4/3' }} className="gallery-item">
              <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .gallery-item:hover img { transform: scale(1.1); }
          @media (max-width: 768px) {
            .ba-slider-container { height: 250px !important; }
          }
        `}} />
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
