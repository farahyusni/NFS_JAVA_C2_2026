import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from './AuthContext.jsx';
import { fetchTickets } from '../services/api.js';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedId: null,
  loading: true,
  error: '',
  page: { number: 0, totalPages: 1 },
  filters: { searchText: '', statusFilter: 'ALL' }
};

function ticketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        tickets: action.payload,
        selectedId: action.payload[0]?.id ?? null
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.payload } };
    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, statusFilter: action.payload } };
    case 'SELECT_TICKET':
      return { ...state, selectedId: action.payload };
    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      dispatch({ type: 'LOAD_START' });
      try {
        const data = await fetchTickets(token);
        if (!ignore) {
          dispatch({ type: 'LOAD_SUCCESS', payload: data });
        }
      } catch (err) {
        if (!ignore) {
          dispatch({ type: 'LOAD_ERROR', payload: err.message || 'Could not load tickets.' });
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  const filteredTickets = state.tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(state.filters.searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(state.filters.searchText.toLowerCase());
    const matchesStatus = state.filters.statusFilter === 'ALL' || ticket.status === state.filters.statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = state.tickets.find((ticket) => ticket.id === state.selectedId);

  const value = useMemo(
    () => ({
      tickets: state.tickets,
      filteredTickets,
      selectedTicket,
      selectedId: state.selectedId,
      loading: state.loading,
      error: state.error,
      page: state.page,
      searchText: state.filters.searchText,
      statusFilter: state.filters.statusFilter,
      setSearchText: (value) => dispatch({ type: 'SET_SEARCH_TEXT', payload: value }),
      setStatusFilter: (value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value }),
      selectTicket: (id) => dispatch({ type: 'SELECT_TICKET', payload: id })
    }),
    [state, filteredTickets, selectedTicket]
  );

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error('useTicketData must be used inside TicketDataProvider');
  }

  return value;
}
