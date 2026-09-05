import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle, 
  Sparkles, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { REVIEWS_DATA, RATING_SUMMARY } from '../data/reviewsData';
import { CAFE_INFO } from '../data/menuData';

export function ReviewsSection() {
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [likedMap, setLikedMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [dishRecommended, setDishRecommended] = useState('');
  const [comment, setComment] = useState('');

  const handleLike = (id) => {
    if (likedMap[id]) return;
    setLikedMap({ ...likedMap, [id]: true });
    setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev = {
      id: Date.now(),
      author,
      tag: 'Verified Palghar Foodie',
      rating,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      dishRecommended: dishRecommended || 'Afghani Malai Momos',
      comment,
      likes: 1
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setAuthor('');
    setComment('');
    setDishRecommended('');
  };

  return (
    <section id="reviews" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Star size={15} fill="#f59e0b" />
            <span>REAL GOOGLE & JUSTDIAL REVIEWS</span>
          </div>
          <h2 className="section-title">
            Loved by Palghar's <span className="text-gradient-gold">Food Lovers</span>
          </h2>
          <p className="section-desc">
            With over 1,200+ five-star ratings, see what our regular diners and momo enthusiasts have to say about Break a Leg Cafe.
          </p>
        </div>

        {/* Rating Summary Scorecard Banner */}
        <div
          className="glass-panel rating-summary-grid"
          style={{
            padding: '2rem',
            borderRadius: '24px',
            marginBottom: '3rem',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Left big rating display */}
          <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-subtle)', paddingRight: '1.5rem' }}>
            <div style={{ fontSize: '3.8rem', fontWeight: 900, color: 'var(--accent-gold)', lineHeight: 1 }}>
              {RATING_SUMMARY.overall}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', margin: '0.5rem 0' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={22} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#faf5ed' }}>
              Based on {RATING_SUMMARY.totalReviews} Verified Reviews
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Shop No. 8, Sai Ashish Apts, Mahim Rd, Palghar
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={15} />
                <span>Write a Review</span>
              </button>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <ExternalLink size={14} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right breakdown bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {RATING_SUMMARY.categories.map((cat) => (
              <div key={cat.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{cat.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{cat.score}</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '96%',
                      background: 'var(--gradient-gold)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#faf5ed' }}>
                      {rev.author}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {rev.tag} &bull; {rev.date}
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                {/* Recommended Dish Badge */}
                {rev.dishRecommended && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      fontSize: '0.74rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                      marginBottom: '0.85rem'
                    }}
                  >
                    <span>Recommended:</span>
                    <strong>{rev.dishRecommended}</strong>
                  </div>
                )}

                {/* Comment Text */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Helpful Button */}
              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <button
                  onClick={() => handleLike(rev.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: likedMap[rev.id] ? 'var(--accent-gold)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <ThumbsUp size={14} />
                  <span>Helpful ({rev.likes})</span>
                </button>

                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Google Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Share Your Cafe Experience
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Tell fellow Palghar foodies about your favorite momos or burger at Break a Leg!
              </p>

              <form onSubmit={handleAddReview}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Varma"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (Stars)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        <Star size={28} fill={s <= rating ? '#f59e0b' : 'none'} color="#f59e0b" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Favorite Dish You Ordered</label>
                  <input
                    type="text"
                    placeholder="e.g. Afghani Momos & KitKat Monster Shake"
                    value={dishRecommended}
                    onChange={(e) => setDishRecommended(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Feedback / Review *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your honest review about food quality, taste, and vibe..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Post Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .rating-summary-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
