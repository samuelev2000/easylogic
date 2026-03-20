import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockOrders } from '../data/mockData';

interface OrderDetailPageProps {
  orderId: number;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface DecisionHistory {
  id: number;
  action: string;
  user: string;
  timestamp: string;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orderId, onBack, onNavigate }) => {
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];
  const [labelGenerated, setLabelGenerated] = useState(order.labelGenerated);
  const [decisionHistory, setDecisionHistory] = useState<DecisionHistory[]>([
    {
      id: 1,
      action: 'In Attesa',
      user: 'Sistema',
      timestamp: '2024-03-20 09:00',
    },
  ]);

  const timelineEvents: TimelineEvent[] = [
    { id: 1, title: 'Ordine Creato', date: '2024-03-20 08:00', status: 'completed' },
    { id: 2, title: 'Pagamento Confermato', date: '2024-03-20 08:15', status: 'completed' },
    { id: 3, title: 'Ordine Elaborato', date: '2024-03-20 09:30', status: 'completed' },
    { id: 4, title: 'Etichetta Generata', date: '2024-03-20 10:00', status: 'completed' },
    { id: 5, title: 'Consegnato al Corriere', date: '2024-03-21 14:30', status: 'completed' },
    { id: 6, title: 'In Transito', date: '2024-03-22 10:00', status: 'in-progress' },
    { id: 7, title: 'Consegnato al Cliente', date: '', status: 'pending' },
  ];

  const handleConfirmCOD = () => {
    const newDecision: DecisionHistory = {
      id: decisionHistory.length + 1,
      action: 'Confermato',
      user: 'Admin User',
      timestamp: new Date().toLocaleString('it-IT'),
    };
    setDecisionHistory([...decisionHistory, newDecision]);
  };

  const handleCancelCOD = () => {
    const newDecision: DecisionHistory = {
      id: decisionHistory.length + 1,
      action: 'Annullato',
      user: 'Admin User',
      timestamp: new Date().toLocaleString('it-IT'),
    };
    setDecisionHistory([...decisionHistory, newDecision]);
  };

  const handleGenerateLabel = () => {
    setLabelGenerated(true);
  };

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', padding: `${LAYOUT.spacing.lg}px` }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          marginBottom: '24px',
          padding: '8px 12px',
          backgroundColor: 'transparent',
          color: '#6B7280',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        ← Torna agli Ordini
      </button>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
            Ordine #{order.id}
          </h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: '#6B7280', fontSize: '14px' }}>
              {new Date(order.createdAt).toLocaleDateString('it-IT')}
            </span>
            <span
              style={{
                padding: '4px 8px',
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {order.orderStatus}
            </span>
            <span style={{ color: '#6B7280', fontSize: '14px' }}>
              Store: {order.storeName}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleGenerateLabel}
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
            Genera Etichetta
          </button>
          <button
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#6B7280',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Stampa Etichetta
          </button>
          <button
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: '#DC2626',
              border: `1px solid #DC2626`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Annulla Ordine
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Prodotti Ordinati */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Prodotti Ordinati
            </h2>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                    Immagine
                  </th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                    Prodotto
                  </th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>
                    SKU
                  </th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>
                    Quantità
                  </th>
                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>
                    Prezzo
                  </th>
                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>
                    Subtotale
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: 'Laptop Stand', sku: 'LS-001', qty: 1, price: 45.99, image: '📦' },
                  { id: 2, name: 'USB-C Cable', sku: 'USB-002', qty: 2, price: 12.99, image: '📦' },
                  { id: 3, name: 'Keyboard', sku: 'KB-003', qty: 1, price: 89.99, image: '📦' },
                ].map((product) => (
                  <tr key={product.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: '10px', textAlign: 'center', fontSize: '20px' }}>
                      {product.image}
                    </td>
                    <td style={{ padding: '10px', color: '#374151' }}>
                      {product.name}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>
                      {product.sku}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#374151' }}>
                      {product.qty}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', color: '#374151' }}>
                      €{product.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', color: '#1F2937', fontWeight: '600' }}>
                      €{(product.price * product.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline Ordine */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Timeline Ordine
            </h2>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  style={{
                    marginBottom: index < timelineEvents.length - 1 ? '24px' : '0',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '3px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor:
                        event.status === 'completed'
                          ? COLORS.accent
                          : event.status === 'in-progress'
                            ? '#F59E0B'
                            : '#D1D5DB',
                      border: '3px solid white',
                      boxShadow: `0 0 0 1px ${COLORS.border}`,
                    }}
                  />
                  {index < timelineEvents.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '-19px',
                        top: '20px',
                        width: '2px',
                        height: '16px',
                        backgroundColor: COLORS.border,
                      }}
                    />
                  )}
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1F2937', fontSize: '13px' }}>
                      {event.title}
                    </p>
                    <p style={{ margin: 0, color: '#6B7280', fontSize: '12px' }}>
                      {event.date || 'In attesa'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Riepilogo */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Riepilogo
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>Subtotale:</span>
                <span>€{(order.totalAmount * 0.85).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>Spedizione:</span>
                <span>€8.99</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>Commissione COD:</span>
                <span>€{order.isCOD ? '3.00' : '0.00'}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: `1px solid ${COLORS.border}`,
                  paddingTop: '12px',
                  fontWeight: '700',
                  color: '#1F2937',
                  fontSize: '15px',
                }}
              >
                <span>Totale:</span>
                <span>€{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Cliente */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Cliente
            </h2>
            <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Nome</p>
                <p style={{ margin: 0, color: '#1F2937', fontWeight: '600' }}>{order.customerName}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Email</p>
                <p style={{ margin: 0, color: '#1F2937' }}>{order.customerEmail}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Telefono</p>
                <p style={{ margin: 0, color: '#1F2937' }}>+39 340 1234567</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Indirizzo</p>
                <p style={{ margin: 0, color: '#1F2937' }}>Via Roma 123</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Città/ZIP</p>
                <p style={{ margin: 0, color: '#1F2937' }}>Milano, 20100</p>
              </div>
            </div>
          </div>

          {/* Spedizione */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Spedizione
            </h2>
            <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Corriere</p>
                <p style={{ margin: 0, color: '#1F2937', fontWeight: '600' }}>{order.courierName}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Servizio</p>
                <p style={{ margin: 0, color: '#1F2937' }}>Consegna Express 24h</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Numero Tracking</p>
                <p
                  style={{
                    margin: 0,
                    color: COLORS.accent,
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {order.trackingNumber || 'N/A'}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Stato</p>
                <p style={{ margin: 0, color: '#065F46', fontWeight: '600' }}>In Transito</p>
              </div>
            </div>
          </div>

          {/* Contrassegno (if COD) */}
          {order.isCOD && (
            <div
              style={{
                backgroundColor: 'white',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
                Contrassegno
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', color: '#6B7280', fontSize: '12px' }}>Stato Attuale</p>
                  <p
                    style={{
                      margin: 0,
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {decisionHistory[decisionHistory.length - 1].action}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleConfirmCOD}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: COLORS.accent,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px',
                    }}
                  >
                    Conferma
                  </button>
                  <button
                    onClick={handleCancelCOD}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#DC2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px',
                    }}
                  >
                    Annulla
                  </button>
                </div>
                <div>
                  <p style={{ margin: '0 0 8px 0', color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>
                    Cronologia Decisioni
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {decisionHistory.map(decision => (
                      <div
                        key={decision.id}
                        style={{
                          padding: '8px',
                          backgroundColor: '#F9FAFB',
                          borderRadius: '4px',
                          fontSize: '12px',
                          borderLeft: `3px solid ${COLORS.accent}`,
                        }}
                      >
                        <p style={{ margin: '0 0 2px 0', fontWeight: '600', color: '#1F2937' }}>
                          {decision.action}
                        </p>
                        <p style={{ margin: 0, color: '#6B7280', fontSize: '11px' }}>
                          {decision.user} - {decision.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Etichetta */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#1F2937' }}>
              Etichetta
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p
                style={{
                  margin: 0,
                  padding: '8px',
                  backgroundColor: labelGenerated ? '#D1FAE5' : '#FEE2E2',
                  color: labelGenerated ? '#065F46' : '#991B1B',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                {labelGenerated ? '✓ Generata' : '✗ Non generata'}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleGenerateLabel}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: COLORS.accent,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                  }}
                >
                  Genera
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: 'transparent',
                    color: '#6B7280',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                  }}
                >
                  Stampa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
