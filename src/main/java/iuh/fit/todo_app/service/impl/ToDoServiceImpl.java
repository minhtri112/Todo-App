package iuh.fit.todo_app.service.impl;

import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import iuh.fit.todo_app.repository.TodoRepository;
import iuh.fit.todo_app.service.ToDoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
}
