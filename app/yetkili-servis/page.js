import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function YetkiliServis() {
  const brands = [
    { name: 'Samsung', logo: '/img/vetsel.png' }, // using existing images for placeholders
    { name: 'LG', logo: '/img/beko.png' },
    { name: 'Vestel', logo: '/img/vetsel.png' },
    { name: 'Arçelik', logo: '/img/vetsel.png' },
    { name: 'Beko', logo: '/img/beko.png' },
    { name: 'Sony', logo: '/img/sony.png' },
    { name: 'Next&NextStar', logo: '/img/nextnextstar.png' },
    { name: 'Botech', logo: '/img/botech.png' },
    { name: 'Gold Master', logo: '/img/gold master.png' },
    { name: 'Digitürk', logo: '/img/dijitürk.png' },
  ];

  return (
    <>
      <Navbar />
      
      <div className="page-header">
        <h1>Yetkili Servisimiz</h1>
        <p>Dünyanın ve Türkiye'nin önde gelen markaları için özel servis hizmeti</p>
      </div>

      <section>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">Hizmet Verdiğimiz Markalar</h2>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Aşağıdaki markaların garantili/garantisiz cihazlarına profesyonel teknik destek sağlıyoruz. 
            Orijinal yedek parça ve marka standartlarına uygun onarım garantisiyle hizmetinizdeyiz.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          {brands.map((b, i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '180px',
              height: '100px',
              transition: 'var(--transition)'
            }}
            className="brand-card"
            >
              <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)', opacity: '0.7', transition: 'var(--transition)' }} />
            </div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .brand-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .brand-card:hover img { filter: grayscale(0%); opacity: 1; transform: scale(1.1); }
          [data-theme='dark'] .brand-card { background: #1e293b; }
          [data-theme='dark'] .brand-card img { filter: grayscale(100%) brightness(200%); }
          [data-theme='dark'] .brand-card:hover img { filter: grayscale(0%) brightness(100%); }
        `}} />
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
