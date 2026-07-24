import Layout from './components/Layout';
import TicketList from './components/TicketList';
import { sampleTickets } from './data/sampleTickets';
import TicketDetail from './components/TicketDetail';
import { useState } from 'react';
import './App.css';
import TicketFilterPanel from './components/TicketFilterPanel';

//import AppHeader from './components/AppHeader';

export default function App() {
  const [tickets] = useState(sampleTickets);
  const [selectedId, setSelectedId] = useState(sampleTickets[0].id);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

  return (
    <Layout>
      <TicketFilterPanel
        searchText={searchText}
        statusFilter={statusFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
      />
      <TicketList
        tickets={filteredTickets}
        selectedTicketId={selectedId}
        onSelectTicket={(ticket) => setSelectedId(ticket.id)}
      />
      <TicketDetail ticket={selectedTicket} />
    </Layout>
  );
}