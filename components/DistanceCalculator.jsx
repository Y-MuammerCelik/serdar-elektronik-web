'use client';

import { useState } from 'react';

export default function DistanceCalculator() {
  const [result, setResult] = useState('');
  const shopLat = 40.9450;
  const shopLon = 39.9320;

  const calculate = () => {
    setResult('<span style="color:#aaa">Konumunuz bulunuyor, lütfen bekleyin...</span>');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          const url = `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${shopLon},${shopLat}?overview=false`;

          fetch(url)
            .then(res => res.json())
            .then(data => {
              if (data.code === 'Ok' && data.routes?.length > 0) {
                const km = (data.routes[0].distance / 1000).toFixed(1);
                const min = Math.ceil(data.routes[0].duration / 60);
                setResult(`🚗 Size olan uzaklığımız: <strong>${km} km</strong><br>⏱️ Tahmini servis varış süresi: <strong>${min} dakika</strong>`);
              } else {
                setResult('<span style="color:#ff3366">Mesafe hesaplanamadı.</span>');
              }
            })
            .catch(() => setResult('<span style="color:#ff3366">Hesaplama servisine ulaşılamıyor.</span>'));
        },
        (error) => {
          const msgs = {
            1: 'Konum izni reddedildi.',
            2: 'Konum bilgisine ulaşılamıyor.',
            3: 'Konum alma isteği zaman aşımına uğradı.',
          };
          setResult(`<span style="color:#ff3366">${msgs[error.code] || 'Bilinmeyen bir hata oluştu.'}</span>`);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setResult('<span style="color:#ff3366">Tarayıcınız konum servisini desteklemiyor.</span>');
    }
  };

  return (
    <section id="calculator">
      <div className="calculator-section">
        <h2>Hızlı Servis, Anında Müdahale</h2>
        <p style={{ marginTop: '15px', fontSize: '1.1rem', opacity: 0.9 }}>
          Bize ne kadar uzaktasınız? Servis aracımızın size ne kadar sürede ulaşabileceğini hemen öğrenin.
        </p>
        <div className="calculator-box">
          <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }} onClick={calculate}>
            📍 Konumumu Kullanarak Hesapla
          </button>
          <div id="calcResult" style={{ marginTop: '20px' }} dangerouslySetInnerHTML={{ __html: result }} />
          <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.7 }}>
            (Tarayıcı konum izni gerektirir. Verileriniz kaydedilmez.)
          </p>
        </div>
      </div>
    </section>
  );
}
