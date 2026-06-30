'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length, isPaused]);

  const timeAgo = (dateStr) => {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' yıl önce';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' ay önce';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' gün önce';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' saat önce';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' dakika önce';
    return 'Az önce';
  };

  const getStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: '', text: '', rating: 5 });
        setTimeout(() => {
          setShowModal(false);
          setMessage(null);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' });
    }
    setLoading(false);
  };

  return (
    <section className="testimonials-section">
      <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>

      {reviews.length > 0 && (
        <div 
          className="reviews-slider" 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="reviews-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {reviews.map((review) => (
              <div className="testimonial-card" key={review.id}>
                <div className="stars">{getStars(review.rating)}</div>
                <p className="testimonial-text">&quot;{review.text}&quot;</p>
                <p className="testimonial-author">- {review.name}</p>
                <span className="review-time">{timeAgo(review.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="add-review-btn-container">
        <button className="btn btn-outline" onClick={() => setShowModal(true)}>Siz de Yorum Yapın ✍️</button>
      </div>

      {/* Review Modal */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setShowModal(false); }}>
        <div className="review-form-modal service-modal">
          <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
          <h2>Yorumunuzu Bırakın</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>İsim Soyisim</label>
              <input
                type="text"
                required
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Puanınız</label>
              <div className="star-rating-input">
                {[5, 4, 3, 2, 1].map(val => (
                  <span key={val}>
                    <input
                      type="radio"
                      id={`star${val}`}
                      name="rating"
                      value={val}
                      checked={formData.rating === val}
                      onChange={() => setFormData({ ...formData, rating: val })}
                    />
                    <label htmlFor={`star${val}`}>★</label>
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Yorumunuz</label>
              <textarea
                rows="4"
                required
                placeholder="Hizmetimiz hakkında ne düşünüyorsunuz?"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Gönderiliyor...' : 'Gönder'}
            </button>
            {message && <div className={`form-message ${message.type}`}>{message.text}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
