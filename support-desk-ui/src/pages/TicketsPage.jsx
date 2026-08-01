import TicketList from "../components/TicketList";
import TicketDetail from "../components/TicketDetail";
import TicketFilterPanel from "../components/TicketFilterPanel";
import ApiInfoCard from "../components/ApiInfoCard";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useTicketData } from "../context/TicketDataContext";

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
    selectTicket,
    page,
    pageSize,
    sortBy,
    direction,
    totalPages,
    nextPage,
    prevPage,
    setPageSize,
    setSortBy,
    setSortDirection,
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
      <section className="pagination-controls" aria-label="Ticket pagination">
        <div className="page-nav">
          <button type="button" onClick={prevPage} disabled={page === 0}>
            Previous
          </button>
          <span className="page-status">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={nextPage}
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>

        <label>
          Page size
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Created date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </label>

        <label>
          Direction
          <select
            value={direction}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </section>

      <TicketList
        tickets={filteredTickets}
        selectedTicketId={selectedId}
        onSelectTicket={(ticket) => selectTicket(ticket.id)}
      />
      <TicketDetail ticket={selectedTicket} />
    </>
  );
}
