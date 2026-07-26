// import Layout from '../components/Layout';
// import TicketList from '../components/TicketList';
// import { sampleTickets } from '../data/sampleTickets';
// import TicketDetail from '../components/TicketDetail';
// import { useState } from 'react';
// import TicketFilterPanel from '../components/TicketFilterPanel';
// import ApiInfoCard from '../components/ApiInfoCard';

// export default function TicketsPage() {
//   const [tickets] = useState(sampleTickets);
//   const [selectedId, setSelectedId] = useState(sampleTickets[0].id);
//   const [searchText, setSearchText] = useState('');
//   const [statusFilter, setStatusFilter] = useState('ALL');

//   const filteredTickets = tickets.filter((ticket) => {
//     const matchesSearch =
//       ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
//       ticket.category.toLowerCase().includes(searchText.toLowerCase());
//     const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

//   return (
//     <Layout>
//       <ApiInfoCard />
//       <TicketFilterPanel
//         searchText={searchText}
//         statusFilter={statusFilter}
//         onSearchChange={setSearchText}
//         onStatusChange={setStatusFilter}
//       />
//       <TicketList
//         tickets={filteredTickets}
//         selectedTicketId={selectedId}
//         onSelectTicket={(ticket) => setSelectedId(ticket.id)}
//       />
//       <TicketDetail ticket={selectedTicket} />
//     </Layout>
//   );
// }

import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/tickets" element={<TicketsPage />} />
    </Routes>
  );
}
