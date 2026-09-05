import React, { useState, useRef } from 'react';
import { X, Sparkles, Trophy, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playChimeSound } from '../utils/audioHelper';
import { saveStoredReward } from '../utils/storageHelper';

const REWARDS = [
  { label: '10% OFF', code: 'SPOTLIGHT10', desc: '10% Off on your complete order', type: 'percent', value: 10, color: '#f59e0b' },
  { label: 'FREE DIP', code: 'FREEDIP', desc: 'Complimentary Peri-Peri or Tandoori Dip', type: 'flat', value: 30, color: '#e11d48' },
  { label: '₹50 OFF', code: 'PALGHAR50', desc: 'Flat ₹50 Off on orders above ₹299', type: 'flat', value: 50, color: '#8b5cf6' },
  { label: 'FREE DELIVERY', code: 'FREEDEL', desc: 'Zero delivery fee across Palghar', type: 'flat', value: 30, color: '#10b981' },
  { label: '15% OFF', code: 'SPOTLIGHT15', desc: '15% VIP Spotlight Discount', type: 'percent', value: 15, color: '#ec4899' },
  { label: '₹30 BONUS', code: 'MOMOBONUS', desc: '₹30 Cashback on Momo Platters', type: 'flat', value: 30, color: '#3b82f6' },
];

export function SpinWheelModal({ isOpen, onClose, onRewardClaimed }) {
  if (!isOpen) return null;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonReward(null);
    playChimeSound();

    // Random slice selection
    const prizeIndex = Math.floor(Math.random() * REWARDS.length);
    const sliceAngle = 360 / REWARDS.length;
    // Calculate final rotation (min 5 full rounds + target angle)
    const extraRotations = 360 * 6;
    const targetAngle = extraRotations + (360 - (prizeIndex * sliceAngle) - sliceAngle / 2);

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const selected = REWARDS[prizeIndex];
      setWonReward(selected);
      saveStoredReward(selected);

      playSuccessSound();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 }
      });
    }, 4000);
  };

  const handleClaim = () => {
    if (wonReward) {
      onRewardClaimed(wonReward);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            background: 'rgba(225, 29, 72, 0.15)',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            borderRadius: 'var(--radius-full)',
            color: '#fda4af',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}
        >
          <Sparkles size={14} color="#f43f5e" />
          <span>LUCKY FLAVOR WHEEL</span>
        </div>

        <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          Spin & Unlock <span className="text-gradient-gold">Secret Perks!</span>
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '1.75rem' }}>
          Spin the wheel to win instant discounts, free dips, or delivery vouchers for your order at Break a Leg Cafe.
        </p>

        {/* Wheel Container */}
        <div
          style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            margin: '0 auto 1.75rem auto'
          }}
        >
          {/* Top Pointer Needle */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '24px solid #ffffff',
              zIndex: 10,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))'
            }}
          />

          {/* Rotating Wheel Disk */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid var(--border-gold)',
              boxShadow: '0 0 35px rgba(245, 158, 11, 0.35)',
              position: 'relative',
              overflow: 'hidden',
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              background: '#15110e'
            }}
          >
            {REWARDS.map((reward, i) => {
              const angle = (360 / REWARDS.length) * i;
              return (
                <div
                  key={reward.code}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    width: '50%',
                    height: '50%',
                    transformOrigin: '0% 100%',
                    transform: `rotate(${angle}deg) skewY(-30deg)`,
                    background: i % 2 === 0 ? 'rgba(245, 158, 11, 0.85)' : 'rgba(225, 29, 72, 0.85)',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      transform: 'skewY(30deg) rotate(45deg)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      marginTop: '25px',
                      marginLeft: '20px'
                    }}
                  >
                    {reward.label}
                  </span>
                </div>
              );
            })}

            {/* Center Hub */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#15110e',
                border: '3px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
                color: 'var(--accent-gold)',
                fontWeight: 900,
                fontSize: '1.2rem',
                zIndex: 5
              }}
            >
              🎭
            </div>
          </div>
        </div>

        {/* Spin CTA Button */}
        {!wonReward ? (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1.05rem',
              opacity: isSpinning ? 0.7 : 1,
              cursor: isSpinning ? 'not-allowed' : 'pointer'
            }}
          >
            <Sparkles size={18} />
            <span>{isSpinning ? 'Spinning The Spotlight...' : 'SPIN THE WHEEL NOW'}</span>
          </button>
        ) : (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              animation: 'modal-slide-up 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.4rem' }}>
              <Trophy size={20} />
              <strong style={{ fontSize: '1.1rem' }}>JACKPOT UNLOCKED!</strong>
            </div>

            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#faf5ed', marginBottom: '0.25rem' }}>
              Coupon: <span style={{ color: 'var(--accent-gold)' }}>{wonReward.code}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
              {wonReward.desc}
            </p>

            <button
              onClick={handleClaim}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Check size={18} />
              <span>Claim & Apply to Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
