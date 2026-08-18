import { NavLink, Outlet } from 'react-router';

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Support Desk</h1>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/tickets">Tickets</NavLink>
        <NavLink to="/app/reports">Reports</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
