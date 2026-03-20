import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockShopifyStores, mockClients } from '../data/mockData';

interface Props {
  onNavigate: (page: string) => void;
  onSelectStore: (id: number) => void;
}

export const StoresPage: React.FC<Props> = ({ onNavigate, onSelectStore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredStores = mockShopifyStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient === 'all' || store.clientName === selectedClient;
    const matchesStatus = selectedStatus === 'all' || store.syncStatus === selectedStatus;
    return matchesSearch && matchesClient && matchesStatus;
  });

  const stats = {
    connected: mockShopifyStores.length,
    synced: mockShopifyStores.filter((s) => s.syncStatus === 'synced').length,
    error: mockShopifyStores.filter((s) => s.syncStatus === 'error').length,
  };

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
            Store Shopify
          </h1>
          <button
            onClick={() => onNavigate('new-store')}
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
            Collega Nuovo Store
          </button>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: LAYOUT.spacing.md,
            marginBottom: LAYOUT.spacing.lg,
          }}
        >
          {[
            { label: 'Store Collegati', value: stats.connected, color: COLORS.text },
            { label: 'Sincronizzati', value: stats.synced, color: COLORS.success },
            { label: 'Errore Sync', value: stats.error, color: COLORS.error },
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
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  margin: '0 0 8px 0',
                  letterSpacing: '0.5px',
                }}
              >
                {stat.label}
              </p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color, margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            gap: LAYOUT.spacing.md,
            marginBottom: LAYOUT.spacing.lg,
            backgroundColor: COLORS.cardBg,
            padding: LAYOUT.spacing.md,
            borderRadius: LAYOUT.radius.md,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <input
            type="text"
            placeholder="Cerca store..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
              border: `1px solid ${COLORS.border}`,
              borderRadius: LAYOUT.radius.sm,
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            style={{
              padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
              border: `1px solid ${COLORS.border}`,
              borderRadius: LAYOUT.radius.sm,
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="all">Tutti i Client</option>
            {mockClients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
              border: `1px solid ${COLORS.border}`,
              borderRadius: LAYOUT.radius.sm,
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="all">Tutti gli Stati</option>
            <option value="synced">Sincronizzato</option>
            <option value="syncing">In Sync</option>
            <option value="error">Errore</option>
          </select>
        </div>

        {/* Store Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: LAYOUT.spacing.lg,
          }}
        >
          {filteredStores.map((store) => (
            <div
              key={store.id}
              style={{
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: LAYOUT.radius.md,
                padding: LAYOUT.spacing.md,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: LAYOUT.shadow.sm,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = LAYOUT.shadow.lg;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = LAYOUT.shadow.sm;
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Store Header */}
              <div style={{ marginBottom: LAYOUT.spacing.md }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.text, margin: '0 0 4px 0' }}>
                  {store.name}
                </h3>
                <p style={{ fontSize: '12px', color: COLORS.textMuted, margin: 0 }}>
                  {store.domain}
                </p>
              </div>

              {/* Client Badge */}
              <div style={{ marginBottom: LAYOUT.spacing.md }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#EDE9FE',
                    color: '#7C3AED',
                    padding: `${LAYOUT.spacing.xs} ${LAYOUT.spacing.sm}`,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}
                >
                  {store.clientName}
                </span>
              </div>

              {/* Status Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: LAYOUT.spacing.sm,
                  marginBottom: LAYOUT.spacing.md,
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: syncStatusColor(store.syncStatus),
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: '600', color: syncStatusColor(store.syncStatus) }}>
                  {syncStatusLabel(store.syncStatus)}
                </span>
              </div>

              {/* Details */}
              <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: LAYOUT.spacing.md, lineHeight: '1.6' }}>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>Ultimo sync:</span> {new Date(store.lastSync).toLocaleDateString('it-IT')}
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>Corriere:</span> {store.courierName}
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>Codice Contratto:</span> {store.contractCode}
                </div>
                <div>
                  <span style={{ fontWeight: '600' }}>Ordini Totali:</span> {store.ordersTotal}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: LAYOUT.spacing.sm,
                  marginTop: LAYOUT.spacing.md,
                }}
              >
                <button
                  onClick={() => onSelectStore(store.id)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: COLORS.accent,
                    border: `1px solid ${COLORS.accent}`,
                    padding: `${LAYOUT.spacing.sm} ${LAYOUT.spacing.md}`,
                    borderRadius: LAYOUT.radius.sm,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Dettaglio
                </button>
                <button
                  onClick={() => onNavigate(`sync-store-${store.id}`)}
                  style={{
                    flex: 1,
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
                  Sincronizza
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: LAYOUT.spacing.xl,
              color: COLORS.textMuted,
            }}
          >
            <p style={{ fontSize: '16px' }}>Nessuno store trovato</p>
          </div>
        )}
      </div>
    </div>
  );
};
