import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';

interface TopBarProps {
  title: string;
  subtitle?: string;
  notificationCount?: number;
  userName?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  notificationCount = 0,
  userName = 'User',
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div
      style={{
        position: 'fixed',
        left: `${LAYOUT.sidebarWidth}px`,
        top: 0,
        right: 0,
        height: `${LAYOUT.topBarHeight}px`,
        backgroundColor: 'white',
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${LAYOUT.spacing.xl}px`,
        zIndex: 999,
      }}
    >
      {/* Left Section: Title and Breadcrumb */}
      <div>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: '12px',
              color: COLORS.textLight,
              margin: `${LAYOUT.spacing.xs}px 0 0 0`,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section: Search, Notifications, User Avatar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${LAYOUT.spacing.lg}px`,
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ricerca..."
            style={{
              width: '200px',
              padding: `${LAYOUT.spacing.md}px ${LAYOUT.spacing.lg}px`,
              paddingLeft: `${LAYOUT.spacing.xl}px`,
              fontSize: '13px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: `${LAYOUT.borderRadius}px`,
              backgroundColor: COLORS.borderLight,
              color: COLORS.text,
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = COLORS.primary;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(16, 185, 129, 0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.borderLight;
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: `${LAYOUT.spacing.md}px`,
              fontSize: '16px',
              color: COLORS.textLight,
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
        </div>

        {/* Notification Bell */}
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🔔
          {notificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '20px',
                height: '20px',
                backgroundColor: COLORS.error,
                color: 'white',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
              }}
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </div>

        {/* User Avatar */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = `0 4px 12px rgba(16, 185, 129, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};
