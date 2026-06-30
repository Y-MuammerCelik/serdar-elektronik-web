import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewSlider from '@/components/ReviewSlider';
import DistanceCalculator from '@/components/DistanceCalculator';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="announcement">
        <div className="announcement-text">
          🔥 Kampanya: İlk arıza tespitinde %20 indirim! | Trabzon içi ücretsiz servis imkanı...
        </div>
      </div>

      <header className="hero">
        <h1>Bozuldu Diye Üzülmeyin,<br /><span>Biz Buradayız!</span></h1>
        <h2>Trabzon Arsin'de 10 Yıllık Tecrübeyle Garantili Elektronik Onarım ve Kurulum Hizmeti</h2>
        <div className="hero-cta">
          <Link href="#calculator" className="btn btn-primary">🚗 Mesafe Hesapla</Link>
          <Link href="/hizmetlerimiz" className="btn btn-outline">🔧 Hizmetlerimiz</Link>
        </div>
      </header>

      <section style={{ background: 'var(--bg-light)' }}>
        <h2 className="section-title">Nasıl Çalışıyoruz?</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-icon">📞</div>
            <h4>1. İletişim & Kayıt</h4>
            <p>Arıza formunu doldurun veya WhatsApp'tan bize ulaşın.</p>
          </div>
          <div className="step">
            <div className="step-icon">🚗</div>
            <h4>2. Ücretsiz Tespit</h4>
            <p>Evinizden cihazı alıp, arıza tespiti ve fiyatlandırma yapalım.</p>
          </div>
          <div className="step">
            <div className="step-icon">🔧</div>
            <h4>3. Hızlı Onarım</h4>
            <p>Onayınızla orijinal parça kullanarak cihazı onaralım.</p>
          </div>
          <div className="step">
            <div className="step-icon">✨</div>
            <h4>4. Garantili Teslimat</h4>
            <p>Cihazı evinize kurup, test ederek teslim edelim.</p>
          </div>
        </div>
      </section>

      <DistanceCalculator />

      <ReviewSlider />

      <FAQ />

      <ContactForm />

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
