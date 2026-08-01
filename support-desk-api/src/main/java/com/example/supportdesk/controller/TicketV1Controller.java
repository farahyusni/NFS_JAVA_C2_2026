package com.example.supportdesk.controller;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.UpdateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketV1Controller {

    private final TicketService ticketService;

    public TicketV1Controller(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<TicketResponse> getTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
        return ticketService.getTickets(status, priority, category);
    }

    @GetMapping("/paged")
    public Page<TicketResponse> getPagedTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ticketService.getPagedTickets(pageable);
    }

    @GetMapping("/{id}")
    public TicketResponse getTicketById(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TicketResponse createTicket(@Valid @RequestBody CreateTicketRequest request) {
        return ticketService.createTicket(request);
    }

    @PutMapping("/{id}")
    public TicketResponse updateTicket(
            @PathVariable String id,
            @Valid @RequestBody UpdateTicketRequest request) {
        return ticketService.updateTicket(id, request);
    }
}
