package iuh.fit.todo_app.service;

import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ToDoService {
    Map<LocalDate, Map<String, List<Todo>>> getTodosByWeekAndFilters(Status status, Priority priority, String title, int weekOffset);
}
