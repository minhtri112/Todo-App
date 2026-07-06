package iuh.fit.todo_app.service.impl;

import iuh.fit.todo_app.dto.TodoRequest;
import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import iuh.fit.todo_app.exception.BadRequestException;
import iuh.fit.todo_app.exception.ResourceNotFoundException;
import iuh.fit.todo_app.repository.TodoRepository;
import iuh.fit.todo_app.service.ToDoService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ToDoServiceImpl implements ToDoService {
    private final TodoRepository todoRepository;

    @Override
    public Map<LocalDate, Map<String, List<Todo>>> getTodosByWeekAndFilters(Status status, Priority priority, String title, int weekOffset) {
        // Tinh toan ngay thu 2 va ngay chu nhat dua tren weekOffset
        LocalDate targetDate = LocalDate.now().plusWeeks(weekOffset);
        LocalDate startOfWeek = targetDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = targetDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        // Lay danh sach toto
        List<Todo> todos = todoRepository.findTodosByWeekWithFilters(startOfWeek,endOfWeek,status,priority,title);

        // Cap nhat trang thai cua cac todo da het han
        LocalDateTime now = LocalDateTime.now();
        todos.stream().forEach(todo -> {
            if (todo.getStatus() != Status.COMPLETED
                    && todo.getEndTime() != null
                    && todo.getEndTime().isBefore(now)
                    && todo.getStatus() != Status.OVERDUE
            ) {
                todo.setStatus(Status.OVERDUE);
                todoRepository.save(todo);
            }
        });

        // group du lieu theo ngay
        return todos.stream()
                .filter(todo -> todo.getStartTime() != null)
                .collect(Collectors.groupingBy(
                        todo -> todo.getStartTime().toLocalDate(),
                        TreeMap::new,
                        Collectors.groupingBy(
                                this::getPeriodOfDay,
                                LinkedHashMap::new,
                                Collectors.toList()
                        )
                ));
    }

    private String getPeriodOfDay(Todo todo) {
        int hour = todo.getStartTime().getHour();
        if (hour < 12) return "MORNING";
        else if (hour < 18) return "AFTERNOON";
        else return "EVENING";
    }

    @Override
    public Todo createTodo(TodoRequest todoRequest) {
        if(todoRequest.getStartTime() != null && todoRequest.getEndTime() != null){
            if (todoRequest.getStartTime().isAfter(todoRequest.getEndTime())) {
                throw new BadRequestException("Thời gian kết thúc không thể trước thời gian bắt đầu.");
            }

            if(todoRequest.getStartTime().isBefore(LocalDateTime.now())){
                throw new BadRequestException("Thời gian bắt đầu không thể trong quá khứ.");
            }
        }
        if(todoRequest.getStatus() != Status.PENDING){
            throw new BadRequestException("Công việc được tạo phải ở trạng thái PENDING.");
        }
        // Kiem tra tinh hop le cua du lieu
        validateTodoRequest(null,todoRequest);

        Todo todo = new Todo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setStartTime(todoRequest.getStartTime());
        todo.setEndTime(todoRequest.getEndTime());
        todo.setDeleted(false);

        if(todoRequest.getStatus() != null) todo.setStatus(todoRequest.getStatus());
        else todo.setStatus(Status.PENDING);

        if (todoRequest.getPriority() != null) todo.setPriority(todoRequest.getPriority());
        else todo.setPriority(Priority.MEDIUM);

        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public Todo editTodo(Integer id, TodoRequest todoRequest) {
        Todo existingTodo = todoRepository.findById(id)
                .filter(todo -> !todo.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Công việc không tồn tại."));

        validateTodoRequest(id, todoRequest);

        existingTodo.setTitle(todoRequest.getTitle());
        existingTodo.setDescription(todoRequest.getDescription());
        existingTodo.setStartTime(todoRequest.getStartTime());
        existingTodo.setEndTime(todoRequest.getEndTime());
        existingTodo.setDeleted(false);

        if(todoRequest.getStatus() != null) existingTodo.setStatus(todoRequest.getStatus());
        else existingTodo.setStatus(Status.PENDING);

        if (todoRequest.getPriority() != null) existingTodo.setPriority(todoRequest.getPriority());
        else existingTodo.setPriority(Priority.MEDIUM);

        return todoRepository.save(existingTodo);
    }

    @Override
    public void deleteTodo(Integer id) {
        Todo existingTodo = todoRepository.findById(id)
                .filter(todo -> !todo.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Công việc không tồn tại."));

        existingTodo.setDeleted(true);
        todoRepository.save(existingTodo);
    }

    @Override
    public Todo getTodoById(Integer id) {
        return todoRepository.findById(id)
                .filter(todo -> !todo.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Công việc không tồn tại."));
    }


    // ham kiem tra tinh hop le cua du lieu truoc khi tao hoac chinh sua todo
    private void validateTodoRequest(Integer id,TodoRequest todoRequest) {
        if(todoRequest.getStartTime() != null && todoRequest.getEndTime() != null){
            if(todoRequest.getEndTime().isBefore(LocalDateTime.now())){
                throw new BadRequestException("Thời gian kết thúc không thể trong quá khứ.");
            }
        }

        List<Todo> overlappingTodos = todoRepository.existsOverlappingTodos(
                id,
                todoRequest.getStartTime(),
                todoRequest.getEndTime()
        );

        // Kiem tra cac cong viec co bi overlap
        if(!overlappingTodos.isEmpty()){
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            String conflictDetails = overlappingTodos.stream()
                    .map(todo -> String.format("\"%s\" ngày %s",
                            todo.getTitle(),
                            todo.getStartTime().format(dateFormatter)))
                    .collect(Collectors.joining(", "));

            throw new BadRequestException("Khung giờ này đã bị trùng với các công việc: " + conflictDetails + ". Vui lòng chọn thời gian khác!");
        }
    }


}
