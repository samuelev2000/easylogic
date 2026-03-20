import React, { useState } from 'react';
import { COLORS, LAYOUT } from '../config/theme';
import { mockShipments } from '../data/mockData';

interface TrackingEvent {
  id: string;
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface Shipment {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  courier: string;
  customer: string;
  destination: string;
  estimatedDelivery: string;
  status: 'created' | 'picked-up' | 'in-transit' | 'in-delivery' | 'delivered' | 'anomaly';
  events: TrackingEvent[];
}

interface TrackingPageProps {
  onNavigate: (page: string) => void;
}

const TrackingPage: React.FC<TrackingPageProps> = ({ onNavigate }) => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'in-transit' | 'problematic' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourier, setSelectedCourier] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const shipments: Shipment[] = mockShipments || [
    {
      id: '1',
      trackingNumber: 'IT123456789',
      orderNumber: 'ORD-2024-001',
      courier: 'DHL',
      customer: 'Mario Rossi',
      destination: 'Roma, IT',
      estimatedDelivery: '2026-03-22',
      status: 'in-transit',
      events: [
        {
          id: 'e1',
          date: '2026-03-20',
          time: '14:30',
          status: 'In transito',
          location: 'Centro Smistamento Roma',
          description: 'Il pacco è stato spostato al centro di smistamento locale',
          type: 'info',
        },
        {
          id: 'e2',
          date: '2026-03-19',
          time: '08:15',
          status: 'Ritirato',
          location: 'Magazzino Milano',
          description: 'Il pacco è stato ritirato dal magazzino',
          type: 'success',
        },
        {
          id: 'e3',
          date: '2026-03-18',
          time: '16:45',
          status: 'Creato',
          location: 'Magazzino Milano',
          description: 'Etichetta generata e pacco confezionato',
          type: 'success',
        },
      ],
    },
    {
      id: '2',
      trackingNumber: 'IT123456790',
      orderNumber: 'ORD-2024-002',
      courier: 'GLS',
      customer: 'Anna Bianchi',
      destination: 'Milano, IT',
      estimatedDelivery: '2026-03-21',
      status: 'in-delivery',
      events: [
        {
          id: 'e1',
          date: '2026-03-20',
          time: '09:00',
          status: 'In consegna',
          location: 'Milano',
          description: 'Il pacco è con il corriere per la consegna',
          type: 'info',
        },
        {
          id: 'e2',
          date: '2026-03-19',
          time: '22:30',
          status: 'In transito',
          location: 'Centro Smistamento Milano',
          description: 'Il pacco è arrivato al centro di smistamento locale',
          type: 'info',
        },
      ],
    },
    {
      id: '3',
      trackingNumber: 'IT123456791',
      orderNumber: 'ORD-2024-003',
      courier: 'SDA',
      customer: 'Paolo Verdi',
      destination: 'Firenze, IT',
      estimatedDelivery: '2026-03-23',
      status: 'anomaly',
      events: [
        {
          id: 'e1',
          date: '2026-03-19',
          time: '14:15',
          status: 'Anomalia',
          location: 'Centro Smistamento Firenze',
          description: 'Problema con indirizzo di consegna - contattare il cliente',
          type: 'error',
        },
        {
          id: 'e2',
          date: '2026-03-18',
          time: '11:00',
          status: 'In transito',
          location: 'Centro Smistamento Bologna',
          description: 'Il pacco è in transito',
          type: 'info',
        },
      ],
    },
    {
      id: '4',
      trackingNumber: 'IT123456792',
      orderNumber: 'ORD-2024-004',
      courier: 'Poste',
      customer: 'Lucia Neri',
      destination: 'Napoli, IT',
      estimatedDelivery: '2026-03-20',
      status: 'delivered',
      events: [
        {
          id: 'e1',
          date: '2026-03-20',
          time: '16:20',
          status: 'Consegnato',
          location: 'Napoli',
          description: 'Pacco consegnato al destinatario',
          type: 'success',
        },
        {
          id: 'e2',
          date: '2026-03-20',
          time: '08:30',
          status: 'In consegna',
          location: 'Napoli',
          description: 'Il pacco è con il corriere per la consegna',
          type: 'info',
        },
      ],
    },
    {
      id: '5',
      trackingNumber: 'IT123456793',
      orderNumber: 'ORD-2024-005',
      courier: 'DHL',
      customer: 'Marco Gialli',
      destination: 'Torino, IT',
      estimatedDelivery: '2026-03-21',
      status: 'picked-up',
      events: [
        {
          id: 'e1',
          date: '2026-03-19',
          time: '10:45',
          status: 'Ritirato',
          location: 'Magazzino Torino',
          description: 'Il pacco è stato ritirato dal magazzino',
          type: 'success',
        },
      ],
    },
  ];

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourier = selectedCourier === 'all' || shipment.courier === selectedCourier;
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'in-transit' && ['in-transit', 'picked-up'].includes(shipment.status)) ||
      (activeTab === 'problematic' && shipment.status === 'anomaly') ||
      (activeTab === 'delivered' && shipment.status === 'delivered');

    return matchesSearch && matchesCourier && matchesStatus && matchesTab;
  });

  const stats = [
    { label: 'Creati', value: shipments.filter((s) => s.status === 'created').length, color: '#3B82F6' },
    { label: 'Ritirati', value: shipments.filter((s) => s.status === 'picked-up').length, color: '#8B5CF6' },
    { label: 'In Transito', value: shipments.filter((s) => s.status === 'in-transit').length, color: '#F59E0B' },
    { label: 'In Consegna', value: shipments.filter((s) => s.status === 'in-delivery').length, color: '#3B82F6' },
    { label: 'Consegnati', value: shipments.filter((s) => s.status === 'delivered').length, color: COLORS.accent },
    { label: 'Giacenza/Anomalia', value: shipments.filter((s) => s.status === 'anomaly').length, color: '#EF4444' },
  ];

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
    };

    if (status === 'created') return { ...baseStyle, backgroundColor: '#DBEAFE', color: '#1E40AF' };
    if (status === 'picked-up') return { ...baseStyle, backgroundColor: '#F3E8FF', color: '#6B21A8' };
    if (status === 'in-transit') return { ...baseStyle, backgroundColor: '#FEF3C7', color: '#92400E' };
    if (status === 'in-delivery') return { ...baseStyle, backgroundColor: '#DBEAFE', color: '#1E40AF' };
    if (status === 'delivered') return { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
    if (status === 'anomaly') return { ...baseStyle, backgroundColor: '#FEE2E2', color: '#991B1B' };
    return baseStyle;
  };

  const getStatusLabel = (status: string) => {
    if (status === 'created') return 'Creato';
    if (status === 'picked-up') return 'Ritirato';
    if (status === 'in-transit') return 'In Transito';
    if (status === 'in-delivery') return 'In Consegna';
    if (status === 'delivered') return 'Consegnato';
    if (status === 'anomaly') return 'Anomalia';
    return status;
  };

  const getEventColor = (type: string) => {
    if (type === 'success') return '#10B981';
    if (type === 'error') return '#EF4444';
    if (type === 'warning') return '#F59E0B';
    return '#3B82F6';
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
          Monitoraggio Spedizioni
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
          onClick={() => alert('Aggiornando tracking...')}
        >
          Aggiorna Tracking
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
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
              borderLeft: `4px solid ${stat.color}`,
            }}
          >
            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>
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
            placeholder="Tracking, ordine, cliente..."
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

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
            Stato
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
            <option value="created">Creato</option>
            <option value="picked-up">Ritirato</option>
            <option value="in-transit">In Transito</option>
            <option value="in-delivery">In Consegna</option>
            <option value="delivered">Consegnato</option>
            <option value="anomaly">Anomalia</option>
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
        {(['all', 'in-transit', 'problematic', 'delivered'] as const).map((tab) => {
          const label =
            tab === 'all'
              ? 'Tutte'
              : tab === 'in-transit'
              ? 'In Transito'
              : tab === 'problematic'
              ? 'Problematiche'
              : 'Consegnate';

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

      {/* Two-Panel Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '20px', padding: '0 20px' }}>
        {/* Left Panel: Shipment List */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ overflowY: 'auto', maxHeight: '700px' }}>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment)}
                  style={{
                    padding: '16px',
                    borderBottom: `1px solid ${COLORS.border}`,
                    cursor: 'pointer',
                    backgroundColor:
                      selectedShipment?.id === shipment.id ? '#F0FDF4' : '#FFFFFF',
                    borderLeft:
                      selectedShipment?.id === shipment.id
                        ? `4px solid ${COLORS.accent}`
                        : '4px solid transparent',
                    transition: 'background-color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedShipment?.id !== shipment.id) {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedShipment?.id !== shipment.id) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                      {shipment.trackingNumber}
                    </div>
                    <div style={getStatusBadgeStyle(shipment.status)}>
                      {getStatusLabel(shipment.status)}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                    Ordine: {shipment.orderNumber}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                    {shipment.customer} → {shipment.destination}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    Corriere: {shipment.courier}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    Stima consegna: {shipment.estimatedDelivery}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                Nessuna spedizione trovata
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Tracking Detail */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '8px',
            padding: '20px',
            maxHeight: '700px',
            overflowY: 'auto',
          }}
        >
          {selectedShipment ? (
            <div>
              {/* Shipment Info */}
              <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${COLORS.border}` }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  Informazioni Spedizione
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: '2px' }}>Tracking</div>
                    <div style={{ color: '#111827', fontWeight: 500 }}>{selectedShipment.trackingNumber}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: '2px' }}>Corriere</div>
                    <div style={{ color: '#111827', fontWeight: 500 }}>{selectedShipment.courier}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: '2px' }}>Servizio</div>
                    <div style={{ color: '#111827', fontWeight: 500 }}>Express</div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${COLORS.border}` }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  Destinatario
                </h3>
                <div style={{ fontSize: '13px' }}>
                  <div style={{ color: '#111827', fontWeight: 500, marginBottom: '4px' }}>
                    {selectedShipment.customer}
                  </div>
                  <div style={{ color: '#6B7280' }}>{selectedShipment.destination}</div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${COLORS.border}` }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  Consegna Stimata
                </h3>
                <div style={{ fontSize: '14px', fontWeight: 500, color: COLORS.accent }}>
                  {selectedShipment.estimatedDelivery}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  Cronologia Tracking
                </h3>

                <div style={{ position: 'relative', paddingLeft: '28px' }}>
                  {selectedShipment.events.map((event, idx) => {
                    const isLatest = idx === 0;
                    const color = getEventColor(event.type);

                    return (
                      <div key={event.id} style={{ marginBottom: idx < selectedShipment.events.length - 1 ? '24px' : 0 }}>
                        {/* Vertical Line (only if not last) */}
                        {idx < selectedShipment.events.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '4px',
                              top: '24px',
                              width: '2px',
                              height: '24px',
                              backgroundColor: isLatest ? color : '#E5E7EB',
                            }}
                          />
                        )}

                        {/* Dot */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '-19px',
                            top: '0px',
                            width: '12px',
                            height: '12px',
                            backgroundColor: color,
                            borderRadius: '50%',
                            border: '2px solid #FFFFFF',
                            boxShadow: `0 0 0 2px ${color}`,
                          }}
                        />

                        {/* Event Content */}
                        <div style={{ marginBottom: '2px' }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: color,
                              marginBottom: '4px',
                            }}
                          >
                            {event.status}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                            {event.date} • {event.time}
                          </div>
                          <div style={{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}>
                            {event.location}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>{event.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF',
                fontSize: '14px',
              }}
            >
              Seleziona una spedizione per visualizzare i dettagli
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
