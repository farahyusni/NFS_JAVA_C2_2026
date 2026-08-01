import TicketList from '../components/TicketList';
import TicketDetail from '../components/TicketDetail';
import TicketFilterPanel from '../components/TicketFilterPanel';
import ApiInfoCard from '../components/ApiInfoCard';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import { useTicketData } from '../context/TicketDataContext';

export default function TicketsPage() {
  const {
    filteredTickets,
    selectedTicket,
    selectedId,
    loading,
    error,
    searchText,
    statusFilter,
    setSearchText,
    setStatusFilter,
    selectTicket
  } = useTicketData();

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
        onSelectTicket={(ticket) => selectTicket(ticket.id)}
      />
      <TicketDetail ticket={selectedTicket} />
    </>
  );
}
