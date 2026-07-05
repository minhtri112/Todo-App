package iuh.fit.todo_app.dto;

import iuh.fit.todo_app.enums.Priority;
import iuh.fit.todo_app.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class TodoRequest {
    @NotBlank(message = "Tiêu đề công việc không được để trống.")
    @Size(max = 255, message = "Tiêu đề không được vượt quá 255 ký tự.")
    private String title;

    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự.")
    private String description;

    private Status status;

    private Priority priority;

    @NotNull(message = "Thời gian bắt đầu không được để trống.")
    private LocalDateTime startTime;

    @NotNull(message = "Thời gian kết thúc không được để trống.")
    private LocalDateTime endTime;
}
