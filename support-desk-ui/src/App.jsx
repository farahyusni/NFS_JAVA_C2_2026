import Layout from './components/Layout';
import TicketList from './components/TicketList';
import { sampleTickets } from './data/sampleTickets';
import TicketDetail from './components/TicketDetail';
import { useState } from 'react';
import './App.css';

//import AppHeader from './components/AppHeader';

export default function App() {
  const [tickets] = useState(sampleTickets);
  const [selectedId, setSelectedId] = useState(sampleTickets[0].id);
  
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

  return (
    <Layout>
      <TicketList
        tickets={tickets}
        selectedTicketId={selectedId}
        onSelectTicket={(ticket) => setSelectedId(ticket.id)}
      />
      <TicketDetail ticket={selectedTicket} />
    </Layout>
  );
}