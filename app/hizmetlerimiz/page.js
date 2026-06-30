'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const services = [
  {
    id: 1,
    icon: '📺',
    title: 'Televizyon Tamiri',
    desc: 'Ekran değişimi, LED bar değişimi, anakart onarımı ve panel tamiri.',
    details: 'Her marka ve model (LED, LCD, OLED, QLED) televizyonunuzun orijinal yedek parça kullanılarak evinizde veya servisimizde garantili olarak onarımını yapıyoruz. Ekranda kararma, ses var görüntü yok, ölü piksel gibi tüm sorunları profesyonel cihazlarımızla tespit edip çözüyoruz.',
  },
  {
    id: 2,
    icon: '📡',
    title: 'Çanak Anten & Uydu',
    desc: 'Çanak anten montajı, sinyal yok sorunu, LNB değişimi ve kanal ayarlama.',
    details: 'Merkezi uydu sistemleri kurulumu ve onarımı, bireysel çanak anten montajı, ince sinyal ayarı ve "Sinyal Yok" arızalarının kesin çözümü. Ayrıca güncel kanal listelerinin yüklenmesi işlemlerini hızla gerçekleştiriyoruz.',
  },
  {
    id: 3,
    icon: '🔊',
    title: 'Ses Sistemleri',
    desc: 'Amfi, ev sinema sistemi ve oto teyp onarımı ile özel kurulum hizmetleri.',
    details: 'Cızırtı yapan hoparlörler, açılmayan amfiler ve ses kesilmelerine karşı kesin çözüm. Düğün salonları, kafeler veya ev sinema sistemleri için sıfırdan akustik hesaplı kurulum yapıyoruz.',
  },
  {
    id: 4,
    icon: '📷',
    title: 'Güvenlik Kamera Sistemleri',
    desc: 'Kamera kurulumu, DVR cihaz arızaları ve uzaktan izleme ayarları.',
    details: 'Eviniz veya iş yeriniz için AHD ve IP güvenlik kamerası sistemlerinin projelendirilmesi ve kurulumu. İnternet üzerinden cep telefonu ile 7/24 kesintisiz izleme ayarları ve kayıt cihazı (DVR/NVR) arızalarının giderilmesi.',
  }
];

export default function Hizmetlerimiz() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <Navbar />
      
      <div className="page-header">
        <h1>Hizmetlerimiz</h1>
        <p>Geniş hizmet yelpazemiz ve uzman kadromuzla elektronik sorunlarınızı çözüyoruz.</p>
      </div>

      <section>
        <div className="grid-container">
          {services.map((s) => (
            <div className="card" key={s.id}>
              <div className="card-content" style={{ padding: '40px 20px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p style={{ color: '#555', marginBottom: '20px' }}>{s.desc}</p>
                <button className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => setActiveModal(s)}>
                  Detaylı Bilgi
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      <div className={`modal-overlay ${activeModal ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setActiveModal(null); }}>
        <div className="service-modal">
          <button className="close-modal" onClick={() => setActiveModal(null)}>&times;</button>
          {activeModal && (
            <>
              <h2>{activeModal.icon} {activeModal.title}</h2>
              <div className="modal-section">
                <h4>Hizmet Kapsamı:</h4>
                <p>{activeModal.details}</p>
              </div>
              <div className="modal-section">
                <h4>Neden Bizi Seçmelisiniz?</h4>
                <ul>
                  <li>Hızlı ve yerinde müdahale</li>
                  <li>Orijinal yedek parça garantisi</li>
                  <li>Uzman işçilik ve uygun fiyat</li>
                </ul>
              </div>
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <a href="https://wa.me/905378976461" target="_blank" className="btn btn-success">WhatsApp'tan Fiyat Al</a>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
