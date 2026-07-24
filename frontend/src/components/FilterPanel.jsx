export default function FilterPanel({ searchText, statusFilter, onSearchChange, onStatusChange }) {
<<<<<<< HEAD
    return (
        <section className="filter-panel">
            <label>
                Search assets
                <input
                    type="text"
                    placeholder="Search by asset tag, name, category, or location"
                    value={searchText}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </label>

            <label>
                Status
                <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} >
                    <option value="ALL">All</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>
            </label>
        </section>
    )
}
=======
  return (
    <section className="filter-panel" aria-label="Asset filters">
      <label>
        Search assets
        <input
          type="search"
          placeholder="Search by tag, name, category or location"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="ALL">All</option>
          <option value="AVAILABLE">Available</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
      </label>
    </section>
  );
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
