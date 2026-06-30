'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchStats = async () => {
    const res = await fetch('/api/admin/stats');
    if (res.ok) setStats(await res.json());
    else if (res.status === 401) router.push('/admin');
  };

  const fetchReviews = async () => {
    const res = await fetch('/api/admin/reviews');
    if (res.ok) setReviews(await res.json());
  };

  const fetchContacts = async () => {
    const res = await fetch('/api/admin/contacts');
    if (res.ok) setContacts(await res.json());
  };

  useEffect(() => {
    fetchStats();
    fetchReviews();
    fetchContacts();
    setLoading(false);
  }, []);

  const handleReviewAction = async (id, action) => {
    if (action === 'approve') {
      await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true })
      });
    } else if (action === 'delete') {
      if (!confirm('Emin misiniz?')) return;
      await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    }
    fetchReviews();
    fetchStats();
  };

  const handleContactAction = async (id, status) => {
    if (status === 'delete') {
      if (!confirm('Emin misiniz?')) return;
      await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
    } else {
      await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    }
    fetchContacts();
    fetchStats();
  };

  const logout = () => {
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin');
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Yükleniyor...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>SERDAR <span>ADMIN</span></h2>
        <p className="admin-sidebar-subtitle">Yönetim Paneli v1.0</p>
        
        <ul className="admin-nav">
          <li>
            <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
              💬 Yorum Yönetimi {stats?.pendingReviews > 0 && <span className="badge badge-warning">{stats.pendingReviews}</span>}
            </button>
          </li>
          <li>
            <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>
              📋 Arıza Kayıtları {stats?.newContacts > 0 && <span className="badge badge-warning">{stats.newContacts}</span>}
            </button>
          </li>
          <li style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              🌍 Siteyi Görüntüle
            </Link>
          </li>
          <li>
            <button onClick={logout} style={{ color: 'var(--accent-color)' }}>
              🚪 Çıkış Yap
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab === 'reviews' ? 'Müşteri Yorumları' : 'Arıza Kayıtları'}</h1>
        </header>

        {/* Stats */}
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-icon">🌟</div>
            <div className="stat-number">{stats?.totalReviews || 0}</div>
            <div className="stat-label">Toplam Yorum</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-number" style={{ color: '#f59e0b' }}>{stats?.pendingReviews || 0}</div>
            <div className="stat-label">Onay Bekleyen Yorum</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛠️</div>
            <div className="stat-number">{stats?.totalContacts || 0}</div>
            <div className="stat-label">Toplam Arıza Kaydı</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-number" style={{ color: '#10b981' }}>{stats?.newContacts || 0}</div>
            <div className="stat-label">Yeni Arıza Kaydı</div>
          </div>
        </div>

        {/* Content Table */}
        <div className="admin-table-container">
          {activeTab === 'reviews' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Müşteri</th>
                  <th>Puan</th>
                  <th>Yorum</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</td>
                    <td style={{ maxWidth: '300px' }}>{r.text}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td>
                      {r.approved 
                        ? <span className="badge badge-success">Yayında</span>
                        : <span className="badge badge-warning">Onay Bekliyor</span>
                      }
                    </td>
                    <td className="actions">
                      {!r.approved && (
                        <button className="btn btn-sm btn-success" onClick={() => handleReviewAction(r.id, 'approve')}>Onayla</button>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => handleReviewAction(r.id, 'delete')}>Sil</button>
                    </td>
                  </tr>
                ))}
                {reviews.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>Kayıt bulunamadı.</td></tr>}
              </tbody>
            </table>
          )}

          {activeTab === 'contacts' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Müşteri & İletişim</th>
                  <th>Cihaz / Sorun</th>
                  <th>Adres</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.name}</strong><br/>
                      <a href={`tel:${c.phone}`} style={{ color: 'var(--secondary-color)' }}>{c.phone}</a>
                    </td>
                    <td style={{ maxWidth: '250px' }}>
                      <span className="badge badge-info">{c.deviceType}</span><br/>
                      <span style={{ fontSize: '0.85rem' }}>{c.problem}</span>
                    </td>
                    <td style={{ maxWidth: '200px' }}>{c.address || '-'}</td>
                    <td>{new Date(c.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td>
                      {c.status === 'new' && <span className="badge badge-warning">Yeni</span>}
                      {c.status === 'read' && <span className="badge badge-info">İncelendi</span>}
                      {c.status === 'resolved' && <span className="badge badge-success">Çözüldü</span>}
                    </td>
                    <td className="actions">
                      <select 
                        value={c.status} 
                        onChange={(e) => handleContactAction(c.id, e.target.value)}
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                      >
                        <option value="new">Yeni</option>
                        <option value="read">İncelendi</option>
                        <option value="resolved">Çözüldü</option>
                      </select>
                      <button className="btn btn-sm btn-danger" onClick={() => handleContactAction(c.id, 'delete')}>Sil</button>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>Kayıt bulunamadı.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
