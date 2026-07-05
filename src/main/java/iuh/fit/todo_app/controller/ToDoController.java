package iuh.fit.todo_app.controller;

import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import iuh.fit.todo_app.response.ApiResponse;
import iuh.fit.todo_app.service.ToDoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
public class ToDoController {
    private final ToDoService toDoService;

    @GetMapping("/week")
    public ResponseEntity<ApiResponse<Map<LocalDate, Map<String, List<Todo>>>>> getTodosForCurrentWeek(
            @RequestParam(value = "status", required = false) Status status,
            @RequestParam(value = "priority", required = false) Priority priority,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "week", defaultValue = "0") int weekOffset
    ) {
        Map<LocalDate, Map<String, List<Todo>>> weekPlan = toDoService.getTodosByWeekAndFilters(status, priority, title, weekOffset);
        return ResponseEntity.ok(ApiResponse.success(weekPlan, "Lay todos theo tuan thanh cong"));
    }
}
