import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import PriorityBadge from "./PriorityBadge";
import { Link } from "react-router";

const STATUSES = ["OPEN", "IN_PROGRESS", "CLOSED"];

export default function TicketDetail({ ticket, onStatusChange, statusError }) {
  if (!ticket) {
    return <EmptyState message="Select a ticket to view more information." />;
  }

  return (
    <section className="card detail-card">
      <div className="section-heading row-heading">
        <div>
          <h2>{ticket.title}</h2>
          <p>{ticket.category}</p>
        </div>
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
      </div>

      <dl className="detail-list">
        <div>
          <dt>Category</dt>
          <dd>{ticket.category}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd>{ticket.priority}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{ticket.status}</dd>
        </div>
        <div>
          <dt>Created By</dt>
          <dd>{ticket.createdBy}</dd>
        </div>
        <div>
          <dt>Created At</dt>
          <dd>{ticket.createdAt}</dd>
        </div>
      </dl>

      <div className="status-actions" role="group" aria-label="Change ticket status">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            data-status={status}
            className={status === ticket.status ? "status-action active" : "status-action"}
            disabled={status === ticket.status}
            onClick={() => onStatusChange(status)}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      {statusError && <p className="message error-message">{statusError}</p>}

      <div className="action-row">
        <Link className="button-link" to={`/app/tickets/${ticket.id}/edit`}>
          Edit Ticket
        </Link>
      </div>
    </section>
  );
}
