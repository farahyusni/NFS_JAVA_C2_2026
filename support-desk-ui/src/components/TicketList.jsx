import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import EmptyState from "./EmptyState";

export default function TicketList({
  tickets,
  selectedTicketId,
  onSelectTicket,
}) {
  if (tickets.length === 0) {
    return <EmptyState message="No tickets found." />;
  }

  return (
    <section className="card list-card">
      <div className="section-heading">
        <h2>Ticket List</h2>
        <p>Select a ticket to view details.</p>
      </div>

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            className={
              ticket.id === selectedTicketId
                ? "ticket-row selected"
                : "ticket-row"
            }
            onClick={() => onSelectTicket(ticket)}
            type="button"
          >
            <div>
              <strong>{ticket.title}</strong>
              <span>{ticket.category}</span>
            </div>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </button>
        ))}
      </div>
    </section>
  );
}
