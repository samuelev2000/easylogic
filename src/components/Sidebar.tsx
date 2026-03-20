import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string, id?: number | null) => void;
  userName: string;
  userRole: 'admin' | 'operator';
  onLogout: () => void;
}

const menuSections = [
  {
    title: 'PRINCIPALE',
    items: [
      { icon: '◫', label: 'Dashboard', page: 'dashboard' },
      { icon: '📋', label: 'Ordini', page: 'orders' },
      { icon: '💰', label: 'Contrassegni', page: 'cod' },
    ],
  },
  {
    title: 'GESTIONE',
    items: [
      { icon: '👥', label: 'Clienti', page: 'clients' },
      { icon: '🏪', label: 'Store Shopify', page: 'stores' },
      { icon: '🏷️', label: 'Etichette', page: 'labels' },
      { icon: '📦', label: 'Tracking', page: 'tracking' },
    ],
  },
  {
    title: 'MAGAZZINO',
    items: [
      { icon: '📊', label: 'Prodotti', page: 'warehouse' },
      { icon: '📱', label: 'Scanner', page: 'scanner' },
    ],
  },
  {
    title: 'SISTEMA',
    items: [
      { icon: '⚙️', label: 'Utenti', page: 'users' },
      { icon: '🔧', label: 'Impostazioni', page: 'settings' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  userName,
  userRole,
  onLogout,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: `${LAYOUT.sidebarWidth}px`,
        height: '100vh',
        backgroundColor: COLORS.sidebarBg,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: `${LAYOUT.spacing.lg}px`,
          borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
          display: 'flex',
          alignItems: 'center',
          gap: `${LAYOUT.spacing.md}px`,
          cursor: 'pointer',
        }}
        onClick={() => onNavigate('dashboard')}
      >
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
          }}
        >
          ▣
        </div>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 700,
          }}
        >
          EasyLogic
        </h1>
      </div>

      {/* Navigation Sections */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `${LAYOUT.spacing.lg}px 0`,
        }}
      >
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <div
              style={{
                padding: `${LAYOUT.spacing.md}px ${LAYOUT.spacing.lg}px`,
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = currentPage === item.page;
              const isHovered = hoveredItem === item.page;

              return (
                <div
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  onMouseEnter={() => setHoveredItem(item.page)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${LAYOUT.spacing.md}px`,
                    padding: `${LAYOUT.spacing.md}px ${LAYOUT.spacing.lg}px`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderLeft: isActive ? `3px solid ${COLORS.primary}` : '3px solid transparent',
                    backgroundColor: isActive
                      ? 'rgba(16, 185, 129, 0.1)'
                      : isHovered
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'transparent',
                    color: isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile and Logout */}
      <div
        style={{
          borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
          padding: `${LAYOUT.spacing.lg}px`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${LAYOUT.spacing.md}px`,
            marginBottom: `${LAYOUT.spacing.lg}px`,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {userName}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {userRole === 'admin' ? 'Amministratore' : 'Operatore'}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: `${LAYOUT.spacing.md}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: `${LAYOUT.borderRadius}px`,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          Esci
        </button>
      </div>
    </div>
  );
};
