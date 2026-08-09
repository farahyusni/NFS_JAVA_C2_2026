package com.example.supportdesk.service;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

import java.util.stream.Collectors;
import com.example.supportdesk.dto.TicketResponse;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.UpdateTicketRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TicketService {

    /*
     * Repository used to communicate with MongoDB.
     *
     * Spring Boot automatically creates the implementation
     * at runtime.
     */
    private final TicketRepository ticketRepository;
    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    /*
     * Constructor Injection
     *
     * Spring automatically injects TicketRepository here.
     */
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    /*
     * Retrieve all ticket documents from MongoDB.
     *
     * ticketRepository.findAll() returns a List<Ticket>.
     *
     * We then convert each Ticket model into a TicketResponse DTO
     * before returning it to the controller.
     */
    public List<TicketResponse> getTickets(String status, String priority, String category) {

        logger.info("Fetching tickets with filters - status: {}, priority: {}, category: {}", status, priority,
                category);

        List<Ticket> tickets;

        if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /*
     * Retrieve a single ticket from MongoDB by its ID.
     *
     * If the ticket exists:
     * - Convert it to a TicketResponse DTO.
     *
     * If the ticket does not exist:
     * - Throw ResourceNotFoundException.
     * - The existing exception handler will return HTTP 404.
     */
    public TicketResponse getTicketById(String id) {
        Ticket ticket = findTicketOrThrow(id);
        return convertToResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {

        Ticket ticket = new Ticket(
                normalizeRequired(request.title()),
                normalizeRequired(request.description()),
                normalizeRequired(request.category()),
                normalizePriority(request.priority()),
                "OPEN", // Default status
                normalizeRequired(request.createdBy()),
                LocalDateTime.now() // Current date and time
        );

        Ticket savedTicket = ticketRepository.save(ticket);

        logger.info("Created ticket with id: {}", savedTicket.getId());

        return convertToResponse(savedTicket);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {

        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(normalizeRequired(request.title()));
        ticket.setDescription(normalizeRequired(request.description()));
        ticket.setCategory(normalizeRequired(request.category()));
        ticket.setPriority(normalizePriority(request.priority()));
        ticket.setStatus(normalizeStatus(request.status()));

        Ticket savedTicket = ticketRepository.save(ticket);

        logger.info("Updated ticket with id: {}", savedTicket.getId());

        return convertToResponse(savedTicket);
    }

    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    private String normalizeRequired(String value) {
        return value.trim();
    }

    private String normalizeStatus(String status) {
        return status.trim().toUpperCase();
    }

    private String normalizePriority(String priority) {
        return priority.trim().toUpperCase();
    }

    /*
     * Convert a Ticket model into a TicketResponse DTO.
     *
     * This keeps database objects separate from
     * the objects returned by the API.
     */
    private TicketResponse convertToResponse(Ticket ticket) {

        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt().toString());
    }

    public Page<TicketResponse> getPagedTickets(Pageable pageable) {
        logger.info("Fetching paginated tickets - page: {}, size: {}, sort: {}",
                pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        return ticketRepository.findAll(pageable)
                .map(this::convertToResponse);
    }
}
