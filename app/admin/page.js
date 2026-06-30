'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Sunucu hatası oluştu');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Yönetici Paneli</h1>
        <p>Lütfen devam etmek için giriş yapın</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Kullanıcı Adı</label>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="admin"
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Şifre</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          
          {error && <div className="form-message error" style={{ marginBottom: '15px' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <a href="/" style={{ color: '#aaa', fontSize: '0.9rem', textDecoration: 'underline' }}>&larr; Siteye Dön</a>
        </div>
      </div>
    </div>
  );
}
