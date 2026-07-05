package iuh.fit.todo_app.entity;

import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "todos", indexes = {
  @Index(name = "idx_todo_title", columnList = "title"),
  @Index(name = "idx_todo_status", columnList = "status"),
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'" )
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'MEDIUM'")
    private Priority priority;

    @Column(name = "start_time",nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updateAt;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "BIT DEFAULT 0")
    private boolean isDeleted;

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDate.now();
        this.updateAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = LocalDate.now();
    }
}
