import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockOrders } from '../data/mockData';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
  onSelectOrder: (id: number) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate, onSelectOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [codFilter, setCodFilter] = useState('all');
  const [selectedCourier, setSelectedCourier] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStore = selectedStore === 'all' || order.storeName === selectedStore;
      const matchesStatus = selectedStatus === 'all' || order.orderStatus === selectedStatus;
      const matchesCOD = codFilter === 'all' ||
        (codFilter === 'si' && order.isCOD) ||
        (codFilter === 'no' && !order.isCOD);
      const matchesCourier = selectedCourier === 'all' || order.courierName === selectedCourier;

      return matchesSearch && matchesStore && matchesStatus && matchesCOD && matchesCourier;
    });
  }, [searchTerm, selectedStore, selectedStatus, codFilter, selectedCourier]);

  const statusCounts = {
    all: mockOrders.length,
    new: mockOrders.filter(o => o.orderStatus === 'new').length,
    processing: mockOrders.filter(o => o.orderStatus === 'processing').length,
    shipped: mockOrders.filter(o => o.orderStatus === 'shipped').length,
    delivered: mockOrders.filter(o => o.orderStatus === 'delivered').length,
    cancelled: mockOrders.filter(o => o.orderStatus === 'cancelled').length,
  };

  const getStatusBadgeStyle = (status: string) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      whiteSpace: 'nowrap' as const,
    };

    switch (status) {
      case 'new':
        return { ...baseStyle, backgroundColor: '#DBEAFE', color: '#1E40AF' };
      case 'processing':
        return { ...baseStyle, backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'shipped':
        return { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'delivered':
        return { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'cancelled':
        return { ...baseStyle, backgroundColor: '#FEE2E2', color: '#991B1B' };
      default:
        return baseStyle;
    }
  };

  const getPaymentBadgeStyle = (type: string) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      whiteSpace: 'nowrap' as const,
    };
    return type === 'COD'
      ? { ...baseStyle, backgroundColor: '#FEF3C7', color: '#92400E' }
      : { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
  };

  const stores = Array.from(new Set(mockOrders.map(o => o.storeName)));
  const statuses = ['new', 'processing', 'shipped', 'delivered', 'cancelled'];
  const couriers = Array.from(new Set(mockOrders.map(o => o.courierName)));

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', padding: `${LAYOUT.spacing.lg}px` }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1F2937' }}>
          Gestione Ordini
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onNavigate('orders')}
            style={{
              padding: '10px 16px',
              backgroundColor: COLORS.accent,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Sincronizza Ordini
          </button>
          <button
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#6B7280',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Esporta CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Cerca ordine, cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tutti i Store</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tutti gli Stati</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={codFilter}
            onChange={(e) => setCodFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="all">COD: Tutti</option>
            <option value="si">COD: Si</option>
            <option value="no">COD: No</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', gridColumn: '1 / 3' }}>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </div>
          <select
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="all">Tutti i Corrieri</option>
            {couriers.map(courier => (
              <option key={courier} value={courier}>{courier}</option>
            ))}
          </select>
        </div>

        <button
          style={{
            marginTop: '12px',
            padding: '10px 16px',
            backgroundColor: COLORS.accent,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          Applica Filtri
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Tutti', count: statusCounts.all, bg: '#F3F4F6' },
          { label: 'Nuovi', count: statusCounts.new, bg: '#DBEAFE' },
          { label: 'In Lavorazione', count: statusCounts.processing, bg: '#FEF3C7' },
          { label: 'Spediti', count: statusCounts.shipped, bg: '#D1FAE5' },
          { label: 'Consegnati', count: statusCounts.delivered, bg: '#D1FAE5' },
          { label: 'Annullati', count: statusCounts.cancelled, bg: '#FEE2E2' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              backgroundColor: stat.bg,
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
              {stat.count}
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${COLORS.cardBorder}` }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                #Ordine
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                Cliente Finale
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                Store
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Prodotti
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#374151' }}>
                Importo
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Pagamento
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Stato COD
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Stato Ordine
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Tracking
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Etichetta
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#FAFAFA',
                  borderBottom: `1px solid ${COLORS.cardBorder}`,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = index % 2 === 0 ? 'white' : '#FAFAFA';
                }}
              >
                <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1F2937' }}>
                  {order.id}
                </td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>
                  {order.customerName}
                </td>
                <td style={{ padding: '12px 16px', color: '#374151' }}>
                  {order.storeName}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>
                  {order.items.length}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>
                  €{order.totalAmount.toFixed(2)}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={getPaymentBadgeStyle(order.isCOD ? 'COD' : order.paymentMethod)}>
                    {order.isCOD ? 'COD' : order.paymentMethod}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  {order.isCOD && order.codStatus && (
                    <div
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: order.codStatus === 'confirmed' ? '#D1FAE5' :
                                        order.codStatus === 'pending' ? '#FEF3C7' : '#FEE2E2',
                        color: order.codStatus === 'confirmed' ? '#065F46' :
                               order.codStatus === 'pending' ? '#92400E' : '#991B1B',
                      }}
                    >
                      {order.codStatus}
                    </div>
                  )}
                  {!order.isCOD && '—'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={getStatusBadgeStyle(order.orderStatus)}>
                    {order.orderStatus}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#374151' }}>
                  {order.trackingNumber ? order.trackingNumber : '—'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', color: order.labelGenerated ? COLORS.accent : '#D1D5DB' }}>
                    {order.labelGenerated ? '✓' : '✗'}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button
                    onClick={() => onSelectOrder(order.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: COLORS.accent,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    Dettagli
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          padding: '0 16px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#6B7280' }}>
          Mostrando 1-{Math.min(25, filteredOrders.length)} di {filteredOrders.length} ordini
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              padding: '8px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Precedente
          </button>
          <button
            style={{
              padding: '8px 12px',
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Prossimo
          </button>
        </div>
      </div>
    </div>
  );
};
