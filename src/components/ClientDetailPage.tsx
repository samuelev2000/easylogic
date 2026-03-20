import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockData } from '../data/mockData';

interface ClientDetailPageProps {
  clientId: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

type TabType = 'stores' | 'orders' | 'contracts';

const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ clientId, onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('stores');

  const client = mockData.clients.find((c) => c.id === clientId);
  const clientStores = useMemo(() => mockData.shopifyStores.filter((s) => s.clientId === clientId), [clientId]);
  const clientOrders = useMemo(() => {
    if (!client) return [];
    return mockData.orders.filter((o) => o.clientName === client.name);
  }, [clientId, client]);
  const clientContracts = useMemo(() => mockData.couriers, []);

  if (!client) {
    return (
      <div style={{ backgroundColor: COLORS.bg, padding: `${LAYOUT.padding}px` }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#9CA3AF', fontSize: '16px' }}>Cliente non trovato</p>
        </div>
      </div>
    );
  }

  const totalOrders = clientOrders.length;
  const totalRevenue = clientOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const deliveryRate = clientOrders.length > 0
    ? Math.round((clientOrders.filter((o) => o.orderStatus === 'delivered').length / clientOrders.length) * 100)
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'created':
        return '#3B82F6';
      case 'processing':
      case 'in_transit':
        return '#F59E0B';
      case 'shipped':
      case 'out_for_delivery':
        return '#8B5CF6';
      case 'delivered':
        return '#10B981';
      case 'cancelled':
      case 'held_at_depot':
      case 'exception':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'Nuovo',
      created: 'Creato',
      processing: 'In Elaborazione',
      in_transit: 'In Transito',
      shipped: 'Spedito',
      out_for_delivery: 'In Consegna',
      delivered: 'Consegnato',
      cancelled: 'Annullato',
      held_at_depot: 'In Giacenza',
      exception: 'Eccezione',
    };
    return labels[status] || status;
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, padding: `${LAYOUT.padding}px` }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          marginBottom: '24px',
          padding: '8px 12px',
          backgroundColor: 'transparent',
          color: COLORS.accent,
          border: 'none',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        ← Torna ai Clienti
      </button>

      {/* Client Header Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.text, margin: '0 0 16px 0' }}>
            {client.name}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '500px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Codice Cliente
              </p>
              <p style={{ fontSize: '14px', color: COLORS.text, margin: 0 }}>
                {client.code}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Email
              </p>
              <p style={{ fontSize: '14px', color: COLORS.text, margin: 0 }}>
                {client.email}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Telefono
              </p>
              <p style={{ fontSize: '14px', color: COLORS.text, margin: 0 }}>
                {client.phone}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                Data Creazione
              </p>
              <p style={{ fontSize: '14px', color: COLORS.text, margin: 0 }}>
                {new Date(client.createdAt).toLocaleDateString('it-IT')}
              </p>
            </div>
          </div>
        </div>
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: client.status === 'active' ? '#DCFCE7' : '#F3F4F6',
              color: client.status === 'active' ? '#15803D' : '#6B7280',
            }}
          >
            {client.status === 'active' ? 'Attivo' : 'Inattivo'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            flex: '1 1 200px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase' }}>
            Store Collegati
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.accent }}>
            {clientStores.length}
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            flex: '1 1 200px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase' }}>
            Ordini Mese
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.text }}>
            {totalOrders}
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            flex: '1 1 200px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase' }}>
            Fatturato
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.text }}>
            {formatCurrency(totalRevenue)}
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            flex: '1 1 200px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase' }}>
            Tasso Consegna
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.accent }}>
            {deliveryRate}%
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          marginBottom: '24px',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <button
          onClick={() => setActiveTab('stores')}
          style={{
            flex: 1,
            padding: '16px',
            backgroundColor: activeTab === 'stores' ? COLORS.accent : '#FFFFFF',
            color: activeTab === 'stores' ? '#FFFFFF' : COLORS.text,
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRight: `1px solid ${COLORS.border}`,
          }}
        >
          Store Collegati
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            flex: 1,
            padding: '16px',
            backgroundColor: activeTab === 'orders' ? COLORS.accent : '#FFFFFF',
            color: activeTab === 'orders' ? '#FFFFFF' : COLORS.text,
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRight: `1px solid ${COLORS.border}`,
          }}
        >
          Ordini Recenti
        </button>
        <button
          onClick={() => setActiveTab('contracts')}
          style={{
            flex: 1,
            padding: '16px',
            backgroundColor: activeTab === 'contracts' ? COLORS.accent : '#FFFFFF',
            color: activeTab === 'contracts' ? '#FFFFFF' : COLORS.text,
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Contratti Corrieri
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.border}`, borderRadius: '12px', padding: '24px' }}>
        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <div>
            {clientStores.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '16px',
                }}
              >
                {clientStores.map((store) => (
                  <div
                    key={store.id}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: '0 0 12px 0' }}>
                      {store.name}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Dominio:</span>
                        <span style={{ color: COLORS.text, marginLeft: '8px' }}>{store.domain}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Stato Sincronizzazione:</span>
                        <span
                          style={{
                            marginLeft: '8px',
                            color: store.syncStatus === 'synced' ? '#10B981' : '#F59E0B',
                            fontWeight: '600',
                          }}
                        >
                          {store.syncStatus === 'synced' ? '✓ Sincronizzato' : '⟳ In sincronizzazione'}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Ultima Sincronizzazione:</span>
                        <span style={{ color: COLORS.text, marginLeft: '8px' }}>
                          {new Date(store.lastSync).toLocaleDateString('it-IT')} {new Date(store.lastSync).toLocaleTimeString('it-IT')}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Corriere Principale:</span>
                        <span style={{ color: COLORS.text, marginLeft: '8px' }}>{store.courierName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                Nessuno store collegato a questo cliente
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {clientOrders.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        #Ordine
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Store
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Importo
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Tipo
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Stato
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6B7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                          #{order.id}
                        </td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: COLORS.text }}>
                          {order.storeName}
                        </td>
                        <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: COLORS.text }}>
                          {order.isCOD ? 'COD' : order.paymentMethod}
                        </td>
                        <td style={{ padding: '12px 0' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500',
                              backgroundColor: getStatusColor(order.orderStatus),
                              color: '#FFFFFF',
                            }}
                          >
                            {getStatusLabel(order.orderStatus)}
                          </span>
                        </td>
                        <td style={{ padding: '12px 0', fontSize: '13px', color: '#6B7280' }}>
                          {new Date(order.createdAt).toLocaleDateString('it-IT')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                Nessun ordine trovato per questo cliente
              </div>
            )}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div>
            {clientContracts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {clientContracts.map((contract) => (
                  <div
                    key={contract.id}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: 0 }}>
                        {contract.name}
                      </h4>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: contract.status === 'active' ? '#DCFCE7' : '#FEE2E2',
                          color: contract.status === 'active' ? '#15803D' : '#DC2626',
                        }}
                      >
                        {contract.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', fontSize: '13px' }}>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Codice:</span>
                        <div style={{ color: COLORS.text, marginTop: '4px' }}>{contract.code}</div>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Endpoint API:</span>
                        <div style={{ color: COLORS.text, marginTop: '4px' }}>
                          {contract.apiEndpoint}
                        </div>
                      </div>
                      <div>
                        <span style={{ color: '#6B7280', fontWeight: '500' }}>Servizi Disponibili:</span>
                        <div style={{ color: COLORS.text, marginTop: '4px' }}>
                          {contract.services.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                Nessun contratto di corriere trovato per questo cliente
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailPage;
