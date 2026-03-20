import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockLabels, mockCouriers } from '../data/mockData';

interface LabelRecord {
  id: string;
  orderNumber: string;
  tracking: string;
  courier: string;
  recipient: string;
  destination: string;
  status: 'generated' | 'printed' | 'error';
  generationDate: string;
  printDate: string | null;
}

interface LabelsPageProps {
  onNavigate: (page: string) => void;
}

const LabelsPage: React.FC<LabelsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'printed' | 'error'>('all');
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'generated' | 'printed' | 'error'>('all');
  const [selectedCourier, setSelectedCourier] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const labels: LabelRecord[] = mockLabels || [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      tracking: 'IT123456789',
      courier: 'DHL',
      recipient: 'Mario Rossi',
      destination: 'Roma, IT',
      status: 'generated',
      generationDate: '2026-03-18',
      printDate: null,
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      tracking: 'IT123456790',
      courier: 'GLS',
      recipient: 'Anna Bianchi',
      destination: 'Milano, IT',
      status: 'printed',
      generationDate: '2026-03-17',
      printDate: '2026-03-18',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      tracking: 'IT123456791',
      courier: 'SDA',
      recipient: 'Paolo Verdi',
      destination: 'Firenze, IT',
      status: 'error',
      generationDate: '2026-03-16',
      printDate: null,
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      tracking: 'IT123456792',
      courier: 'Poste',
      recipient: 'Lucia Neri',
      destination: 'Napoli, IT',
      status: 'generated',
      generationDate: '2026-03-19',
      printDate: null,
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      tracking: 'IT123456793',
      courier: 'DHL',
      recipient: 'Marco Gialli',
      destination: 'Torino, IT',
      status: 'printed',
      generationDate: '2026-03-15',
      printDate: '2026-03-17',
    },
  ];

  const filteredLabels = labels.filter((label) => {
    const matchesSearch =
      label.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.tracking.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.recipient.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || label.status === statusFilter;

    const matchesCourier = selectedCourier === 'all' || label.courier === selectedCourier;

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && label.status === 'generated') ||
      (activeTab === 'printed' && label.status === 'printed') ||
      (activeTab === 'error' && label.status === 'error');

    return matchesSearch && matchesStatus && matchesCourier && matchesTab;
  });

  const stats = [
    {
      label: 'Totale Generate',
      value: labels.filter((l) => l.status === 'generated' || l.status === 'printed').length,
      accent: COLORS.accent,
    },
    {
      label: 'Da Stampare',
      value: labels.filter((l) => l.status === 'generated').length,
      accent: '#3B82F6',
    },
    {
      label: 'Stampate',
      value: labels.filter((l) => l.status === 'printed').length,
      accent: COLORS.accent,
    },
    {
      label: 'Errori',
      value: labels.filter((l) => l.status === 'error').length,
      accent: '#EF4444',
    },
  ];

  const toggleLabelSelection = (id: string) => {
    const newSelected = new Set(selectedLabels);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLabels(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedLabels.size === filteredLabels.length) {
      setSelectedLabels(new Set());
    } else {
      setSelectedLabels(new Set(filteredLabels.map((l) => l.id)));
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    const baseStyle = {
      display: 'inline-block',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '4px',
      paddingBottom: '4px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'capitalize' as const,
    };

    if (status === 'generated')
      return { ...baseStyle, backgroundColor: '#DBEAFE', color: '#1E40AF' };
    if (status === 'printed')
      return { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
    if (status === 'error')
      return { ...baseStyle, backgroundColor: '#FEE2E2', color: '#991B1B' };
    return baseStyle;
  };

  const getStatusLabel = (status: string) => {
    if (status === 'generated') return 'Generata';
    if (status === 'printed') return 'Stampata';
    if (status === 'error') return 'Errore';
    return status;
  };

  return (
    <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: `1px solid ${COLORS.border}`,
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#111827' }}>
          Gestione Etichette
        </h1>
        <button
          style={{
            backgroundColor: COLORS.accent,
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.accent;
          }}
          onClick={() => alert('Genera etichette massive')}
        >
          Genera Etichette Massive
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          padding: '0 20px',
          marginBottom: '24px',
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: '16px',
              borderLeft: `4px solid ${stat.accent}`,
            }}
          >
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.accent }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          marginLeft: '20px',
          marginRight: '20px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '12px',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
            Ricerca
          </label>
          <input
            type="text"
            placeholder="Ordine, tracking, destinatario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
            Stato
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="all">Tutte</option>
            <option value="generated">Generate</option>
            <option value="printed">Stampate</option>
            <option value="error">Errori</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
            Dal
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
            Corriere
          </label>
          <select
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="all">Tutti</option>
            <option value="DHL">DHL</option>
            <option value="GLS">GLS</option>
            <option value="SDA">SDA</option>
            <option value="Poste">Poste</option>
          </select>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          borderBottom: `1px solid ${COLORS.border}`,
          paddingLeft: '20px',
          paddingRight: '20px',
          marginBottom: '16px',
          backgroundColor: '#FFFFFF',
          marginLeft: '20px',
          marginRight: '20px',
          borderRadius: '8px 8px 0 0',
        }}
      >
        {(['all', 'pending', 'printed', 'error'] as const).map((tab) => {
          const label =
            tab === 'all'
              ? 'Tutte'
              : tab === 'pending'
              ? 'Da Stampare'
              : tab === 'printed'
              ? 'Stampate'
              : 'Errori';

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? COLORS.accent : '#6B7280',
                borderBottom: activeTab === tab ? `2px solid ${COLORS.accent}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#6B7280';
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Table Container */}
      <div
        style={{
          marginLeft: '20px',
          marginRight: '20px',
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
        }}
      >
        {/* Bulk Actions Bar */}
        {selectedLabels.size > 0 && (
          <div
            style={{
              backgroundColor: '#F3F4F6',
              borderBottom: `1px solid ${COLORS.border}`,
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {selectedLabels.size} etichette selezionate
            </span>
            <button
              style={{
                backgroundColor: COLORS.accent,
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.accent;
              }}
              onClick={() => alert(`Stampando ${selectedLabels.size} etichette...`)}
            >
              Stampa Selezionate
            </button>
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${COLORS.border}` }}>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedLabels.size === filteredLabels.length && filteredLabels.length > 0}
                    onChange={toggleAllSelection}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  #Ordine
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Tracking
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Corriere
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Destinatario
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Destinazione
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Stato
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Data Generazione
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Data Stampa
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#6B7280',
                    fontSize: '12px',
                  }}
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLabels.length > 0 ? (
                filteredLabels.map((label, idx) => (
                  <tr
                    key={label.id}
                    style={{
                      borderBottom: `1px solid ${COLORS.border}`,
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '12px 16px', textAlign: 'left' }}>
                      <input
                        type="checkbox"
                        checked={selectedLabels.has(label.id)}
                        onChange={() => toggleLabelSelection(label.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#111827', fontWeight: 500 }}>
                      {label.orderNumber}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.tracking}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.courier}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.recipient}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.destination}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left' }}>
                      <div style={getStatusBadgeStyle(label.status)}>
                        {getStatusLabel(label.status)}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.generationDate}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280' }}>
                      {label.printDate || '-'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {label.status === 'generated' && (
                          <button
                            style={{
                              backgroundColor: COLORS.accent,
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#059669';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = COLORS.accent;
                            }}
                            onClick={() => alert(`Stampando etichetta ${label.orderNumber}...`)}
                          >
                            Stampa
                          </button>
                        )}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Scaricando PDF per ${label.orderNumber}...`);
                          }}
                          style={{
                            color: COLORS.accent,
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#059669';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = COLORS.accent;
                          }}
                        >
                          Download PDF
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Mostrando anteprima per ${label.orderNumber}...`);
                          }}
                          style={{
                            color: COLORS.accent,
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#059669';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = COLORS.accent;
                          }}
                        >
                          Anteprima
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                    Nessuna etichetta trovata
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabelsPage;
