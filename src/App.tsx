import { useState } from 'react';
import { COLORS, LAYOUT } from './config/theme';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import DashboardPage from './components/DashboardPage';
import ClientsPage from './components/ClientsPage';
import ClientDetailPage from './components/ClientDetailPage';
import { StoresPage } from './components/StoresPage';
import { StoreDetailPage } from './components/StoreDetailPage';
import { OrdersPage } from './components/OrdersPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { CODPage } from './components/CODPage';
import LabelsPage from './components/LabelsPage';
import TrackingPage from './components/TrackingPage';
import WarehousePage from './components/WarehousePage';
import ProductDetailPage from './components/ProductDetailPage';
import ScannerPage from './components/ScannerPage';
import { UsersPage } from './components/UsersPage';
import { SettingsPage } from './components/SettingsPage';

type Page =
  | 'login'
  | 'dashboard'
  | 'clients'
  | 'clientDetail'
  | 'stores'
  | 'storeDetail'
  | 'orders'
  | 'orderDetail'
  | 'cod'
  | 'labels'
  | 'tracking'
  | 'warehouse'
  | 'productDetail'
  | 'scanner'
  | 'users'
  | 'settings';

const pageConfig: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Panoramica generale' },
  clients: { title: 'Clienti', subtitle: 'Gestione clienti logistica' },
  clientDetail: { title: 'Dettaglio Cliente' },
  stores: { title: 'Store Shopify', subtitle: 'Gestione store collegati' },
  storeDetail: { title: 'Dettaglio Store' },
  orders: { title: 'Ordini', subtitle: 'Gestione ordini e-commerce' },
  orderDetail: { title: 'Dettaglio Ordine' },
  cod: { title: 'Contrassegni', subtitle: 'Gestione pagamenti alla consegna' },
  labels: { title: 'Etichette', subtitle: 'Generazione e stampa etichette' },
  tracking: { title: 'Tracking', subtitle: 'Monitoraggio spedizioni' },
  warehouse: { title: 'Magazzino', subtitle: 'Gestione stock e inventario' },
  productDetail: { title: 'Dettaglio Prodotto' },
  scanner: { title: 'Scanner', subtitle: 'Scansione barcode magazzino' },
  users: { title: 'Utenti e Permessi', subtitle: 'Gestione accessi' },
  settings: { title: 'Impostazioni', subtitle: 'Configurazione piattaforma' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'operator'>('admin');
  const [userName, setUserName] = useState('');

  const handleLogin = (email: string, _password: string) => {
    setIsLoggedIn(true);
    const isAdmin = email.toLowerCase().includes('admin');
    setUserRole(isAdmin ? 'admin' : 'operator');
    setUserName(isAdmin ? 'Marco Bianchi' : 'Giulia Rossi');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    setSelectedId(null);
  };

  const handleNavigate = (page: string, id?: number | null) => {
    setCurrentPage(page as Page);
    if (id !== undefined && id !== null) {
      setSelectedId(id);
    }
  };

  const handleSelectClient = (id: number) => {
    setSelectedId(id);
    setCurrentPage('clientDetail');
  };

  const handleSelectStore = (id: number) => {
    setSelectedId(id);
    setCurrentPage('storeDetail');
  };

  const handleSelectOrder = (id: number) => {
    setSelectedId(id);
    setCurrentPage('orderDetail');
  };

  const handleSelectProduct = (id: number) => {
    setSelectedId(id);
    setCurrentPage('productDetail');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const config = pageConfig[currentPage] || { title: 'EasyLogic' };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: COLORS.bg }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <div
        style={{
          marginLeft: LAYOUT.sidebarWidth,
          width: `calc(100% - ${LAYOUT.sidebarWidth}px)`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <TopBar
          title={config.title}
          subtitle={config.subtitle}
          notificationCount={5}
          userName={userName}
        />

        <div
          style={{
            marginTop: LAYOUT.topBarHeight,
            flex: 1,
            overflowY: 'auto',
            backgroundColor: COLORS.bg,
          }}
        >
          {currentPage === 'dashboard' && (
            <DashboardPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'clients' && (
            <ClientsPage onNavigate={handleNavigate} onSelectClient={handleSelectClient} />
          )}
          {currentPage === 'clientDetail' && selectedId && (
            <ClientDetailPage
              clientId={selectedId}
              onNavigate={handleNavigate}
              onBack={() => setCurrentPage('clients')}
            />
          )}
          {currentPage === 'stores' && (
            <StoresPage onNavigate={handleNavigate} onSelectStore={handleSelectStore} />
          )}
          {currentPage === 'storeDetail' && selectedId && (
            <StoreDetailPage
              storeId={selectedId}
              onBack={() => setCurrentPage('stores')}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'orders' && (
            <OrdersPage onNavigate={handleNavigate} onSelectOrder={handleSelectOrder} />
          )}
          {currentPage === 'orderDetail' && selectedId && (
            <OrderDetailPage
              orderId={selectedId}
              onBack={() => setCurrentPage('orders')}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'cod' && (
            <CODPage onNavigate={handleNavigate} onSelectOrder={handleSelectOrder} />
          )}
          {currentPage === 'labels' && (
            <LabelsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'tracking' && (
            <TrackingPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'warehouse' && (
            <WarehousePage onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />
          )}
          {currentPage === 'productDetail' && selectedId && (
            <ProductDetailPage
              productId={selectedId}
              onBack={() => setCurrentPage('warehouse')}
            />
          )}
          {currentPage === 'scanner' && (
            <ScannerPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'users' && (
            <UsersPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'settings' && (
            <SettingsPage onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </div>
  );
}
