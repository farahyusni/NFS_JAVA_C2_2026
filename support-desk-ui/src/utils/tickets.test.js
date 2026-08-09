import { describe, it, expect } from 'vitest';
import { filterTickets } from './tickets';
import { sampleTicket } from '../test/testUtils.jsx';

describe('ticket filter utility', () => {
  it('filters tickets by search text', () => {
    const result = filterTickets(sampleTicket, 'monitor', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T003');
  });

  it('filters tickets by status', () => {
    const result = filterTickets(sampleTicket, '', 'IN_PROGRESS');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T002');
  });

  it('filters tickets by search text and status together', () => {
    const result = filterTickets(sampleTicket, 'hardware', 'OPEN');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T001');
  });

  it('returns all tickets when search is empty and status is ALL', () => {
    const result = filterTickets(sampleTicket, '', 'ALL');

    expect(result).toHaveLength(3);
  });
});
