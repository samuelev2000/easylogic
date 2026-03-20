import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { products, inventoryMovements } from '../data/mockData';

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onBack }) => {
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [operationType, setOperationType] = useState<'carico' | 'scarico'>('carico');

  // Filter movements for this product
  const productMovements = useMemo(() => {
    return inventoryMovements.filter((m) => m.sku === product?.sku);
  }, [product?.sku]);

  if (!product) {
    return (
      <div
        style={{
          backgroundColor: COLORS.background,
          minHeight: '100vh',
          padding: LAYOUT.spacing.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <p style={{ color: COLORS.textSecondary, fontSize: '16px' }}>
          Prodotto non trovato
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'in_stock':
        return COLORS.success;
      case 'low_stock':
        return '#F59E0B';
      case 'out_of_stock':
        return COLORS.error;
      default:
        return COLORS.text;
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'in_stock':
        return 'In Stock';
      case 'low_stock':
        return 'Sotto Scorta';
      case 'out_of_stock':
        return 'Esaurito';
      default:
        return status;
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.background,
        minHeight: '100vh',
        padding: LAYOUT.spacing.lg,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: COLORS.success,
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: LAYOUT.spacing.lg,
          padding: 0,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.success)}
      >
        ← Torna al Magazzino
      </button>

      {/* Product Header */}
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '8px',
          padding: LAYOUT.spacing.lg,
          marginBottom: LAYOUT.spacing.lg,
          display: 'flex',
          gap: LAYOUT.spacing.lg,
          alignItems: 'flex-start',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '8px',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: COLORS.text,
              margin: '0 0 16px 0',
            }}
          >
            {product.name}
          </h1>
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: getStatusColor(product.status) + '20',
                color: getStatusColor(product.status),
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {getStatusLabel(product.status)}
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: LAYOUT.spacing.md,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textSecondary,
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                SKU
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.text,
                  margin: 0,
                  fontFamily: 'monospace',
                  fontWeight: '600',
                }}
              >
                {product.sku}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textSecondary,
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Barcode
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.text,
                  margin: 0,
                  fontFamily: 'monospace',
                }}
              >
                {product.barcode}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textSecondary,
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Store
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.text,
                  margin: 0,
                }}
              >
                {product.store}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textSecondary,
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Cliente
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.text,
                  margin: 0,
                }}
              >
                {product.client}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: LAYOUT.spacing.lg,
        }}
      >
        {/* Left Column */}
        <div>
          {/* Informazioni Prodotto Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.lg,
              marginBottom: LAYOUT.spacing.lg,
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: COLORS.text,
                margin: '0 0 16px 0',
                paddingBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              Informazioni Prodotto
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: LAYOUT.spacing.md,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Nome Prodotto
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontWeight: '500',
                  }}
                >
                  {product.name}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  SKU
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontFamily: 'monospace',
                    fontWeight: '600',
                  }}
                >
                  {product.sku}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Barcode
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontFamily: 'monospace',
                  }}
                >
                  {product.barcode}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Prezzo
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontWeight: '600',
                  }}
                >
                  €{product.price.toFixed(2)}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Store
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                  }}
                >
                  {product.store}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Cliente
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                  }}
                >
                  {product.client}
                </p>
              </div>
            </div>
          </div>

          {/* Movimenti Stock Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.lg,
              overflow: 'hidden',
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: COLORS.text,
                margin: '0 0 16px 0',
                paddingBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              Movimenti Stock
            </h2>
            <div
              style={{
                overflowX: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                  minWidth: '600px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {['Data', 'Tipo', 'Quantità', 'Motivo', 'Eseguito da'].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: '10px 8px',
                          textAlign: 'left',
                          fontWeight: '600',
                          color: COLORS.textSecondary,
                          fontSize: '11px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productMovements.length > 0 ? (
                    productMovements.map((movement, idx) => {
                      const typeColors: Record<string, string> = {
                        inbound: COLORS.success,
                        outbound: COLORS.error,
                        adjustment: '#3B82F6',
                        return: '#A78BFA',
                      };
                      const typeLabels: Record<string, string> = {
                        inbound: 'Carico',
                        outbound: 'Scarico',
                        adjustment: 'Rettifica',
                        return: 'Reso',
                      };
                      return (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: `1px solid ${COLORS.border}`,
                            backgroundColor: idx % 2 === 0 ? 'white' : '#FAFBFC',
                          }}
                        >
                          <td style={{ padding: '10px 8px', color: COLORS.textSecondary }}>
                            {new Date(movement.date).toLocaleDateString('it-IT')}
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                backgroundColor: typeColors[movement.type] + '20',
                                color: typeColors[movement.type],
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                              }}
                            >
                              {typeLabels[movement.type]}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: '10px 8px',
                              fontWeight: '600',
                              color:
                                movement.type === 'outbound' || movement.type === 'return'
                                  ? COLORS.error
                                  : COLORS.success,
                            }}
                          >
                            {movement.type === 'outbound' || movement.type === 'return'
                              ? '-'
                              : '+'}
                            {Math.abs(movement.quantity)}
                          </td>
                          <td style={{ padding: '10px 8px', color: COLORS.textSecondary }}>
                            {movement.reason}
                          </td>
                          <td style={{ padding: '10px 8px', color: COLORS.text }}>
                            {movement.performedBy}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: '20px',
                          textAlign: 'center',
                          color: COLORS.textSecondary,
                          fontSize: '13px',
                        }}
                      >
                        Nessun movimento registrato
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Livelli Stock Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.lg,
              marginBottom: LAYOUT.spacing.lg,
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: COLORS.text,
                margin: '0 0 16px 0',
                paddingBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              Livelli Stock
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: LAYOUT.spacing.md }}>
              {[
                {
                  label: 'Disponibile',
                  value: product.available,
                  color: COLORS.success,
                },
                {
                  label: 'Riservata',
                  value: product.reserved,
                  color: '#F59E0B',
                },
                {
                  label: 'In Arrivo',
                  value: product.incoming,
                  color: '#3B82F6',
                },
                {
                  label: 'Minimo',
                  value: product.minimum,
                  color: '#6B7280',
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: COLORS.text,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: item.color,
                        width: `${Math.min((item.value / Math.max(...[product.available, product.reserved, product.incoming, product.minimum])) * 100, 100)}%`,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestione Rapida Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.lg,
              marginBottom: LAYOUT.spacing.lg,
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: COLORS.text,
                margin: '0 0 16px 0',
                paddingBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              Gestione Rapida
            </h2>
            <div style={{ marginBottom: LAYOUT.spacing.md }}>
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textSecondary,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Quantità Attuale
              </p>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: COLORS.success,
                  margin: 0,
                }}
              >
                {product.available}
              </p>
            </div>

            <div style={{ marginBottom: LAYOUT.spacing.md }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <button
                  onClick={() => {
                    setOperationType('carico');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: operationType === 'carico' ? COLORS.success : '#F3F4F6',
                    color: operationType === 'carico' ? 'white' : COLORS.text,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (operationType !== 'carico') {
                      e.currentTarget.style.backgroundColor = '#E5E7EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (operationType !== 'carico') {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                >
                  Carico
                </button>
                <button
                  onClick={() => {
                    setOperationType('scarico');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: operationType === 'scarico' ? '#F59E0B' : '#F3F4F6',
                    color: operationType === 'scarico' ? 'white' : COLORS.text,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (operationType !== 'scarico') {
                      e.currentTarget.style.backgroundColor = '#E5E7EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (operationType !== 'scarico') {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                >
                  Scarico
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    backgroundColor: '#F3F4F6',
                    color: COLORS.text,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    backgroundColor: '#F3F4F6',
                    color: COLORS.text,
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                >
                  +
                </button>
              </div>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Motivo dell'operazione..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '10px 12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  marginBottom: '12px',
                }}
              />

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: COLORS.success,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#059669')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.success)
                }
              >
                Conferma Operazione
              </button>
            </div>
          </div>

          {/* Store Associato Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.lg,
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: COLORS.text,
                margin: '0 0 16px 0',
                paddingBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              Store Associato
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: LAYOUT.spacing.sm,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Store
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontWeight: '500',
                  }}
                >
                  {product.store}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Cliente
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS.text,
                    margin: 0,
                    fontWeight: '500',
                  }}
                >
                  {product.client}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textSecondary,
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Stato Sincronizzazione
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    backgroundColor: COLORS.success + '20',
                    color: COLORS.success,
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.success,
                    }}
                  />
                  Sincronizzato
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
