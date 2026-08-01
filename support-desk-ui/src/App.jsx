import { Routes, Route } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';
import TicketFormPage from './pages/TicketFormPage';
import ReportsPage from './pages/ReportsPage';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { TicketDataProvider } from './context/TicketDataContext.jsx';


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<ProtectedRoute> <AppShell /> </ProtectedRoute>} >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tickets" element={<TicketDataProvider><TicketsPage /></TicketDataProvider>} />
        <Route path="tickets/new" element={<TicketFormPage />} />
        <Route path="tickets/:ticketId/edit" element={<TicketFormPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}
