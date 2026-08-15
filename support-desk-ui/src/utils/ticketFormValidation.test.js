import { describe, it, expect } from 'vitest';
import {
  validateTicketFormStep,
  normalizeTicketFormPayload,
  formatTicketFormLabel
} from './ticketFormValidation';

const emptyFormValues = {
  title: '',
  description: '',
  category: '',
  priority: '',
  status: ''
};

describe('validateTicketFormStep', () => {
  it('reports missing required fields on step 1', () => {
    const errors = validateTicketFormStep(emptyFormValues, 1, false, false);

    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
    expect(errors.category).toBe('Category is required.');
  });

  it('treats whitespace-only fields as missing, not just empty strings', () => {
    const errors = validateTicketFormStep(
      { ...emptyFormValues, title: '   ', description: '   ', category: '   ' },
      1,
      false,
      false
    );

    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
    expect(errors.category).toBe('Category is required.');
  });

  it('requires a valid priority on step 2 but ignores status in create mode', () => {
    const errors = validateTicketFormStep(
      { ...emptyFormValues, priority: 'URGENT', status: 'BOGUS' },
      2,
      false,
      false
    );

    expect(errors.priority).toBe('Choose a valid priority.');
    expect(errors.status).toBeUndefined();
  });

  it('also validates status on step 2 in edit mode', () => {
    const errors = validateTicketFormStep(
      { ...emptyFormValues, priority: 'HIGH', status: 'BOGUS' },
      2,
      false,
      true
    );

    expect(errors.status).toBe('Choose a valid status.');
  });

  it('blocks step 3 when the review checkbox is unchecked', () => {
    const errors = validateTicketFormStep(emptyFormValues, 3, false, false);

    expect(errors.review).toBe('Please confirm that you reviewed the ticket details.');
  });

  it('passes step 3 when the review checkbox is checked', () => {
    const errors = validateTicketFormStep(emptyFormValues, 3, true, false);

    expect(errors).toEqual({});
  });
});

describe('normalizeTicketFormPayload', () => {
  it('trims text fields and keeps priority/status as-is', () => {
    expect(normalizeTicketFormPayload({
      title: '  Printer jam  ',
      description: '  Paper stuck  ',
      category: ' Hardware ',
      priority: 'HIGH',
      status: 'OPEN'
    })).toEqual({
      title: 'Printer jam',
      description: 'Paper stuck',
      category: 'Hardware',
      priority: 'HIGH',
      status: 'OPEN'
    });
  });

  it('leaves already-clean values unchanged', () => {
    const clean = {
      title: 'Printer jam',
      description: 'Paper stuck',
      category: 'Hardware',
      priority: 'HIGH',
      status: 'OPEN'
    };

    expect(normalizeTicketFormPayload(clean)).toEqual(clean);
  });
});

describe('formatTicketFormLabel', () => {
  it('converts camelCase keys into readable labels', () => {
    expect(formatTicketFormLabel('title')).toBe('Title');
    expect(formatTicketFormLabel('createdBy')).toBe('Created By');
  });
});
