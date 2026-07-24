export default function StatusBadge({ status }) {
<<<<<<< HEAD
    return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
}
=======
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
