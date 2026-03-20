import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        padding: `${LAYOUT.spacing.lg}px`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          borderRadius: `${LAYOUT.borderRadius}px`,
          padding: `${LAYOUT.spacing.xl}px`,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Logo and Title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: `${LAYOUT.spacing.xl}px`,
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: `${LAYOUT.spacing.sm}px`,
            }}
          >
            ▣
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: `${LAYOUT.spacing.xs}px`,
            }}
          >
            EasyLogic
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: COLORS.textLight,
              marginBottom: `${LAYOUT.spacing.lg}px`,
            }}
          >
            Piattaforma Logistica Integrata
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div
            style={{
              marginBottom: `${LAYOUT.spacing.lg}px`,
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: `${LAYOUT.spacing.sm}px`,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@easylogic.it"
              required
              style={{
                width: '100%',
                padding: `${LAYOUT.spacing.md}px`,
                fontSize: '14px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: `${LAYOUT.borderRadius}px`,
                backgroundColor: 'white',
                color: COLORS.text,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(16, 185, 129, 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div
            style={{
              marginBottom: `${LAYOUT.spacing.lg}px`,
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: `${LAYOUT.spacing.sm}px`,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: `${LAYOUT.spacing.md}px`,
                fontSize: '14px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: `${LAYOUT.borderRadius}px`,
                backgroundColor: 'white',
                color: COLORS.text,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(16, 185, 129, 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: `${LAYOUT.spacing.md}px`,
              backgroundColor: COLORS.primary,
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: `${LAYOUT.borderRadius}px`,
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s, transform 0.1s',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#059669';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        {/* Demo Hint */}
        <div
          style={{
            marginTop: `${LAYOUT.spacing.lg}px`,
            padding: `${LAYOUT.spacing.md}px`,
            backgroundColor: '#FFFBEB',
            border: `1px solid #FCD34D`,
            borderRadius: `${LAYOUT.borderRadius}px`,
            fontSize: '13px',
            color: '#92400E',
            textAlign: 'center',
          }}
        >
          Demo: usa <strong>admin@easylogic.it</strong>
        </div>
      </div>
    </div>
  );
};
