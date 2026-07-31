import { useEffect, useState } from 'react';
import TicketList from '../components/TicketList';
import TicketDetail from '../components/TicketDetail';
import TicketFilterPanel from '../components/TicketFilterPanel';
import ApiInfoCard from '../components/ApiInfoCard';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';
import { fetchTickets } from '../services/api';

export default function TicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchTickets(token);

        if (!ignore) {
          setTickets(data);
          setSelectedId(data[0]?.id ?? null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load tickets.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId);

  if (loading) {
    return <LoadingMessage message="Loading tickets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ApiInfoCard />
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
    </>
  );
}
