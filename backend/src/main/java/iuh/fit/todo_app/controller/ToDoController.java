package iuh.fit.todo_app.controller;

import iuh.fit.todo_app.dto.TodoRequest;
import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import iuh.fit.todo_app.response.ApiResponse;
import iuh.fit.todo_app.service.ToDoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
public class ToDoController {
    private final ToDoService todoService;

    @GetMapping("/week")
    public ResponseEntity<ApiResponse<Map<LocalDate, Map<String, List<Todo>>>>> getTodosForCurrentWeek(
            @RequestParam(value = "status", required = false) Status status,
            @RequestParam(value = "priority", required = false) Priority priority,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "week", defaultValue = "0") int weekOffset
    ) {
        System.out.println("weekOffset: " + weekOffset);
        Map<LocalDate, Map<String, List<Todo>>> weekPlan = todoService.getTodosByWeekAndFilters(status, priority, title, weekOffset);
        return ResponseEntity.ok(ApiResponse.success(weekPlan, "Lay todos theo tuan thanh cong"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Todo>> getTodoById(@PathVariable Integer id){
        Todo todo = todoService.getTodoById(id);
        return ResponseEntity.ok(ApiResponse.success(todo, "Lay todo theo id thanh cong"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Todo>> createTodo(@Valid @RequestBody TodoRequest todoRequest) {
        Todo createdTodo = todoService.createTodo(todoRequest);
        return ResponseEntity.ok(ApiResponse.success(createdTodo, "Tao todo thanh cong"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Todo>> updateTodo(@PathVariable Integer id, @Valid @RequestBody TodoRequest todoRequest) {
        Todo updatedTodo = todoService.editTodo(id, todoRequest);
        return ResponseEntity.ok(ApiResponse.success(updatedTodo, "Cap nhat todo thanh cong"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable Integer id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Xoa todo thanh cong"));
    }
}
