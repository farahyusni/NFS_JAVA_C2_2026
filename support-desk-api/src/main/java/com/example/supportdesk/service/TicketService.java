package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import org.springframework.stereotype.Service;
import com.example.supportdesk.exception.ResourceNotFoundException;
import com.example.supportdesk.dto.CreateTicketRequest;


import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;

@Service
public class TicketService {

    private final List<TicketResponse> tickets = new ArrayList<>(List.of(
        new TicketResponse("T001", "Cannot access email", "User cannot login to company email account.", "Email", "HIGH", "OPEN", "amir@example.com", "2026-07-03"),
        new TicketResponse("T002", "Laptop is slow", "Laptop takes a long time to start up and open applications.", "Hardware", "MEDIUM", "OPEN", "siti@example.com", "2026-07-02"),
        new TicketResponse("T003", "VPN connection not working", "Unable to connect to company VPN from home.", "Network", "HIGH", "IN_PROGRESS", "farah@example.com", "2026-07-01")
    ));

    public List<TicketResponse> getAllTickets() {
        return tickets;
    }

    public TicketResponse getTicketById(String id) {
        return tickets.stream()
            .filter(ticket -> ticket.id().equals(id))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        TicketResponse ticket = new TicketResponse(
            generateNextId(),
            request.title(),
            request.description(),
            request.category(),
            request.priority(),
            "OPEN",
            request.createdBy(),
            LocalDate.now().toString()
        );

        tickets.add(ticket);
        return ticket;
    }

    private String generateNextId() {
        return String.format("T%03d", tickets.size() + 1);
    }


}
