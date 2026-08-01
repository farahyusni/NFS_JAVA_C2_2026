import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext.jsx";
import { fetchPagedTickets } from "../services/api.js";

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedId: null,
  loading: true,
  error: "",
  cache: {},
  reloadToken: 0,
  source: null,
  pagination: {
    page: 0,
    size: 5,
    sortBy: "createdAt",
    direction: "desc",
    totalPages: 1,
    totalElements: 0,
  },
  filters: { searchText: "", statusFilter: "ALL" },
};

function ticketReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: "" };
    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        tickets: action.payload.content,
        selectedId: action.payload.content[0]?.id ?? null,
        pagination: {
          ...state.pagination,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        },
        cache: { ...state.cache, [action.key]: action.payload },
        source: "backend",
      };

    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        filters: { ...state.filters, searchText: action.payload },
      };
    case "SET_STATUS_FILTER":
      return {
        ...state,
        filters: { ...state.filters, statusFilter: action.payload },
      };
    case "SELECT_TICKET":
      return { ...state, selectedId: action.payload };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pagination: { ...state.pagination, size: action.payload, page: 0 },
      };
    case "SET_SORT_BY":
      return {
        ...state,
        pagination: { ...state.pagination, sortBy: action.payload, page: 0 },
      };
    case "SET_SORT_DIRECTION":
      return {
        ...state,
        pagination: { ...state.pagination, direction: action.payload, page: 0 },
      };
    case "LOAD_FROM_CACHE": {
      const cached = state.cache[action.key];
      return {
        ...state,
        loading: false,
        error: "",
        tickets: cached.content,
        selectedId: cached.content[0]?.id ?? null,
        pagination: {
          ...state.pagination,
          totalPages: cached.totalPages,
          totalElements: cached.totalElements,
        },
        source: "cache",
      };
    }
    case "FORCE_RELOAD": {
      const { page, size, sortBy, direction } = state.pagination;
      const key = `${page}|${size}|${sortBy}|${direction}`;
      const nextCache = { ...state.cache };
      delete nextCache[key];
      return { ...state, cache: nextCache, reloadToken: state.reloadToken + 1 };
    }
    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    let ignore = false;
    const { page, size, sortBy, direction } = state.pagination;
    const key = `${page}|${size}|${sortBy}|${direction}`;
    const cached = state.cache[key];

    if (cached) {
      dispatch({ type: "LOAD_FROM_CACHE", key });
      return;
    }

    async function loadTickets() {
      dispatch({ type: "LOAD_START" });
      try {
        const data = await fetchPagedTickets(token, {
          page,
          size,
          sortBy,
          direction,
        });
        if (!ignore) {
          dispatch({ type: "LOAD_SUCCESS", payload: data, key });
        }
      } catch (err) {
        if (!ignore) {
          dispatch({
            type: "LOAD_ERROR",
            payload: err.message || "Could not load tickets.",
          });
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [
    token,
    state.pagination.page,
    state.pagination.size,
    state.pagination.sortBy,
    state.pagination.direction,
    state.reloadToken,
  ]);

  const filteredTickets = state.tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title
        .toLowerCase()
        .includes(state.filters.searchText.toLowerCase()) ||
      ticket.category
        .toLowerCase()
        .includes(state.filters.searchText.toLowerCase());
    const matchesStatus =
      state.filters.statusFilter === "ALL" ||
      ticket.status === state.filters.statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = state.tickets.find(
    (ticket) => ticket.id === state.selectedId,
  );

  const value = useMemo(
    () => ({
      tickets: state.tickets,
      filteredTickets,
      selectedTicket,
      selectedId: state.selectedId,
      loading: state.loading,
      error: state.error,
      page: state.pagination.page,
      pageSize: state.pagination.size,
      sortBy: state.pagination.sortBy,
      direction: state.pagination.direction,
      totalPages: state.pagination.totalPages,
      totalElements: state.pagination.totalElements,
      source: state.source,
      refresh: () => dispatch({ type: "FORCE_RELOAD" }),
      nextPage: () =>
        dispatch({
          type: "SET_PAGE",
          payload: Math.min(
            state.pagination.page + 1,
            state.pagination.totalPages - 1,
          ),
        }),
      prevPage: () =>
        dispatch({
          type: "SET_PAGE",
          payload: Math.max(state.pagination.page - 1, 0),
        }),
      setPageSize: (size) => dispatch({ type: "SET_PAGE_SIZE", payload: size }),
      setSortBy: (sortBy) => dispatch({ type: "SET_SORT_BY", payload: sortBy }),
      setSortDirection: (direction) =>
        dispatch({ type: "SET_SORT_DIRECTION", payload: direction }),
      searchText: state.filters.searchText,
      statusFilter: state.filters.statusFilter,
      setSearchText: (value) =>
        dispatch({ type: "SET_SEARCH_TEXT", payload: value }),
      setStatusFilter: (value) =>
        dispatch({ type: "SET_STATUS_FILTER", payload: value }),
      selectTicket: (id) => dispatch({ type: "SELECT_TICKET", payload: id }),
    }),
    [state, filteredTickets, selectedTicket],
  );

  return (
    <TicketDataContext.Provider value={value}>
      {children}
    </TicketDataContext.Provider>
  );
}

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error("useTicketData must be used inside TicketDataProvider");
  }

  return value;
}
