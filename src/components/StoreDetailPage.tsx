import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockShopifyStores, mockShippingRules, mockOrders, mockProducts } from '../data/mockData';

interface Props {
  storeId: number;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const StoreDetailPage: React.FC<Props> = ({ storeId, onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'orders' | 'products' | 'settings'>('rules');

  const store = mockShopifyStores.find((s) => s.id === storeId);
  const storeRules = mockShippingRules.filter((r) => r.storeId === storeId);
  const storeOrders = mockOrders.filter((o) => o.storeId === storeId);
  const storeProducts = mockProducts.filter((p) => p.storeId === storeId);

  if (!store) {
    return (
      <div style={{ padding: LAYOUT.spacing.lg, color: COLORS.text }}>
        Store not found
      </div>
    );
  }

  const syncStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return COLORS.success;
      case 'syncing':
        return COLORS.warning;
      case 'error':
        return COLORS.error;
      default:
        return COLORS.textMuted;
    }
  };

  const syncStatusLabel = (status: string) => {
    switch (status) {
      case 'synced':
        return 'Sincronizzato';
      case 'syncing':
        return 'In Sync';
      case 'error':
        return 'Errore';
      default:
        return status;
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', padding: LAYOUT.spacing.lg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.accent,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: LAYOUT.spacing.lg,
            display: 'flex',
            alignItems: 'center',
            gap: LAYOUT.spacing.sm,
          }}
        >
          ← Torna agli Store
        </button>

