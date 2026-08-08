import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import TicketSummaryCards from './TicketSummaryCards.jsx';
import { sampleTicket } from '../test/testUtils.jsx';

describe('TicketSummaryCards component', () => {
  it('renders summary cards with correct values', () => {
    render(<TicketSummaryCards tickets={sampleTicket} />);

    const summary = screen.getByLabelText('Ticket summary');

    expect(within(summary).getByText('Total Tickets')).toBeInTheDocument();
    expect(within(summary).getByText('Open')).toBeInTheDocument();
    expect(within(summary).getByText('In Progress')).toBeInTheDocument();
    expect(within(summary).getByText('Closed')).toBeInTheDocument();
    expect(within(summary).getByText('3')).toBeInTheDocument(); // Total Tickets
  });
});
