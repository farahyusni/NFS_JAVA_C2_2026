import { apiRequest } from './httpClient.js';

export function fetchApiInfo() {
  return apiRequest('/api/v1/info');
}

export function loginRequest(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password }
  });
}

export function createTicket(token, payload) {
  return apiRequest('/api/v1/tickets', {
    method: 'POST',
    token,
    body: payload
  });
}

export function updateTicket(id, token, payload) {
  return apiRequest(`/api/v1/tickets/${id}`, {
    method: 'PUT',
    token,
    body: payload
  });
}

export function fetchTicketById(id, token) {
  return apiRequest(`/api/v1/tickets/${id}`, { token });
}

export function fetchTickets(token) {
  return apiRequest('/api/v1/tickets', { token });
}
