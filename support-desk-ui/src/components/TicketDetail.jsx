import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import PriorityBadge from './PriorityBadge';

export default function TicketDetail({ ticket }) {
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
        </section>
    );
}