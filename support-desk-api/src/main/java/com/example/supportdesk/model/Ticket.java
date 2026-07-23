package com.example.supportdesk.model;

// Import @Id to mark the primary key (_id) in MongoDB
import org.springframework.data.annotation.Id;

// Import @Document to map this class to a MongoDB collection
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/*
 * Ticket Model
 *
 * This class represents a Ticket document stored in MongoDB.
 *
 * Each Ticket object corresponds to one document in the
 * "tickets" collection.
 */
@Document(collection = "tickets")
public class Ticket {

    /*
     * Primary Key
     *
     * MongoDB stores this field as "_id".
     * If the id is null, MongoDB automatically generates one.
     */
    @Id
    private String id;

    // Short title of the support ticket
    private String title;

    // Detailed description of the issue
    private String description;

    // Category of the issue
    // Example:
    // Hardware
    // Software
    // Network
    private String category;

    // Priority level
    // Example:
    // Low
    // Medium
    // High
    private String priority;

    // Current ticket status
    // Example:
    // Open
    // In Progress
    // Closed
    private String status;

    // Name of the user who created the ticket
    private String createdBy;

    // Date and time the ticket was created
    private LocalDateTime createdAt;

    /*
     * Default constructor
     *
     * Spring Boot and MongoDB require this constructor
     * when converting MongoDB documents into Java objects.
     */
    public Ticket() {
    }

    /*
     * Constructor for creating a new Ticket.
     *
     * We don't include "id" because MongoDB
     * automatically generates it.
     */
    public Ticket(String title,
                  String description,
                  String category,
                  String priority,
                  String status,
                  String createdBy,
                  LocalDateTime createdAt) {

        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }

    // ===== Getters and Setters =====

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}