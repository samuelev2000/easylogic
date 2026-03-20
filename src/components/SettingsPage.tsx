import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockCouriers } from '../data/mockData';

interface Props {
  onNavigate: (page: string) => void;
}

export const SettingsPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'generale' | 'integrazioni' | 'corrieri' | 'template' | 'notifiche'>(
    'generale'
  );
  const [expandedCourier, setExpandedCourier] = useState<number | null>(null);

  const [notificationSettings, setNotificationSettings] = useState({
    syncErrors: true,
    lowStock: false,
    trackingAnomaly: true,
    newOrders: true,
    codPending: false,
  });

  const NotificationSwitch: React.FC<{ checked: boolean; onChange: (val: boolean) => void }> = ({
    checked,
    onChange,
  }) => (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '48px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: checked ? COLORS.accent : '#D1D5DB',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          top: '2px',
          left: checked ? '26px' : '2px',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  );

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: LAYOUT.spacing.lg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
          Impostazioni
        </h1>

        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            gap: LAYOUT.spacing.md,
            marginBottom: LAYOUT.spacing.lg,
            borderBottom: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.cardBg,
            borderRadius: `${LAYOUT.radius.md} ${LAYOUT.radius.md} 0 0`,
            overflowX: 'auto',
          }}
        >
          {(['generale', 'integrazioni', 'corrieri', 'template', 'notifiche'] as const).map((tab) => (
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
                whiteSpace: 'nowrap',
              }}
            >
              {tab === 'generale' && 'Generale'}
              {tab === 'integrazioni' && 'Integrazioni'}
              {tab === 'corrieri' && 'Corrieri'}
              {tab === 'template' && 'Template Etichette'}
              {tab === 'notifiche' && 'Notifiche'}
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
          {/* Generale Tab */}
          {activeTab === 'generale' && (
            <div style={{ maxWidth: '600px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
                Informazioni Azienda
              </h3>

              <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                  Nome Azienda
                </label>
                <input
                  type="text"
                  defaultValue="EasyLogic Italia"
                  style={{
                    width: '100%',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: LAYOUT.radius.sm,
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="info@easylogic.it"
                  style={{
                    width: '100%',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: LAYOUT.radius.sm,
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                  Telefono
                </label>
                <input
                  type="tel"
                  defaultValue="+39 02 1234 5678"
                  style={{
                    width: '100%',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: LAYOUT.radius.sm,
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                  Indirizzo
                </label>
                <input
                  type="text"
                  defaultValue="Via Roma 123, Milano, MI 20121"
                  style={{
                    width: '100%',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: LAYOUT.radius.sm,
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: LAYOUT.spacing.md,
                  marginBottom: LAYOUT.spacing.lg,
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                    Fuso Orario
                  </label>
                  <select
                    defaultValue="Europe/Rome"
                    style={{
                      width: '100%',
                      padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.sm,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <option>Europe/Rome</option>
                    <option>Europe/Paris</option>
                    <option>Europe/London</option>
                    <option>Europe/Berlin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                    Lingua
                  </label>
                  <select
                    defaultValue="it"
                    style={{
                      width: '100%',
                      padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.sm,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                  Valuta
                </label>
                <select
                  defaultValue="EUR"
                  style={{
                    width: '100%',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: LAYOUT.radius.sm,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <option value="EUR">Euro (EUR)</option>
                  <option value="USD">Dollaro USA (USD)</option>
                  <option value="GBP">Sterlina (GBP)</option>
                </select>
              </div>

              <button
                onClick={() => onNavigate('save-general')}
                style={{
                  backgroundColor: COLORS.accent,
                  color: 'white',
                  border: 'none',
                  padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.lg}`,
                  borderRadius: LAYOUT.radius.sm,
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                Salva Impostazioni
              </button>
            </div>
          )}

          {/* Integrazioni Tab */}
          {activeTab === 'integrazioni' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
                Integrazioni
              </h3>

              {/* Shopify API */}
              <div
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: LAYOUT.radius.md,
                  padding: LAYOUT.spacing.lg,
                  marginBottom: LAYOUT.spacing.lg,
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                  Shopify API
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: LAYOUT.spacing.md,
                    marginBottom: LAYOUT.spacing.md,
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                      Versione API
                    </label>
                    <select
                      defaultValue="2024-01"
                      style={{
                        width: '100%',
                        padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: LAYOUT.radius.sm,
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      <option>2024-01</option>
                      <option>2023-10</option>
                      <option>2023-07</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                      Webhook URL
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="https://api.easylogic.it/webhooks/shopify"
                      style={{
                        width: '100%',
                        padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: LAYOUT.radius.sm,
                        fontSize: '13px',
                        boxSizing: 'border-box',
                        backgroundColor: '#F9FAFB',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: LAYOUT.spacing.md }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                    Intervallo Sync (ore)
                  </label>
                  <input
                    type="number"
                    defaultValue="24"
                    style={{
                      width: '100%',
                      padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.sm,
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  style={{
                    backgroundColor: COLORS.accent,
                    color: 'white',
                    border: 'none',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    borderRadius: LAYOUT.radius.sm,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Salva Configurazione
                </button>
              </div>

              {/* Courier Integrations */}
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                Integrazioni Corrieri
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: LAYOUT.spacing.md,
                }}
              >
                {['BRT', 'GLS', 'DHL'].map((courier) => (
                  <div
                    key={courier}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.md,
                      padding: LAYOUT.spacing.md,
                    }}
                  >
                    <h5 style={{ fontSize: '13px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 12px 0' }}>
                      {courier}
                    </h5>

                    <div style={{ marginBottom: LAYOUT.spacing.md }}>
                      <p style={{ fontSize: '11px', color: COLORS.textMuted, fontWeight: '600', margin: '0 0 6px 0' }}>
                        STATO CONNESSIONE
                      </p>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#D1FAE5',
                          color: '#047857',
                          padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        Connesso
                      </span>
                    </div>

                    <div style={{ marginBottom: LAYOUT.spacing.md }}>
                      <p style={{ fontSize: '11px', color: COLORS.textMuted, fontWeight: '600', margin: '0 0 6px 0' }}>
                        CREDENZIALI
                      </p>
                      <code
                        style={{
                          backgroundColor: '#F3F4F6',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        ****{'key123'}
                      </code>
                    </div>

                    <button
                      style={{
                        width: '100%',
                        backgroundColor: COLORS.accent,
                        color: 'white',
                        border: 'none',
                        padding: `${LAYOUT.spacing.sm}`,
                        borderRadius: LAYOUT.radius.sm,
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      Testa Connessione
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Corrieri Tab */}
          {activeTab === 'corrieri' && (
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
                      Nome
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Codice
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      API Endpoint
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Stato
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Servizi
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Contratti
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockCouriers.map((courier) => (
                    <React.Fragment key={courier.id}>
                      <tr
                        style={{
                          borderBottom: `1px solid ${COLORS.border}`,
                          backgroundColor: expandedCourier === courier.id ? '#FAFAFA' : 'transparent',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          setExpandedCourier(expandedCourier === courier.id ? null : courier.id)
                        }
                      >
                        <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text, fontWeight: '600' }}>
                          {expandedCourier === courier.id ? '▼' : '▶'} {courier.name}
                        </td>
                        <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                          {courier.code}
                        </td>
                        <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted, fontSize: '12px' }}>
                          {courier.apiEndpoint}
                        </td>
                        <td style={{ padding: LAYOUT.spacing.md }}>
                          <span
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#D1FAE5',
                              color: '#047857',
                              padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '600',
                            }}
                          >
                            {courier.status === 'active' ? 'Attivo' : 'Inattivo'}
                          </span>
                        </td>
                        <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text }}>
                          {courier.services.length}
                        </td>
                        <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text }}>
                          2
                        </td>
                      </tr>

                      {/* Expanded Details */}
                      {expandedCourier === courier.id && (
                        <tr style={{ backgroundColor: '#FAFAFA', borderBottom: `1px solid ${COLORS.border}` }}>
                          <td colSpan={6} style={{ padding: LAYOUT.spacing.lg }}>
                            <div style={{ marginBottom: LAYOUT.spacing.md }}>
                              <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, margin: '0 0 8px 0' }}>
                                Servizi Disponibili:
                              </p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: LAYOUT.spacing.sm }}>
                                {courier.services.map((service) => (
                                  <span
                                    key={service}
                                    style={{
                                      backgroundColor: '#E0E7FF',
                                      color: '#4338CA',
                                      padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                                      borderRadius: '4px',
                                      fontSize: '11px',
                                      fontWeight: '600',
                                    }}
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, margin: '0 0 8px 0' }}>
                                Contratti Associati:
                              </p>
                              <p style={{ fontSize: '12px', color: COLORS.textMuted, margin: 0 }}>
                                CT-{courier.code}-001, CT-{courier.code}-002
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Template Tab */}
          {activeTab === 'template' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
                Template Etichette
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LAYOUT.spacing.lg }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                    Formato Etichetta
                  </h4>

                  <div style={{ marginBottom: LAYOUT.spacing.md }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: LAYOUT.spacing.md, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="label-format"
                        value="a4"
                        defaultChecked
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>A4 (210 × 297 mm)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: LAYOUT.spacing.md, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="label-format"
                        value="10x15"
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>10 × 15 cm</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="label-format"
                        value="thermal"
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>Termica (100 × 150 mm)</span>
                    </label>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                    Impostazioni Stampa
                  </h4>

                  <div style={{ marginBottom: LAYOUT.spacing.md }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: LAYOUT.spacing.md, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        defaultChecked
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>Stampa codice QR</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: LAYOUT.spacing.md, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        defaultChecked
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>Stampa numero tracciamento</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: LAYOUT.spacing.sm }}
                      />
                      <span style={{ fontSize: '13px', color: COLORS.text }}>Stampa data di consegna prevista</span>
                    </label>
                  </div>

                  <button
                    style={{
                      backgroundColor: COLORS.accent,
                      color: 'white',
                      border: 'none',
                      padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.lg}`,
                      borderRadius: LAYOUT.radius.sm,
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    Salva Template
                  </button>
                </div>

                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                    Anteprima Etichetta
                  </h4>
                  <div
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.md,
                      padding: LAYOUT.spacing.lg,
                      backgroundColor: 'white',
                      aspectRatio: '10 / 15',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 8px 0' }}>
                      EASYLOGIC S.P.A.
                    </p>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        margin: '8px 0',
                      }}
                    >
                      QR
                    </div>
                    <p style={{ fontSize: '9px', fontWeight: '600', color: COLORS.text, margin: '8px 0' }}>
                      1Z999AA10123456784
                    </p>
                    <p style={{ fontSize: '8px', color: COLORS.textMuted, margin: 0 }}>
                      Entrega prevista: 24/03/2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifiche Tab */}
          {activeTab === 'notifiche' && (
            <div style={{ maxWidth: '600px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
                Notifiche e Avvisi
              </h3>

              <div
                style={{
                  display: 'grid',
                  gap: LAYOUT.spacing.lg,
                }}
              >
                {[
                  {
                    key: 'syncErrors',
                    label: 'Errori Sync',
                    description: 'Ricevi notifiche quando si verificano errori durante la sincronizzazione',
                  },
                  {
                    key: 'lowStock',
                    label: 'Stock Basso',
                    description: 'Ricevi avvisi quando lo stock di un prodotto scende sotto il livello minimo',
                  },
                  {
                    key: 'trackingAnomaly',
                    label: 'Tracking Anomalia',
                    description: 'Ricevi notifiche per anomalie nel tracking dei pacchi',
                  },
                  {
                    key: 'newOrders',
                    label: 'Nuovi Ordini',
                    description: 'Ricevi notifiche per ogni nuovo ordine ricevuto',
                  },
                  {
                    key: 'codPending',
                    label: 'COD in Attesa',
                    description: 'Ricevi notifiche per ordini COD in attesa di conferma',
                  },
                ].map((notif) => (
                  <div
                    key={notif.key}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.md,
                      padding: LAYOUT.spacing.md,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 4px 0' }}>
                        {notif.label}
                      </h4>
                      <p style={{ fontSize: '12px', color: COLORS.textMuted, margin: 0 }}>
                        {notif.description}
                      </p>
                    </div>
                    <NotificationSwitch
                      checked={notificationSettings[notif.key as keyof typeof notificationSettings]}
                      onChange={(val) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [notif.key]: val,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: LAYOUT.spacing.xl,
                  borderTop: `1px solid ${COLORS.border}`,
                  paddingTop: LAYOUT.spacing.lg,
                }}
              >
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 16px 0' }}>
                  Impostazioni Email Notifiche
                </h4>

                <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                    Email per Notifiche
                  </label>
                  <input
                    type="email"
                    defaultValue="notifications@easylogic.it"
                    style={{
                      width: '100%',
                      padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.sm,
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', marginBottom: LAYOUT.spacing.lg, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ marginRight: LAYOUT.spacing.sm }}
                  />
                  <span style={{ fontSize: '13px', color: COLORS.text }}>
                    Invia anche notifiche push via browser
                  </span>
                </label>

                <button
                  style={{
                    backgroundColor: COLORS.accent,
                    color: 'white',
                    border: 'none',
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.lg}`,
                    borderRadius: LAYOUT.radius.sm,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Salva Preferenze Notifiche
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
