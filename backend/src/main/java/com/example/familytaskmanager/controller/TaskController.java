package com.example.familytaskmanager.controller;

import com.example.familytaskmanager.model.Task;
import com.example.familytaskmanager.model.User;
import com.example.familytaskmanager.repository.TaskRepository;
import com.example.familytaskmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskController(TaskRepository t, UserRepository u) {
        this.taskRepo = t;
        this.userRepo = u;
    }

    // GET /api/tasks
    @GetMapping
    public List<Task> allTasks() {
        return taskRepo.findAll();
    }

    // POST /api/tasks
    // corp JSON: { "title":"X", "description":"Y", "difficulty":"Mediu", "points":10, "userId":3, "deadline":"2025-12-31" }
    @PostMapping
    public Task createTask(@RequestBody TaskDto dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDifficulty(dto.getDifficulty());
        task.setPoints(dto.getPoints());
        task.setDeadline(dto.getDeadline());
        task.setStatus("NEINCEPUT");

        Optional<User> assigned = userRepo.findById(dto.getUserId());
        assigned.ifPresent(task::setAssignedTo);

        return taskRepo.save(task);
    }

    // PUT /api/tasks/{id}/start
    @PutMapping("/{taskId}/start")
    public Task startTask(@PathVariable Long taskId) {
        Task t = taskRepo.findById(taskId).orElseThrow();
        t.setStatus("IN_LUCRU");
        return taskRepo.save(t);
    }

    // PUT /api/tasks/{id}/complete
    @PutMapping("/{taskId}/complete")
    public Task completeTask(@PathVariable Long taskId) {
        Task t = taskRepo.findById(taskId).orElseThrow();
        t.setStatus("FINALIZAT");
        t.setCompleted(true);
        return taskRepo.save(t);
    }

    // PUT /api/tasks/{id}/approve
    @PutMapping("/{taskId}/approve")
    public Task approveTask(@PathVariable Long taskId) {
        Task t = taskRepo.findById(taskId).orElseThrow();
        if (t.isCompleted() && "FINALIZAT".equals(t.getStatus())) {
            t.setStatus("APROBAT");
            User child = t.getAssignedTo();
            if (child != null) {
                child.setPoints(child.getPoints() + t.getPoints());
                userRepo.save(child);
            }
        }
        return taskRepo.save(t);
    }

    // PUT /api/tasks/{id}/reject
    @PutMapping("/{taskId}/reject")
    public Task rejectTask(@PathVariable Long taskId) {
        Task t = taskRepo.findById(taskId).orElseThrow();
        if (t.isCompleted()) {
            t.setStatus("NEAPROBAT");
            t.setCompleted(false);
        }
        return taskRepo.save(t);
    }

    // DTO pentru corpul JSON la crearea task-ului
    static class TaskDto {
        private String title;
        private String description;
        private String difficulty;
        private int points;
        private Long userId;
        private Date deadline;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

        public int getPoints() { return points; }
        public void setPoints(int points) { this.points = points; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Date getDeadline() { return deadline; }
        public void setDeadline(Date deadline) { this.deadline = deadline; }
    }
}
