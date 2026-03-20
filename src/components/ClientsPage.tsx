import React, { useState, useMemo } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockData } from '../data/mockData';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
  onSelectClient: (id: number) => void;
}

type StatusFilter = 'tutti' | 'attivi' | 'inattivi';

const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate, onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('tutti');

  const filteredClients = useMemo(() => {
    let filtered = mockData.clients;

    // Apply status filter
    if (statusFilter === 'attivi') {
      filtered = filtered.filter((c) => c.status === 'active');
    } else if (statusFilter === 'inattivi') {
      filtered = filtered.filter((c) => c.status === 'inactive');
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.code.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  const stats = {
    total: mockData.clients.length,
    active: mockData.clients.filter((c) => c.status === 'active').length,
    inactive: mockData.clients.filter((c) => c.status === 'inactive').length,
    totalStores: mockData.clients.reduce((sum, c) => sum + (mockData.shopifyStores.filter((s) => s.clientId === c.id).length || 0), 0),
  };

  const getMonthlyOrders = (clientId: number) => {
    const client = mockData.clients.find((c) => c.id === clientId);
    if (!client) return 0;
    return mockData.orders.filter((o) => o.clientName === client.name).length;
  };

  const getMonthlyRevenue = (clientId: number) => {
    const client = mockData.clients.find((c) => c.id === clientId);
    if (!client) return 0;
    return mockData.orders
      .filter((o) => o.clientName === client.name)
      .reduce((sum, o) => sum + o.totalAmount, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, padding: `${LAYOUT.padding}px` }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: COLORS.text, margin: 0 }}>
            Gestione Clienti
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: '8px 0 0 0' }}>
            Gestisci i tuoi clienti e i loro ordini
          </p>
        </div>
        <button
          onClick={() => onNavigate('new-client')}
          style={{
            padding: '10px 20px',
            backgroundColor: COLORS.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Nuovo Cliente
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px',
            flex: '1 1 150px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Clienti Totali
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.text }}>{stats.total}</div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px',
            flex: '1 1 150px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Clienti Attivi
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.accent }}>{stats.active}</div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px',
            flex: '1 1 150px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Clienti Inattivi
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#EF4444' }}>{stats.inactive}</div>
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '16px',
            flex: '1 1 150px',
          }}
        >
          <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Store Totali
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#3B82F6' }}>{stats.totalStores}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
            Cerca cliente
          </label>
          <input
            type="text"
            placeholder="Codice, nome o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
            Stato
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            style={{
              padding: '10px 12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <option value="tutti">Tutti</option>
            <option value="attivi">Attivi</option>
            <option value="inattivi">Inattivi</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${COLORS.border}` }}>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Codice
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Nome
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
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
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Ordini Mese
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Fatturato
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px',
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
                    padding: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                  }}
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => {
                  const clientStoreCount = mockData.shopifyStores.filter((s) => s.clientId === client.id).length;
                  const monthlyOrders = getMonthlyOrders(client.id);
                  const monthlyRevenue = getMonthlyRevenue(client.id);

                  return (
                    <tr
                      key={client.id}
                      style={{
                        borderBottom: `1px solid ${COLORS.border}`,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                        {client.code}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: COLORS.text }}>
                        {client.name}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6B7280' }}>
                        {client.email}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: COLORS.text }}>
                        {clientStoreCount}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: COLORS.text }}>
                        {monthlyOrders}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: COLORS.text }}>
                        {formatCurrency(monthlyRevenue)}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: client.status === 'active' ? '#DCFCE7' : '#F3F4F6',
                            color: client.status === 'active' ? '#15803D' : '#6B7280',
                          }}
                        >
                          {client.status === 'active' ? 'Attivo' : 'Inattivo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => onSelectClient(client.id)}
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
                            Dettaglio
                          </button>
                          <button
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#F3F4F6',
                              color: '#6B7280',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '14px',
                              cursor: 'pointer',
                            }}
                          >
                            ✏️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                    Nessun cliente trovato
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

export default ClientsPage;
