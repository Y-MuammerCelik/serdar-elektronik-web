'use client';

import { useState } from 'react';

const faqData = [
  {
    q: 'Tamir işlemleri ne kadar sürüyor?',
    a: 'Arızanın durumuna ve yedek parça teminine göre değişmekle birlikte, cihazların %80\'ini aynı gün içerisinde teslim ediyoruz. Detaylı bilgi için arıza kaydı oluşturabilirsiniz.',
  },
  {
    q: 'Yapılan işlemlerde garanti veriyor musunuz?',
    a: 'Evet, değiştirdiğimiz tüm yedek parçalara ve işçiliğimize marka bazlı olarak 6 ay ile 1 yıl arasında garanti veriyoruz.',
  },
  {
    q: 'Evden cihaz teslim alıyor musunuz?',
    a: 'Evet, Trabzon Arsin ve çevresi için eve servis imkanımız bulunmaktadır. Kurulum, söküm ve taşıma işlemleri uzman ekibimiz tarafından yapılmaktadır.',
  },
  {
    q: 'Hangi marka ve cihazlara servis veriyorsunuz?',
    a: 'Samsung, LG, Vestel, Arçelik, Sony ve daha birçok markanın TV, uydu alıcısı, ses sistemi ve diğer elektronik cihazlarına servis veriyoruz.',
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section style={{ background: 'var(--bg-light)' }}>
      <h2 className="section-title">Sıkça Sorulan Sorular</h2>
      <div className="faq-container">
        {faqData.map((item, i) => (
          <div className={`faq-item ${active === i ? 'active' : ''}`} key={i}>
            <button className="faq-question" onClick={() => setActive(active === i ? null : i)}>
              {item.q}
              <span className="faq-icon">{active === i ? '-' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
