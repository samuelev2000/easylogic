import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockData } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const dashboardStats = mockData.dashboardStats;
  const recentOrders = mockData.orders.slice(0, 8);
  const problematicShipments = mockData.shipments.filter(
    (s) => s.status === 'held_at_depot' || s.status === 'exception'
  );
  const recentActivity = mockData.activityLogs.slice(0, 8);
  const pendingCodOrders = mockData.orders.filter((o) => o.isCOD === true && o.orderStatus === 'processing');

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

  const KPICard = ({ icon, label, value, accent, change }: any) => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '12px',
        padding: '24px',
        flex: 1,
        minWidth: '200px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>{label}</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.text, marginBottom: '12px' }}>
            {value}
          </div>
          {change && (
            <div style={{ fontSize: '12px', color: change > 0 ? '#10B981' : '#EF4444' }}>
              {change > 0 ? '+' : ''}{change}% vs ieri
            </div>
          )}
        </div>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: accent,
            opacity: 0.15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'ora';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m fa`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h fa`;
    return `${Math.floor(seconds / 86400)}g fa`;
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, padding: `${LAYOUT.padding}px` }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.text, margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '8px 0 0 0' }}>
          Benvenuto nel tuo sistema di gestione logistica
        </p>
      </div>

      {/* Row 1: KPI Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KPICard icon="📦" label="Ordini Oggi" value={dashboardStats.ordersToday} accent={COLORS.accent} change={12} />
        <KPICard icon="⏳" label="In Attesa" value={dashboardStats.ordersPending} accent="#F59E0B" change={-5} />
        <KPICard icon="💳" label="COD da Confermare" value={dashboardStats.codToConfirm} accent="#8B5CF6" change={8} />
        <KPICard icon="🏷️" label="Etichette Oggi" value={dashboardStats.labelsToday} accent="#3B82F6" change={15} />
      </div>

      {/* Row 2: More KPI Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KPICard icon="🚚" label="Spedizioni in Transito" value={dashboardStats.shipmentsInTransit} accent={COLORS.accent} change={3} />
        <KPICard icon="📍" label="In Giacenza" value={dashboardStats.shipmentsHeld} accent="#EF4444" change={-2} />
        <KPICard icon="📉" label="Prodotti Sotto Scorta" value={dashboardStats.lowStockProducts} accent="#F59E0B" change={0} />
        <KPICard icon="€" label="Fatturato Mese" value={formatCurrency(dashboardStats.totalRevenue)} accent={COLORS.accent} change={7} />
      </div>

      {/* Row 3: Orders and Problematic Shipments */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        {/* Recent Orders */}
        <div style={{ flex: '0 0 60%' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: '0 0 16px 0' }}>
              Ultimi Ordini
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      #Ordine
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      Cliente
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      Store
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      Importo
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      Stato
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: `1px solid ${COLORS.border}`, cursor: 'pointer' }}>
                      <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '14px', color: COLORS.text }}>{order.customerName}</td>
                      <td style={{ padding: '12px 0', fontSize: '14px', color: COLORS.text }}>{order.storeName}</td>
                      <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                        {formatCurrency(order.totalAmount)}
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
                      <td style={{ padding: '12px 0', fontSize: '14px', color: '#6B7280' }}>
                        {new Date(order.createdAt).toLocaleDateString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Problematic Shipments */}
        <div style={{ flex: '0 0 40%' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: '0 0 16px 0' }}>
              Spedizioni Problematiche
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {problematicShipments.length > 0 ? (
                problematicShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    style={{
                      padding: '12px',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '8px',
                      borderLeft: `3px solid #EF4444`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                        {shipment.trackingNumber}
                      </span>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                        }}
                      >
                        {getStatusLabel(shipment.status)}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                      {shipment.customerName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      Destinazione: {shipment.destination}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                  Nessuna spedizione problematica
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activity and Pending COD Orders */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Recent Activity */}
        <div style={{ flex: '0 0 50%' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: '0 0 16px 0' }}>
              Attività Recenti
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivity.map((activity) => (
                <div key={activity.id} style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.accent,
                      opacity: 0.2,
                      flex: '0 0 40px',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: COLORS.text, marginBottom: '4px' }}>
                      {activity.user || 'Sistema'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {timeAgo(new Date(activity.createdAt))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending COD Orders */}
        <div style={{ flex: '0 0 50%' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.text, margin: '0 0 16px 0' }}>
              Ordini COD in Attesa
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingCodOrders.length > 0 ? (
                pendingCodOrders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      padding: '12px',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: COLORS.text, marginBottom: '4px' }}>
                        Ordine #{order.id} - {order.customerName}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: COLORS.accent,
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Conferma
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#F3F4F6',
                          color: '#6B7280',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Annulla
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                  Nessun ordine COD in attesa
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
