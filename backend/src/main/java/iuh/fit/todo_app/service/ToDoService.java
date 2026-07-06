package iuh.fit.todo_app.service;

import iuh.fit.todo_app.dto.TodoRequest;
import iuh.fit.todo_app.entity.Todo;
import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ToDoService {

    Map<LocalDate, Map<String, List<Todo>>> getTodosByWeekAndFilters(Status status, Priority priority, String title, int weekOffset);

    Todo createTodo(TodoRequest todoRequest);

    Todo editTodo(Integer id, TodoRequest todoRequest);

    void deleteTodo(Integer id);

    Todo getTodoById(Integer id);
}