        {/* Store Header Card */}
        <div
          style={{
            backgroundColor: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.radius.md,
            padding: LAYOUT.spacing.lg,
            marginBottom: LAYOUT.spacing.lg,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: LAYOUT.spacing.xl,
            }}
          >
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 8px 0' }}>
                {store.name}
              </h2>
              <p style={{ color: COLORS.textMuted, margin: '0 0 16px 0', fontSize: '14px' }}>
                {store.domain}
              </p>
              <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: '1.8' }}>
                <div>
                  <span style={{ fontWeight: '600' }}>Client:</span> {store.clientName}
                </div>
                <div>
                  <span style={{ fontWeight: '600' }}>API Token:</span>{' '}
                  <code
                    style={{
                      backgroundColor: '#F3F4F6',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    ****{store.apiToken.slice(-4)}
                  </code>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: LAYOUT.spacing.md }}>
                <p style={{ color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>
                  STATO
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: LAYOUT.spacing.sm }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: syncStatusColor(store.syncStatus),
                    }}
                  />
                  <span style={{ fontWeight: '600', color: syncStatusColor(store.syncStatus) }}>
                    {syncStatusLabel(store.syncStatus)}
                  </span>
                </div>
              </div>
              <div>
                <p style={{ color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>
                  ULTIMO SYNC
                </p>
                <p style={{ color: COLORS.text, fontSize: '14px', fontWeight: '600', margin: 0 }}>
                  {new Date(store.lastSync).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: LAYOUT.spacing.md,
            marginBottom: LAYOUT.spacing.lg,
          }}
        >
          {[
            { label: 'Ordini Totali', value: storeOrders.length },
            {
              label: 'Ordini Oggi',
              value: storeOrders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString())
                .length,
            },
            { label: 'Prodotti Sincronizzati', value: storeProducts.length },
            { label: 'Corriere', value: store.courierName },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: LAYOUT.radius.md,
                padding: LAYOUT.spacing.md,
              }}
            >
              <p
                style={{
                  color: COLORS.textMuted,
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  margin: '0 0 8px 0',
                  letterSpacing: '0.5px',
                }}
              >
                {stat.label}
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: COLORS.accent, margin: 0 }}>
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </p>
            </div>
          ))}
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
          {(['rules', 'orders', 'products', 'settings'] as const).map((tab) => (
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
              {tab === 'rules' && 'Regole Spedizione'}
              {tab === 'orders' && 'Ordini'}
              {tab === 'products' && 'Prodotti'}
              {tab === 'settings' && 'Impostazioni'}
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
          {/* Regole Spedizione Tab */}
          {activeTab === 'rules' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: LAYOUT.spacing.lg,
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.text, margin: 0 }}>
                  Regole Spedizione
                </h3>
                <button
                  onClick={() => onNavigate('new-rule')}
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
                  Nuova Regola
                </button>
              </div>

              <div style={{ display: 'grid', gap: LAYOUT.spacing.md }}>
                {storeRules.map((rule) => (
                  <div
                    key={rule.id}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: LAYOUT.radius.md,
                      padding: LAYOUT.spacing.md,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: LAYOUT.spacing.md,
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 4px 0' }}>
                          {rule.name}
                        </h4>
                        <p style={{ color: COLORS.textMuted, fontSize: '12px', margin: 0 }}>
                          Priorità: {rule.priority}
                        </p>
                      </div>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={rule.active}
                          readOnly
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ marginLeft: '8px', fontSize: '12px', color: COLORS.textMuted }}>
                          {rule.active ? 'Attiva' : 'Inattiva'}
                        </span>
                      </label>
                    </div>

                    <div style={{ marginBottom: LAYOUT.spacing.md }}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, margin: '0 0 8px 0' }}>
                        Condizioni:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: LAYOUT.spacing.sm }}>
                        {rule.conditions.map((cond, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: '#E0E7FF',
                              color: '#4338CA',
                              padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '600',
                            }}
                          >
                            {cond.field}: {cond.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: LAYOUT.spacing.md }}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.text, margin: '0 0 8px 0' }}>
                        Risultato:
                      </p>
                      <p style={{ fontSize: '13px', color: COLORS.text, margin: 0 }}>
                        → Corriere: {rule.courierName} | Servizio: {rule.service}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: LAYOUT.spacing.sm,
                      }}
                    >
                      <button
                        onClick={() => onNavigate(`edit-rule-${rule.id}`)}
                        style={{
                          backgroundColor: 'transparent',
                          color: COLORS.accent,
                          border: `1px solid ${COLORS.accent}`,
                          padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                          borderRadius: LAYOUT.radius.sm,
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => onNavigate(`delete-rule-${rule.id}`)}
                        style={{
                          backgroundColor: 'transparent',
                          color: COLORS.error,
                          border: `1px solid ${COLORS.error}`,
                          padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                          borderRadius: LAYOUT.radius.sm,
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {storeRules.length === 0 && (
                <p style={{ color: COLORS.textMuted, textAlign: 'center', padding: LAYOUT.spacing.lg }}>
                  Nessuna regola di spedizione configurata
                </p>
              )}
            </div>
          )}

          {/* Ordini Tab */}
          {activeTab === 'orders' && (
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
                      Numero Ordine
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Cliente
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Stato
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storeOrders.slice(0, 5).map((order) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: `1px solid ${COLORS.border}`,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text }}>
                        {order.orderNumber}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {order.customerName}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: order.orderStatus === 'delivered' ? '#D1FAE5' : '#FEF3C7',
                            color: order.orderStatus === 'delivered' ? '#047857' : '#92400E',
                            padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {new Date(order.createdAt).toLocaleDateString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {storeOrders.length === 0 && (
                <p style={{ color: COLORS.textMuted, textAlign: 'center', padding: LAYOUT.spacing.lg }}>
                  Nessun ordine trovato
                </p>
              )}
            </div>
          )}

          {/* Prodotti Tab */}
          {activeTab === 'products' && (
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
                      Nome Prodotto
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      SKU
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Quantità
                    </th>
                    <th style={{ padding: LAYOUT.spacing.md, textAlign: 'left', fontWeight: '600', color: COLORS.text }}>
                      Data Sync
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storeProducts.slice(0, 5).map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: `1px solid ${COLORS.border}`,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text }}>
                        {product.name}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {product.sku}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.text }}>
                        {product.quantity}
                      </td>
                      <td style={{ padding: LAYOUT.spacing.md, color: COLORS.textMuted }}>
                        {new Date(product.syncedAt).toLocaleDateString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {storeProducts.length === 0 && (
                <p style={{ color: COLORS.textMuted, textAlign: 'center', padding: LAYOUT.spacing.lg }}>
                  Nessun prodotto trovato
                </p>
              )}
            </div>
          )}

          {/* Impostazioni Tab */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 24px 0' }}>
                Impostazioni Store
              </h3>

              <div style={{ maxWidth: '600px' }}>
                <div style={{ marginBottom: LAYOUT.spacing.lg }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.text, marginBottom: LAYOUT.spacing.sm }}>
                    API Token
                  </label>
                  <input
                    type="password"
                    value={store.apiToken}
                    readOnly
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
                    Corriere Associato
                  </label>
                  <input
                    type="text"
                    value={store.courierName}
                    readOnly
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
                  onClick={() => onNavigate('save-settings')}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
