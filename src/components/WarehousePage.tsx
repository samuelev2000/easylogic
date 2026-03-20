import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { products, inventoryMovements } from '../data/mockData';

interface WarehousePageProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (id: number) => void;
}

type TabType = 'products' | 'low_stock' | 'out_of_stock' | 'movements';
type StatusFilter = 'tutti' | 'in_stock' | 'low_stock' | 'out_of_stock';

const WarehousePage: React.FC<WarehousePageProps> = ({ onNavigate, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('tutti');

  // Get unique stores and clients from products
  const stores = ['all', ...new Set(products.map((p) => p.store))];
  const clients = ['all', ...new Set(products.map((p) => p.client))];

  // Calculate stats
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.status === 'in_stock').length;
  const lowStockCount = products.filter((p) => p.status === 'low_stock').length;
  const outOfStockCount = products.filter((p) => p.status === 'out_of_stock').length;

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStore = selectedStore === 'all' || product.store === selectedStore;
      const matchesClient = selectedClient === 'all' || product.client === selectedClient;
      const matchesStatus =
        statusFilter === 'tutti' || product.status === statusFilter;

      return matchesSearch && matchesStore && matchesClient && matchesStatus;
    });
  }, [searchTerm, selectedStore, selectedClient, statusFilter]);

  // Filter by tab
  const tabFilteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'low_stock':
        return filteredProducts.filter((p) => p.status === 'low_stock');
      case 'out_of_stock':
        return filteredProducts.filter((p) => p.status === 'out_of_stock');
      default:
        return filteredProducts;
    }
  }, [filteredProducts, activeTab]);

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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: LAYOUT.spacing.lg,
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: COLORS.text,
            margin: 0,
          }}
        >
          Gestione Magazzino
        </h1>
        <div style={{ display: 'flex', gap: LAYOUT.spacing.md }}>
          <button
            onClick={() => onNavigate('warehouse')}
            style={{
              padding: '10px 20px',
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
            + Carico Merce
          </button>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: COLORS.success,
              border: `2px solid ${COLORS.success}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F0FDF4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ↓ Esporta Inventario
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: LAYOUT.spacing.md,
          marginBottom: LAYOUT.spacing.lg,
        }}
      >
        {[
          { label: 'Totale Prodotti', value: totalProducts, color: COLORS.text },
          { label: 'In Stock', value: inStockCount, color: COLORS.success },
          {
            label: 'Sotto Scorta',
            value: lowStockCount,
            color: '#F59E0B',
          },
          { label: 'Esauriti', value: outOfStockCount, color: COLORS.error },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: LAYOUT.spacing.md,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: COLORS.textSecondary,
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: stat.color,
                margin: 0,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: 'white',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '8px',
          padding: LAYOUT.spacing.md,
          marginBottom: LAYOUT.spacing.lg,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: LAYOUT.spacing.md,
        }}
      >
        <input
          type="text"
          placeholder="Cerca per Nome, SKU, Barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        />
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          {stores.map((store) => (
            <option key={store} value={store}>
              {store === 'all' ? 'Tutti i Store' : store}
            </option>
          ))}
        </select>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          {clients.map((client) => (
            <option key={client} value={client}>
              {client === 'all' ? 'Tutti i Clienti' : client}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          style={{
            padding: '10px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="tutti">Tutti gli Stati</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Sotto Scorta</option>
          <option value="out_of_stock">Esaurito</option>
        </select>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: LAYOUT.spacing.md,
          marginBottom: LAYOUT.spacing.lg,
          borderBottom: `2px solid ${COLORS.border}`,
        }}
      >
        {[
          { id: 'products' as TabType, label: 'Tutti i Prodotti' },
          { id: 'low_stock' as TabType, label: 'Sotto Scorta' },
          { id: 'out_of_stock' as TabType, label: 'Esauriti' },
          { id: 'movements' as TabType, label: 'Movimenti' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 0',
              marginBottom: '-2px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom:
                activeTab === tab.id ? `3px solid ${COLORS.success}` : 'none',
              color: activeTab === tab.id ? COLORS.success : COLORS.textSecondary,
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Table */}
      {activeTab !== 'movements' && (
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
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
              <tr
                style={{
                  backgroundColor: '#F9FAFB',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                {[
                  'Immagine',
                  'Nome Prodotto',
                  'SKU',
                  'Barcode',
                  'Store / Cliente',
                  'Disponibile',
                  'Riservata',
                  'In Arrivo',
                  'Minimo',
                  'Stato',
                  'Azioni',
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: COLORS.textSecondary,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabFilteredProducts.map((product, idx) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                    backgroundColor: idx % 2 === 0 ? 'white' : '#FAFBFC',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#F3F4F6')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? 'white' : '#FAFBFC')
                  }
                >
                  <td style={{ padding: '12px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontWeight: '500',
                      color: COLORS.text,
                    }}
                  >
                    {product.name}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: COLORS.textSecondary,
                      backgroundColor: '#F9FAFB',
                      borderRadius: '4px',
                    }}
                  >
                    {product.sku}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontSize: '12px',
                      color: COLORS.textSecondary,
                    }}
                  >
                    {product.barcode}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontSize: '13px',
                      color: COLORS.text,
                    }}
                  >
                    <div>{product.store}</div>
                    <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>
                      {product.client}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontWeight: '600',
                      color: getStatusColor(product.status),
                    }}
                  >
                    {product.available}
                  </td>
                  <td style={{ padding: '12px', color: COLORS.text }}>
                    {product.reserved}
                  </td>
                  <td style={{ padding: '12px', color: COLORS.text }}>
                    {product.incoming}
                  </td>
                  <td style={{ padding: '12px', color: COLORS.textSecondary }}>
                    {product.minimum}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: getStatusColor(product.status) + '20',
                        color: getStatusColor(product.status),
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        onClick={() => onSelectProduct(product.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: COLORS.success,
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
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
                        Dettaglio
                      </button>
                      <button
                        style={{
                          width: '28px',
                          height: '28px',
                          padding: 0,
                          backgroundColor: '#ECFDF5',
                          color: COLORS.success,
                          border: `1px solid ${COLORS.success}`,
                          borderRadius: '4px',
                          fontSize: '16px',
                          fontWeight: '600',
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
                      <button
                        style={{
                          width: '28px',
                          height: '28px',
                          padding: 0,
                          backgroundColor: '#FEF3C7',
                          color: '#F59E0B',
                          border: `1px solid #F59E0B`,
                          borderRadius: '4px',
                          fontSize: '16px',
                          fontWeight: '600',
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Movements Table */}
      {activeTab === 'movements' && (
        <div
          style={{
            backgroundColor: 'white',
            border: `1px solid ${COLORS.border}`,
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
              <tr
                style={{
                  backgroundColor: '#F9FAFB',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                {['Data', 'Prodotto', 'SKU', 'Tipo', 'Quantità', 'Motivo', 'Eseguito da'].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: COLORS.textSecondary,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {inventoryMovements.map((movement, idx) => {
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
                    <td
                      style={{
                        padding: '12px',
                        color: COLORS.textSecondary,
                        fontSize: '13px',
                      }}
                    >
                      {new Date(movement.date).toLocaleDateString('it-IT')}
                    </td>
                    <td style={{ padding: '12px', fontWeight: '500', color: COLORS.text }}>
                      {movement.productName}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: COLORS.textSecondary,
                      }}
                    >
                      {movement.sku}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          backgroundColor: typeColors[movement.type] + '20',
                          color: typeColors[movement.type],
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {typeLabels[movement.type]}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px',
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
                    <td style={{ padding: '12px', color: COLORS.textSecondary, fontSize: '13px' }}>
                      {movement.reason}
                    </td>
                    <td style={{ padding: '12px', color: COLORS.text, fontSize: '13px' }}>
                      {movement.performedBy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WarehousePage;
