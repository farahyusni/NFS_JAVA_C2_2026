<<<<<<< HEAD
import { countByStatus } from "../utils/assets.js";

export default function SummaryCards({ assets }) {
    const total = assets.length;
    const available = countByStatus(assets, 'AVAILABLE');
    const assigned = countByStatus(assets, 'ASSIGNED');
    const maintenance = countByStatus(assets, 'MAINTENANCE');

    return (
        <section className="summary-grid" aria-label="Asset summary">
            <SummaryCards label="Total Assets" value={total} />
            <SummaryCards label="Available" value={available} />
            <SummaryCards label="Assigned" value={assigned} />
            <SummaryCards label="Maintenance" value={maintenance} />
        </section>
    );
}

function SummaryCards({ label, value }) {
    return (
        <article className="summary-card">
            <p>{label}</p>
            <strong>{value}</strong>
        </article>
    );
}
=======
import { countByStatus } from '../utils/assets.js';

export default function SummaryCards({ assets }) {
  const total = assets.length;
  const available = countByStatus(assets, 'AVAILABLE');
  const assigned = countByStatus(assets, 'ASSIGNED');
  const maintenance = countByStatus(assets, 'MAINTENANCE');

  return (
    <section className="summary-grid" aria-label="Asset summary">
      <SummaryCard label="Total Assets" value={total} />
      <SummaryCard label="Available" value={available} />
      <SummaryCard label="Assigned" value={assigned} />
      <SummaryCard label="Maintenance" value={maintenance} />
    </section>
  );
}

function SummaryCard({ label, value }) {
  return (
    <article className="summary-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
