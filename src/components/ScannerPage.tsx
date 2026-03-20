import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { products } from '../data/mockData';

interface ScannerPageProps {
  onNavigate: (page: string) => void;
}

type ScanMode = 'carico' | 'scarico' | 'verifica' | 'inventario' | null;

interface ScannedProduct {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  image: string;
  available: number;
}

interface ScanHistoryItem {
  productName: string;
  sku: string;
  quantity: number;
  timestamp: Date;
  mode: ScanMode;
}

const ScannerPage: React.FC<ScannerPageProps> = ({ onNavigate }) => {
  const [selectedMode, setSelectedMode] = useState<ScanMode>(null);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  const modes = [
    {
      id: 'carico' as const,
      label: 'Carico Merce',
      color: COLORS.success,
      icon: '📦',
    },
    {
      id: 'scarico' as const,
      label: 'Scarico Merce',
      color: '#F59E0B',
      icon: '📤',
    },
    {
      id: 'verifica' as const,
      label: 'Verifica Prodotto',
      color: '#3B82F6',
      icon: '✓',
    },
    {
      id: 'inventario' as const,
      label: 'Inventario',
      color: '#A78BFA',
      icon: '📋',
    },
  ];

  const handleModeSelect = (mode: ScanMode) => {
    setSelectedMode(mode);
    setScannedProduct(null);
    setQuantity(1);
    setShowProductDropdown(false);
  };

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setScannedProduct({
        id: product.id,
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        image: product.image,
        available: product.available,
      });
      setShowProductDropdown(false);
      setQuantity(1);
    }
  };

  const handleConfirmOperation = () => {
    if (scannedProduct && selectedMode) {
      setScanHistory((prev) => [
        {
          productName: scannedProduct.name,
          sku: scannedProduct.sku,
          quantity,
          timestamp: new Date(),
          mode: selectedMode,
        },
        ...prev,
      ]);
      setScannedProduct(null);
      setQuantity(1);
    }
  };

  const getModeColor = (mode: ScanMode): string => {
    const modeObj = modes.find((m) => m.id === mode);
    return modeObj ? modeObj.color : COLORS.text;
  };

  const getModeLabel = (mode: ScanMode): string => {
    const modeObj = modes.find((m) => m.id === mode);
    return modeObj ? modeObj.label : '';
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.background,
        minHeight: '100vh',
        padding: LAYOUT.spacing.lg,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: COLORS.text,
          margin: '0 0 32px 0',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        Scanner Magazzino
      </h1>

      {/* Mode Selector - Only if no mode selected */}
      {!selectedMode ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: LAYOUT.spacing.lg,
              maxWidth: '600px',
              width: '100%',
              marginBottom: LAYOUT.spacing.lg,
            }}
          >
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id as ScanMode)}
                style={{
                  padding: '32px 24px',
                  backgroundColor: 'white',
                  border: `2px solid ${mode.color}`,
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: mode.color,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  minHeight: '160px',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mode.color + '10';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{ fontSize: '48px' }}>{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Back Button */}
          <button
            onClick={() => handleModeSelect(null)}
            style={{
              alignSelf: 'flex-start',
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
            ← Torna ai Modi
          </button>

          {/* Mode Indicator */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: getModeColor(selectedMode) + '10',
              border: `2px solid ${getModeColor(selectedMode)}`,
              borderRadius: '8px',
              marginBottom: LAYOUT.spacing.lg,
              textAlign: 'center',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: getModeColor(selectedMode),
                margin: 0,
              }}
            >
              Modalità: {getModeLabel(selectedMode)}
            </p>
          </div>

          {/* Scanner Area */}
          {!scannedProduct ? (
            <div
              onClick={() => setShowProductDropdown(true)}
              style={{
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '1',
                border: `3px dashed ${COLORS.border}`,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: '#FAFBFC',
                transition: 'all 0.3s ease',
                marginBottom: LAYOUT.spacing.lg,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.success;
                e.currentTarget.style.backgroundColor = COLORS.success + '05';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.backgroundColor = '#FAFBFC';
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📷</div>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: COLORS.text,
                  margin: '0 0 8px 0',
                  textAlign: 'center',
                }}
              >
                Tap per scannerizzare
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.textSecondary,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Oppure seleziona un prodotto
              </p>

              {/* Product Dropdown */}
              {showProductDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductSelect(product.id);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'white',
                        border: 'none',
                        borderBottom: `1px solid ${COLORS.border}`,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#F9FAFB')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'white')
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '4px',
                            objectFit: 'cover',
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: COLORS.text,
                              margin: '0 0 4px 0',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {product.name}
                          </p>
                          <p
                            style={{
                              fontSize: '12px',
                              color: COLORS.textSecondary,
                              margin: 0,
                              fontFamily: 'monospace',
                            }}
                          >
                            {product.sku}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Scanned Product Card */}
              <div
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  padding: LAYOUT.spacing.lg,
                  width: '100%',
                  maxWidth: '600px',
                  marginBottom: LAYOUT.spacing.lg,
                }}
              >
                {/* Product Image */}
                <img
                  src={scannedProduct.image}
                  alt={scannedProduct.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    marginBottom: LAYOUT.spacing.md,
                  }}
                />

                {/* Product Info */}
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: COLORS.text,
                    margin: '0 0 12px 0',
                  }}
                >
                  {scannedProduct.name}
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: LAYOUT.spacing.md,
                    marginBottom: LAYOUT.spacing.lg,
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
                      {scannedProduct.sku}
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
                      {scannedProduct.barcode}
                    </p>
                  </div>
                </div>

                {/* Current Stock Display */}
                <div
                  style={{
                    backgroundColor: '#ECFDF5',
                    border: `2px solid ${COLORS.success}`,
                    borderRadius: '8px',
                    padding: LAYOUT.spacing.md,
                    marginBottom: LAYOUT.spacing.lg,
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '13px',
                      color: COLORS.textSecondary,
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                    }}
                  >
                    Stock Disponibile
                  </p>
                  <p
                    style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: COLORS.success,
                      margin: 0,
                    }}
                  >
                    {scannedProduct.available}
                  </p>
                </div>

                {/* Large +/- Buttons */}
                <div
                  style={{
                    display: 'flex',
                    gap: LAYOUT.spacing.md,
                    marginBottom: LAYOUT.spacing.lg,
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      flex: 1,
                      height: '60px',
                      padding: 0,
                      backgroundColor: '#FEF3C7',
                      color: '#F59E0B',
                      border: `2px solid #F59E0B`,
                      borderRadius: '8px',
                      fontSize: '32px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F59E0B';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FEF3C7';
                      e.currentTarget.style.color = '#F59E0B';
                    }}
                  >
                    −
                  </button>

                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `2px solid ${COLORS.border}`,
                        borderRadius: '8px',
                        fontSize: '28px',
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      flex: 1,
                      height: '60px',
                      padding: 0,
                      backgroundColor: '#ECFDF5',
                      color: COLORS.success,
                      border: `2px solid ${COLORS.success}`,
                      borderRadius: '8px',
                      fontSize: '32px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.success;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ECFDF5';
                      e.currentTarget.style.color = COLORS.success;
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmOperation}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: COLORS.success,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginBottom: LAYOUT.spacing.md,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#059669')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.success)
                  }
                >
                  ✓ Conferma Operazione
                </button>

                {/* Change Product Button */}
                <button
                  onClick={() => setScannedProduct(null)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    color: COLORS.text,
                    border: `2px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Cambia Prodotto
                </button>
              </div>
            </>
          )}

          {/* Recent Scans List */}
          {scanHistory.length > 0 && (
            <div
              style={{
                backgroundColor: 'white',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: LAYOUT.spacing.lg,
                width: '100%',
                maxWidth: '600px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: COLORS.text,
                  margin: '0 0 16px 0',
                  paddingBottom: '12px',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                Operazioni Recenti
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: LAYOUT.spacing.sm }}>
                {scanHistory.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      backgroundColor: '#FAFBFC',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: COLORS.text,
                          margin: '0 0 4px 0',
                        }}
                      >
                        {item.productName}
                      </p>
                      <p
                        style={{
                          fontSize: '11px',
                          color: COLORS.textSecondary,
                          margin: 0,
                          fontFamily: 'monospace',
                        }}
                      >
                        {item.sku} • {item.timestamp.toLocaleTimeString('it-IT')}
                      </p>
                    </div>
                    <div
                      style={{
                        textAlign: 'right',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          color: getModeColor(item.mode),
                          margin: 0,
                        }}
                      >
                        {item.mode === 'carico' || item.mode === 'inventario' ? '+' : '-'}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ScannerPage;
