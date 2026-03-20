import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockOrders } from '../data/mockData';

interface CODPageProps {
  onNavigate: (page: string) => void;
  onSelectOrder: (id: number) => void;
}

interface CODDecision {
  orderId: number;
  action: string;
  user: string;
  timestamp: string;
}

export const CODPage: React.FC<CODPageProps> = ({ onNavigate, onSelectOrder }) => {
  const [activeTab, setActiveTab] = useState('to-process');
  const [codDecisions, setCodDecisions] = useState<CODDecision[]>([
    {
      orderId: 1004,
      action: 'Confermato',
      user: 'Admin User',
      timestamp: '2024-03-20 10:30',
    },
    {
      orderId: 1006,
      action: 'Annullato',
      user: 'Admin User',
      timestamp: '2024-03-20 11:00',
    },
  ]);

  const codOrders = mockOrders.filter(o => o.isCOD);

  const todayDecisions = codDecisions.filter(d => {
    const decisionDate = new Date(d.timestamp).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    return decisionDate === today;
  });

  const confirmedTodayCount = todayDecisions.filter(d => d.action === 'Confermato').length;
  const cancelledTodayCount = todayDecisions.filter(d => d.action === 'Annullato').length;

  const toProcessOrders = codOrders.filter(
    o => !codDecisions.find(d => d.orderId === o.id && d.action !== 'In Attesa')
  );
  const confirmedOrders = codOrders.filter(
    o => codDecisions.find(d => d.orderId === o.id && d.action === 'Confermato')
  );
  const cancelledOrders = codOrders.filter(
    o => codDecisions.find(d => d.orderId === o.id && d.action === 'Annullato')
  );

  const getTableData = () => {
    switch (activeTab) {
      case 'to-process':
        return toProcessOrders;
      case 'confirmed':
        return confirmedOrders;
      case 'cancelled':
        return cancelledOrders;
      case 'all':
        return codOrders;
      default:
        return [];
    }
  };

  const handleConfirmCOD = (orderId: number) => {
    const newDecision: CODDecision = {
      orderId,
      action: 'Confermato',
      user: 'Admin User',
      timestamp: new Date().toLocaleString('it-IT'),
    };
    setCodDecisions([...codDecisions, newDecision]);
  };

  const handleCancelCOD = (orderId: number) => {
    const newDecision: CODDecision = {
      orderId,
      action: 'Annullato',
      user: 'Admin User',
      timestamp: new Date().toLocaleString('it-IT'),
    };
    setCodDecisions([...codDecisions, newDecision]);
  };

  const getOrderStatus = (orderId: number) => {
    const decision = codDecisions.find(d => d.orderId === orderId);
    return decision ? decision.action : 'In Attesa';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confermato':
        return '#D1FAE5';
      case 'Annullato':
        return '#FEE2E2';
      case 'In Attesa':
        return '#FEF3C7';
      default:
        return '#F3F4F6';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Confermato':
        return '#065F46';
      case 'Annullato':
        return '#991B1B';
      case 'In Attesa':
        return '#92400E';
      default:
        return '#374151';
    }
  };

  const tableData = getTableData();

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', padding: `${LAYOUT.spacing.lg}px` }}>
      {/* Header */}
      <h1 style={{ margin: '0 0 32px 0', fontSize: '28px', fontWeight: '700', color: '#1F2937' }}>
        Gestione Contrassegni
      </h1>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#6B7280', fontSize: '13px', fontWeight: '600' }}>
            Da Confermare
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#F59E0B' }}>
              {toProcessOrders.length}
            </span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>ordini</span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
            In attesa di decisione
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#6B7280', fontSize: '13px', fontWeight: '600' }}>
            Confermati Oggi
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: COLORS.accent }}>
              {confirmedTodayCount}
            </span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>ordini</span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
            Confermati nelle ultime 24 ore
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#6B7280', fontSize: '13px', fontWeight: '600' }}>
            Annullati Oggi
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#DC2626' }}>
              {cancelledTodayCount}
            </span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>ordini</span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
            Annullati nelle ultime 24 ore
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '24px',
          borderBottom: `2px solid ${COLORS.border}`,
          backgroundColor: 'white',
          borderRadius: '8px 8px 0 0',
        }}
      >
        {[
          { id: 'to-process', label: 'Da Processare' },
          { id: 'confirmed', label: 'Confermati' },
          { id: 'cancelled', label: 'Annullati' },
          { id: 'all', label: 'Tutti' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? COLORS.accent : '#6B7280',
              border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid ${COLORS.accent}` : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '700' : '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '0 0 8px 8px',
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
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${COLORS.border}` }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                #Ordine
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                Cliente
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: '#374151' }}>
                Store
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#374151' }}>
                Importo Ordine
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#374151' }}>
                Importo COD
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Data
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                Stato
              </th>
              {activeTab === 'to-process' && (
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#374151' }}>
                  Azioni
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeTab === 'to-process' ? 8 : 7}
                  style={{
                    padding: '32px',
                    textAlign: 'center',
                    color: '#6B7280',
                    fontSize: '14px',
                  }}
                >
                  Nessun ordine trovato in questa categoria
                </td>
              </tr>
            ) : (
              tableData.map((order, index) => {
                const orderStatus = getOrderStatus(order.id);
                return (
                  <tr
                    key={order.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#FAFAFA',
                      borderBottom: `1px solid ${COLORS.border}`,
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
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#374151' }}>
                      €{order.totalAmount.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#1F2937' }}>
                      €{order.totalAmount.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#6B7280' }}>
                      {new Date(order.createdAt).toLocaleDateString('it-IT')}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: getStatusColor(orderStatus),
                          color: getStatusTextColor(orderStatus),
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {orderStatus}
                      </div>
                    </td>
                    {activeTab === 'to-process' && orderStatus === 'In Attesa' && (
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleConfirmCOD(order.id)}
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
                            Conferma
                          </button>
                          <button
                            onClick={() => handleCancelCOD(order.id)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#DC2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            Annulla
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Decision History Panel */}
      {codDecisions.length > 0 && (
        <div
          style={{
            marginTop: '32px',
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
            Cronologia Decisioni Recenti
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {codDecisions
              .slice()
              .reverse()
              .slice(0, 10)
              .map((decision, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 150px 180px',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '6px',
                    borderLeft: `4px solid ${
                      decision.action === 'Confermato'
                        ? COLORS.accent
                        : decision.action === 'Annullato'
                          ? '#DC2626'
                          : '#F59E0B'
                    }`,
                  }}
                >
                  <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '14px' }}>
                    #{decision.orderId}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px' }}>
                    Ordine {decision.orderId}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: getStatusColor(decision.action),
                      color: getStatusTextColor(decision.action),
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {decision.action}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '12px', textAlign: 'right' }}>
                    {decision.user} - {decision.timestamp}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
