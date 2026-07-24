package com.example.supportdesk.repository;

// Import the Ticket model that this repository manages
import com.example.supportdesk.model.Ticket;

// Spring Data MongoDB repository interface
import org.springframework.data.mongodb.repository.MongoRepository;

// Marks this interface as a Spring Repository component
import org.springframework.stereotype.Repository;

import java.util.List;

/*
 * Ticket Repository
 *
 * This interface provides database operations
 * for the Ticket collection.
 *
 * We do NOT write any implementation.
 *
 * Spring Boot automatically generates the implementation
 * while the application starts.
 */
@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {

    /*
     * Generic Parameters:
     *
     * Ticket
     * --------
     * The document (entity/model) that this repository manages.
     *
     * String
     * --------
     * The data type of the @Id field.
     *
     * Since Ticket.java has:
     *
     * @Id
     * private String id;
     *
     * therefore we use String here.
     */

    List<Ticket> findByStatus(String status);
    List<Ticket> findByPriority(String priority);
    List<Ticket> findByCategory(String category);

}