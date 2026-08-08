import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export const sampleTicket = [
    {
        id: 'T001',
        title: 'Laptop will not power on',
        description: 'Dell Latitude 5440 does not turn on after update',
        category: 'Hardware',
        priority: 'HIGH',
        status: 'OPEN',
        createdBy: 'user@example.com',
        createdAt: '2026-08-01T09:00:00'
    },
    {
        id: 'T002',
        title: 'Cannot access shared drive',
        description: 'Permission denied on \\\\fileserver\\team',
        category: 'Network',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        createdBy: 'user2@example.com',
        createdAt: '2026-08-02T11:30:00'        
    },
    {
        id: 'T003',
        title: 'Monitor flickering',
        description: 'Samsung monitor flickers intermittently',
        category: 'Hardware',
        priority: 'LOW',
        status: 'RESOLVED',
        createdBy: 'user3@example.com',
        createdAt: '2026-08-03T14:15:00'
    }
];

export function renderWithRouter(ui, options = {}) {
  const { route = '/', ...renderOptions } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>,
    renderOptions
  );
}

export function storeAdminAuth() {
  localStorage.setItem('supportDeskAuth', JSON.stringify({
    token: 'test-admin-token',
    tokenType: 'Bearer',
    expiresInMinutes: 60,
    user: {
      id: 'U001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN'
    }
  }));
}

export function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
