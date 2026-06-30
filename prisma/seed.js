const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
const db = new Database(dbPath);

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('serdar2026', 10);
  
  // Upsert admin user
  const existingAdmin = db.prepare('SELECT id FROM AdminUser WHERE username = ?').get('admin');
  if (!existingAdmin) {
    db.prepare('INSERT INTO AdminUser (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  // Create seed reviews
  const reviews = [
    {
      name: 'Ahmet K., Arsin',
      text: 'Televizyonumun ekranı aniden kararmıştı. Serdar Usta aynı gün gelip evden aldı, ertesi gün tamir edilmiş şekilde tertemiz teslim etti. Hızlı ve güvenilir.',
      rating: 5,
      approved: 1,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'Merve T., Yomra',
      text: 'Çanak anten montajı için çağırdık. Hem çok uygun fiyata yaptı hem de kabloları gizleyerek çok temiz çalıştı. Kesinlikle tavsiye ederim.',
      rating: 5,
      approved: 1,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'Caner B., Trabzon Merkez',
      text: 'Dükkana ses sistemi kurulumu için anlaştık. İşini gerçekten severek ve bilerek yapıyor. Garantili hizmet vermesi de ayrıca güven verici.',
      rating: 4,
      approved: 1,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const insertReview = db.prepare(
    'INSERT INTO Review (name, text, rating, approved, createdAt) VALUES (?, ?, ?, ?, ?)'
  );

  // Check if reviews exist already
  const existingCount = db.prepare('SELECT COUNT(*) as count FROM Review').get();
  if (existingCount.count === 0) {
    for (const review of reviews) {
      insertReview.run(review.name, review.text, review.rating, review.approved, review.createdAt);
    }
    console.log('Seed reviews created.');
  } else {
    console.log('Reviews already exist, skipping.');
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    db.close();
  });
