'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', phone: '', deviceType: '', problem: '', address: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: '', phone: '', deviceType: '', problem: '', address: '' });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' });
    }
    setLoading(false);
  };

  const update = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <section className="contact-form-section">
      <h2 className="section-title">Online Arıza Kaydı</h2>
      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>İsim Soyisim *</label>
            <input type="text" required placeholder="Adınız Soyadınız" value={formData.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telefon Numarası *</label>
            <input type="tel" required placeholder="05XX XXX XX XX" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Cihaz Türü *</label>
            <select required value={formData.deviceType} onChange={(e) => update('deviceType', e.target.value)}>
              <option value="">Seçiniz...</option>
              <option value="TV">Televizyon</option>
              <option value="Uydu">Uydu Alıcısı / Çanak Anten</option>
              <option value="Ses Sistemi">Ses Sistemi / Amfi</option>
              <option value="Güvenlik">Güvenlik Kamerası</option>
              <option value="Diğer">Diğer Elektronik</option>
            </select>
          </div>
          <div className="form-group">
            <label>Arıza Açıklaması *</label>
            <textarea rows="4" required placeholder="Cihazınızın arızasını kısaca açıklayın..." value={formData.problem} onChange={(e) => update('problem', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Adresiniz (Opsiyonel - Eve servis için)</label>
            <input type="text" placeholder="Mahalle, Cadde, Sokak..." value={formData.address} onChange={(e) => update('address', e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Gönderiliyor...' : '📋 Arıza Kaydı Oluştur'}
          </button>
          {message && <div className={`form-message ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </section>
  );
}
