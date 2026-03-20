import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockUsers, mockActivityLogs } from '../data/mockData';

interface Props {
  onNavigate: (page: string) => void;
}

const PERMISSIONS = [
  { area: 'Ordini', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Etichette', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Tracking', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Magazzino', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Clienti', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Store', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Utenti', subs: ['Visualizza', 'Modifica', 'Elimina'] },
  { area: 'Impostazioni', subs: ['Visualizza', 'Modifica', 'Elimina'] },
];

const ROLES = [
  {
    name: 'Admin',
    description: 'Accesso completo a tutte le funzioni',
    color: COLORS.purple,
    permissions: PERMISSIONS.map((p) => ({ area: p.area, visualizza: true, modifica: true, elimina: true })),
  },
  {
    name: 'Operatore',
    description: 'Accesso limitato a ordini, etichette e tracking',
    color: COLORS.blue,
    permissions: [
      { area: 'Ordini', visualizza: true, modifica: true, elimina: false },
      { area: 'Etichette', visualizza: true, modifica: true, elimina: false },
      { area: 'Tracking', visualizza: true, modifica: false, elimina: false },
      { area: 'Magazzino', visualizza: false, modifica: false, elimina: false },
      { area: 'Clienti', visualizza: false, modifica: false, elimina: false },
      { area: 'Store', visualizza: false, modifica: false, elimina: false },
      { area: 'Utenti', visualizza: false, modifica: false, elimina: false },
      { area: 'Impostazioni', visualizza: false, modifica: false, elimina: false },
    ],
  },
];

export const UsersPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'activity'>('users');

  const actionTypeColor = (action: string) => {
    if (action.includes('created') || action.includes('aggiunto')) return COLORS.success;
    if (action.includes('updated') || action.includes('modificato')) return COLORS.warning;
    if (action.includes('deleted') || action.includes('eliminato')) return COLORS.error;
    return COLORS.info;
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: LAYOUT.spacing.lg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: LAYOUT.spacing.lg,
          }}
        >
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: COLORS.text, margin: 0 }}>
            Utenti e Permessi
          </h1>
          <button
            onClick={() => onNavigate('new-user')}
            style={{
              backgroundColor: COLORS.accent,
              color: 'white',
              border: 'none',
              padding: `${LAYOUT.spacing.md} ${LAYOUT.spacing.lg}`,
              borderRadius: LAYOUT.radius.md,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Nuovo Utente
          </button>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            gap: LAYOUT.spacing.md,
            marginBottom: LAYOUT.spacing.lg,
            borderBottom: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.cardBg,
            borderRadius: `${LAYOUT.radius.md} ${LAYOUT.radius.md} 0 0`,
          }}
        >
          {(['users', 'roles', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: `${LAYOUT.spacing.md} ${LAYOUT.spacing.lg}`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: activeTab === tab ? COLORS.accent : COLORS.textMuted,
                borderBottom: activeTab === tab ? `3px solid ${COLORS.accent}` : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'users' && 'Utenti'}
              {tab === 'roles' && 'Ruoli'}
              {tab === 'activity' && 'Log Attività'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            backgroundColor: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderTop: 'none',
            borderRadius: `0 0 ${LAYOUT.radius.md} ${LAYOUT.radius.md}`,
            padding: LAYOUT.spacing.lg,
          }}
        >
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Avatar
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Nome
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Email
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Ruolo
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Stato
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Ultimo Accesso
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: `1px solid ${COLORS.border}`,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <td style={{ padding: LAYOUT.spacing.md }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: COLORS.text,
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text, fontWeight: '600' }}>
                        {user.name}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {user.email}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: user.role === 'admin' ? '#EDE9FE' : '#DBEAFE',
                            color: user.role === 'admin' ? '#7C3AED' : '#0284C7',
                            padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}
                        >
                          {user.role === 'admin' ? 'Admin' : 'Operatore'}
                        </span>
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: user.status === 'active' ? '#D1FAE5' : '#F3F4F6',
                            color: user.status === 'active' ? '#047857' : '#6B7280',
                            padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}
                        >
                          {user.status === 'active' ? 'Attivo' : 'Inattivo'}
                        </span>
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {new Date(user.lastLogin).toLocaleDateString('it-IT')}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md }}>
                        <div style={{ display: 'flex', gap: LAYOUT.spacing.sm }}>
                          <button
                            onClick={() => onNavigate(`edit-user-${user.id}`)}
                            style={{
                              backgroundColor: 'transparent',
                              color: COLORS.accent,
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              textDecoration: 'underline',
                            }}
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => onNavigate(`delete-user-${user.id}`)}
                            style={{
                              backgroundColor: 'transparent',
                              color: COLORS.error,
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              textDecoration: 'underline',
                            }}
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: LAYOUT.spacing.lg,
                }}
              >
                {ROLES.map((role) => (
                  <div
                    key={role.name}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.md,
                      padding: LAYOUT.spacing.lg,
                    }}
                  >
                    <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 4px 0' }}>
                        {role.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: COLORS.textMuted, margin: 0 }}>
                        {role.description}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.md, textTransform: 'uppercase' }}>
                        Permessi
                      </p>

                      <div style={{ display: 'grid', gap: LAYOUT.spacing.md }}>
                        {role.permissions.map((perm, idx) => (
                          <div
                            key={idx}
                            style={{
                              borderBottom: idx < role.permissions.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                              paddingBottom: LAYOUT.spacing.md,
                            }}
                          >
                            <h4 style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, margin: '0 0 8px 0' }}>
                              {perm.area}
                            </h4>
                            <div style={{ display: 'flex', gap: LAYOUT.spacing.md }}>
                              {['visualizza', 'modifica', 'elimina'].map((perm_type) => (
                                <label
                                  key={perm_type}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={perm[perm_type as keyof typeof perm] as boolean}
                                    readOnly
                                    style={{ cursor: 'pointer', marginRight: '6px' }}
                                  />
                                  <span style={{ color: COLORS.textMuted, textTransform: 'capitalize' }}>
                                    {perm_type}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: LAYOUT.spacing.md,
                }}
              >
                {mockActivityLogs.slice(0, 10).map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: LAYOUT.spacing.md,
                      paddingBottom: LAYOUT.spacing.md,
                      borderBottom: idx < 9 ? `1px solid ${COLORS.border}` : 'none',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: COLORS.text,
                      }}
                    >
                      {log.userName.charAt(0)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: LAYOUT.spacing.md,
                        }}
                      >
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text, margin: '0 0 4px 0' }}>
                            {log.userName}
                          </p>
                          <p style={{ fontSize: '12px', color: COLORS.textMuted, margin: 0 }}>
                            {log.action}{' '}
                            {log.target && (
                              <span style={{ fontWeight: '600', color: actionTypeColor(log.action) }}>
                                {log.target}
                              </span>
                            )}
                          </p>
                        </div>
                        <div
                          style={{
                            flexShrink: 0,
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: actionTypeColor(log.action),
                            marginTop: '4px',
                          }}
                        />
                      </div>
                      <p style={{ fontSize: '11px', color: COLORS.textMuted, margin: '8px 0 0 0' }}>
                        {new Date(log.timestamp).toLocaleDateString('it-IT', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
