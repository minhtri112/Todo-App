package iuh.fit.todo_app.repository;

import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer> {

    @Query(
            "SELECT t FROM Todo t WHERE t.isDeleted = false " +
            "AND DATE(t.startTime) BETWEEN :startOfWeek AND :endOfWeek " +
            "AND (:status IS NULL OR t.status = :status) " +
            "AND (:priority IS NULL OR t.priority = :priority) " +
            "AND (:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%')))"
    )
    List<Todo> findTodosByWeekWithFilters(
            @Param("startOfWeek") LocalDate startOfWeek,
            @Param("endOfWeek") LocalDate endOfWeek,
            @Param("status") Status status,
            @Param("priority") Priority priority,
            @Param("title") String title
    );
}
