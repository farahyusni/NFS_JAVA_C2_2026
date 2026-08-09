import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFormWizard from './TicketFormWizard';

describe('TicketFormWizard', () => {
  it('shows inline validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<TicketFormWizard onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TicketFormWizard onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Title'), 'Cannot access email');
    await user.type(screen.getByLabelText('Description'), 'Locked out of inbox');
    await user.type(screen.getByLabelText('Category'), 'Email');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Step 2: priority/status are already valid defaults in create mode
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Step 3
    await user.click(screen.getByLabelText('I have reviewed the ticket details and they are ready to submit.'));
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Cannot access email',
      description: 'Locked out of inbox',
      category: 'Email',
      priority: 'LOW',
      status: 'OPEN'
    });
  });

  it('shows a saving state on the submit button while submitting', async () => {
    const user = userEvent.setup();
    render(<TicketFormWizard onSubmit={vi.fn()} saving={true} />);

    await user.type(screen.getByLabelText('Title'), 'Cannot access email');
    await user.type(screen.getByLabelText('Description'), 'Locked out of inbox');
    await user.type(screen.getByLabelText('Category'), 'Email');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    const submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
