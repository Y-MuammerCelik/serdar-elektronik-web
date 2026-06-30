# Serdar Elektronik - Full-Stack Teknik Servis Uygulaması 🚀

Bu proje, Trabzon Arsin'de hizmet veren **Serdar Elektronik** için özel olarak geliştirilmiş modern, dinamik ve tam teşekküllü (Full-Stack) bir web uygulamasıdır. Statik bir HTML sitesinden, Next.js tabanlı güçlü bir altyapıya başarıyla taşınmıştır.

## 🌟 Öne Çıkan Özellikler

- **Modern ve Şık Tasarım (Glassmorphism):** Kullanıcıyı yormayan, premium hissettiren bulanık cam efektleri ve akıcı geçiş animasyonları.
- **Karanlık Mod (Dark Mode) Desteği 🌙:** Kullanıcı tercihine göre tek tıkla değişebilen ve akılda tutulan (localStorage) karanlık/aydınlık tema özelliği.
- **Dinamik Müşteri Yorumları:** Müşterilerin site üzerinden yıldızlı yorum bırakabileceği ve bu yorumların SQLite veritabanında güvenle saklandığı akıcı slider yapısı.
- **Online Arıza Kaydı:** Ziyaretçilerin cihaz arızaları için form doldurarak teknik servise kayıt bırakabileceği entegre sistem.
- **Mesafe ve Süre Hesaplayıcı (OSRM API):** Müşterinin konumunu alarak dükkana olan uzaklığını ve tahmini servis varış süresini anlık hesaplayan akıllı araç.
- **Özel Yönetici (Admin) Paneli 🛡️:** Sadece yetkili kişinin girip gelen arıza formlarını okuyabileceği ve yeni müşteri yorumlarını onaylayıp/silebileceği gizli yönetim ekranı.
- **Foto Galeri (Öncesi/Sonrası):** Onarım süreçlerini (örneğin kırık panel tamiri) interaktif bir kaydırıcı ile ziyaretçiye sunan özel galeri bölümü.

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** Next.js (App Router), React, Vanilla CSS
- **Backend:** Next.js API Routes (Node.js)
- **Veritabanı:** SQLite
- **ORM:** Prisma
- **Güvenlik:** bcryptjs (Admin paneli şifrelemesi)

## 🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları izleyin:

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/Y-MuammerCelik/serdar-elektronik-web.git
   ```

2. Proje dizinine girin:
   ```bash
   cd serdar-elektronik-web
   ```

3. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

4. Veritabanını oluşturun ve başlangıç verilerini yükleyin (Seed):
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

5. Geliştirici sunucusunu başlatın:
   ```bash
   npm run dev
   ```

6. Tarayıcınızdan [http://localhost:3000](http://localhost:3000) adresine giderek siteyi görüntüleyin.
   *Yönetici paneli için [http://localhost:3000/admin](http://localhost:3000/admin) adresine gidebilirsiniz (Kullanıcı Adı: admin, Şifre: serdar2026)*

## 👨‍💻 Geliştirici
Bu proje **Muammer Çelik** tarafından geliştirilmiştir.
