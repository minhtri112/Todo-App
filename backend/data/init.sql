use todo_db;

INSERT INTO todos (title, description, status, priority, start_time, end_time, is_deleted, created_at, updated_at) VALUES
-- Ngày 2026-07-01 (Quá khứ - Các task đã hoàn thành hoặc overdue)
('Học lý thuyết Java Spring Boot', 'Ôn lại các khái niệm Dependency Injection và IoC Container', 'COMPLETED', 'HIGH', '2026-07-01 08:00:00', '2026-07-01 11:30:00', false, '2026-07-01', '2026-07-01'),
('Lập trình bài tập môn Kiến trúc phần mềm', 'Triển khai mẫu thiết kế Factory Pattern', 'COMPLETED', 'MEDIUM', '2026-07-01 13:30:00', '2026-07-01 17:00:00', false, '2026-07-01', '2026-07-01'),
('Đọc tài liệu Microservices', 'Tìm hiểu về API Gateway và Spring Cloud Routing', 'OVERDUE', 'HIGH', '2026-07-01 19:00:00', '2026-07-01 21:00:00', false, '2026-07-01', '2026-07-01'),
('Họp nhóm đồ án tốt nghiệp iuh', 'Thảo luận phân chia công việc làm Frontend', 'COMPLETED', 'HIGH', '2026-07-02 09:00:00', '2026-07-02 11:00:00', false, '2026-07-02', '2026-07-02'),
('Fix lỗi CORS hệ thống', 'Cấu hình lại AllowedOrigins cho API Gateway', 'COMPLETED', 'HIGH', '2026-07-02 14:00:00', '2026-07-02 16:30:00', false, '2026-07-02', '2026-07-02'),

-- Ngày 2026-07-03
('Tối ưu hóa truy vấn SQL', 'Thêm Index cho các bảng có lượng dữ liệu lớn', 'COMPLETED', 'MEDIUM', '2026-07-03 08:30:00', '2026-07-03 10:30:00', false, '2026-07-03', '2026-07-03'),
('Nghiên cứu Redis Caching', 'Tìm hiểu cách áp dụng Distributed Cache cho API', 'COMPLETED', 'MEDIUM', '2026-07-03 14:00:00', '2026-07-03 16:00:00', false, '2026-07-03', '2026-07-03'),
('Đá bóng cùng bạn đại học', 'Sân bóng gần trường IUH', 'COMPLETED', 'LOW', '2026-07-03 18:00:00', '2026-07-03 20:00:00', false, '2026-07-03', '2026-07-03'),

-- Ngày 2026-07-04
('Cài đặt môi trường Docker', 'Đóng gói ứng dụng Backend chạy thử trên local', 'COMPLETED', 'HIGH', '2026-07-04 09:00:00', '2026-07-04 11:00:00', false, '2026-07-04', '2026-07-04'),
('Viết Unit Test cho tầng Service', 'Sử dụng Mockito để viết test case cho tầng nghiệp vụ', 'COMPLETED', 'MEDIUM', '2026-07-04 13:30:00', '2026-07-04 16:30:00', false, '2026-07-04', '2026-07-04'),
('Xem video giải bài LeetCode', 'Bài toán chuỗi đối xứng dùng thuật toán Two Pointers', 'OVERDUE', 'LOW', '2026-07-04 20:00:00', '2026-07-04 21:30:00', false, '2026-07-04', '2026-07-04'),

-- Ngày 2026-07-05 (Hiện tại - Chủ nhật)
('Nhận đề bài test Intern Developer', 'Đọc kỹ các yêu cầu chức năng và kỹ thuật', 'COMPLETED', 'HIGH', '2026-07-05 08:00:00', '2026-07-05 09:00:00', false, '2026-07-05', '2026-07-05'),
('Thiết kế Database cho Todo App', 'Xác định các trường dữ liệu và quan hệ thực thể', 'COMPLETED', 'HIGH', '2026-07-05 09:15:00', '2026-07-05 11:00:00', false, '2026-07-05', '2026-07-05'),
('Coding chức năng CRUD cơ bản', 'Tạo Entity, Repository, Service và Controller cho Todo', 'IN_PROGRESS', 'HIGH', '2026-07-05 13:00:00', '2026-07-05 17:30:00', false, '2026-07-05', '2026-07-05'),
('Viết Global Exception Handler', 'Bắt các lỗi Validate đầu vào và NotFoundException', 'PENDING', 'MEDIUM', '2026-07-05 19:00:00', '2026-07-05 21:00:00', false, '2026-07-05', '2026-07-05'),
('Chuẩn bị tài liệu file README', 'Hướng dẫn cấu hình biến môi trường và cách chạy ứng dụng', 'PENDING', 'LOW', '2026-07-05 21:30:00', '2026-07-05 23:00:00', false, '2026-07-05', '2026-07-05'),

-- Ngày 2026-07-06 (Thứ 2 kế tiếp)
('Kiểm tra lại toàn bộ API bằng Postman', 'Chạy thử các case dữ liệu lỗi để xem phản hồi', 'PENDING', 'HIGH', '2026-07-06 08:00:00', '2026-07-06 10:00:00', false, '2026-07-05', '2026-07-05'),
('Cấu hình Docker Compose', 'Chạy song song ứng dụng Spring Boot và DB MariaDB', 'PENDING', 'HIGH', '2026-07-06 10:30:00', '2026-07-06 12:00:00', false, '2026-07-05', '2026-07-05'),
('Bổ sung thuật toán Fuzzy Search', 'Áp dụng thuật toán tính khoảng cách chuỗi để tìm gần đúng', 'PENDING', 'MEDIUM', '2026-07-06 14:00:00', '2026-07-06 16:30:00', false, '2026-07-05', '2026-07-05'),
('Tối ưu hóa giao diện Client', 'Đảm bảo giao diện hiển thị danh sách trực quan', 'PENDING', 'MEDIUM', '2026-07-06 18:30:00', '2026-07-06 21:00:00', false, '2026-07-05', '2026-07-05'),

-- Ngày 2026-07-07 (Hạn nộp bài)
('Review code và refactor tên biến', 'Xóa các đoạn code thừa, format lại mã nguồn sạch sẽ', 'PENDING', 'HIGH', '2026-07-07 08:00:00', '2026-07-07 10:00:00', false, '2026-07-05', '2026-07-05'),
('Nộp bài test qua GitHub', 'Push code, tạo release và gửi link cho bộ phận tuyển dụng', 'PENDING', 'HIGH', '2026-07-07 10:30:00', '2026-07-07 11:30:00', false, '2026-07-05', '2026-07-05'),
('Học thêm ASP.NET Core cơ bản', 'Tìm hiểu về C# syntax và Dependency Injection trong .NET', 'PENDING', 'MEDIUM', '2026-07-07 14:00:00', '2026-07-07 17:00:00', false, '2026-07-05', '2026-07-05'),
('Nghỉ ngơi và xem phim', 'Thư giãn sau 2 ngày làm bài test căng thẳng', 'PENDING', 'LOW', '2026-07-07 20:00:00', '2026-07-07 22:30:00', false, '2026-07-05', '2026-07-05'),

-- Các ngày tiếp theo từ 2026-07-08 đến 2026-07-13 (Dữ liệu bổ sung cho đủ 50 records)
('Tìm hiểu Entity Framework', 'So sánh các tính năng với Hibernate JPA', 'PENDING', 'MEDIUM', '2026-07-08 09:00:00', '2026-07-08 11:30:00', false, '2026-07-05', '2026-07-05'),
('Luyện tập thuật toán trên HackerRank', 'Giải quyết bài toán về mảng và chuỗi ký tự', 'PENDING', 'LOW', '2026-07-08 14:00:00', '2026-07-08 16:00:00', false, '2026-07-05', '2026-07-05'),
('Dọn dẹp phòng trọ', 'Vệ sinh không gian làm việc đầu tuần', 'PENDING', 'LOW', '2026-07-08 18:00:00', '2026-07-08 19:30:00', false, '2026-07-05', '2026-07-05'),
('Đọc sách Clean Code', 'Chương về cách đặt tên hàm và xử lý lỗi hệ thống', 'PENDING', 'MEDIUM', '2026-07-09 08:30:00', '2026-07-09 10:30:00', false, '2026-07-05', '2026-07-05'),
('Tự học ASP.NET Web API', 'Tạo một dự án demo CRUD cơ bản bằng C#', 'PENDING', 'HIGH', '2026-07-09 14:00:00', '2026-07-09 17:00:00', false, '2026-07-05', '2026-07-05'),
('Gặp mặt bạn bè cuối tuần', 'Uống cà phê trao đổi kinh nghiệm phỏng vấn', 'PENDING', 'LOW', '2026-07-09 19:30:00', '2026-07-09 21:30:00', false, '2026-07-05', '2026-07-05'),
('Chuẩn bị trang phục phỏng vấn', 'Ủi quần áo chỉn chu sẵn sàng khi được gọi', 'PENDING', 'LOW', '2026-07-10 09:00:00', '2026-07-10 10:00:00', false, '2026-07-05', '2026-07-05'),
('Ôn tập kiến thức OOP', 'Kế thừa, Đa hình, Đóng gói, Trừu tượng trong phỏng vấn', 'PENDING', 'HIGH', '2026-07-10 14:00:00', '2026-07-10 16:30:00', false, '2026-07-05', '2026-07-05'),
('Chạy bộ rèn luyện sức khỏe', 'Công viên gần nhà', 'PENDING', 'LOW', '2026-07-10 17:30:00', '2026-07-10 18:30:00', false, '2026-07-05', '2026-07-05'),
('Nghiên cứu kiến thức CI/CD nâng cao', 'Cách viết pipeline tự động bằng GitHub Actions', 'PENDING', 'MEDIUM', '2026-07-11 08:30:00', '2026-07-11 11:30:00', false, '2026-07-05', '2026-07-05'),
('Kiểm tra hòm thư Email', 'Theo dõi kết quả phản hồi từ bài test của nhà tuyển dụng', 'PENDING', 'HIGH', '2026-07-11 14:00:00', '2026-07-11 14:30:00', false, '2026-07-05', '2026-07-05'),
('Tìm hiểu về kiến trúc RESTful nâng cao', 'Cách thiết kế API chuẩn HATEOAS', 'PENDING', 'LOW', '2026-07-11 15:30:00', '2026-07-11 17:30:00', false, '2026-07-05', '2026-07-05'),
('Xem phim giải trí cùng gia đình', 'Thư giãn tối thứ bảy', 'PENDING', 'LOW', '2026-07-11 20:00:00', '2026-07-11 22:00:00', false, '2026-07-05', '2026-07-05'),
('Lên kế hoạch học tập tuần mới', 'Đặt mục tiêu làm chủ các kiến thức ASP.NET', 'PENDING', 'MEDIUM', '2026-07-12 09:00:00', '2026-07-12 10:30:00', false, '2026-07-05', '2026-07-05'),
('Tìm hiểu cơ chế hoạt động của Kafka', 'Cách xây dựng luồng xử lý thông điệp bất đồng bộ', 'PENDING', 'HIGH', '2026-07-12 14:00:00', '2026-07-12 17:00:00', false, '2026-07-05', '2026-07-05'),
('Xem lại dự án Alpha Cinema', 'Chuẩn bị giải thích kiến trúc hệ thống khi phỏng vấn', 'PENDING', 'HIGH', '2026-07-13 08:30:00', '2026-07-13 11:30:00', false, '2026-07-05', '2026-07-05'),
('Tìm hiểu về bảo mật API chống XSS', 'Cơ chế lưu trữ token an toàn với HttpOnly Cookie', 'PENDING', 'HIGH', '2026-07-13 14:00:00', '2026-07-13 16:30:00', false, '2026-07-05', '2026-07-05'),
('Học tiếng Anh giao tiếp chuyên ngành', 'Mở rộng vốn từ vựng kỹ thuật đọc hiểu tài liệu tốt hơn', 'PENDING', 'LOW', '2026-07-13 19:30:00', '2026-07-13 21:00:00', false, '2026-07-05', '2026-07-05'),
('Mua sắm nhu yếu phẩm cá nhân', 'Đi siêu thị mua đồ ăn cho tuần mới', 'PENDING', 'LOW', '2026-07-14 09:00:00', '2026-07-14 11:00:00', false, '2026-07-05', '2026-07-05'),
('Tìm hiểu cơ chế nén dữ liệu API', 'Cách dùng GZIP compression tăng tốc độ phản hồi', 'PENDING', 'MEDIUM', '2026-07-14 14:00:00', '2026-07-14 16:00:00', false, '2026-07-05', '2026-07-05'),
('Học cách triển khai HTTPS cho server', 'Sử dụng chứng chỉ SSL mã hóa dữ liệu đường truyền', 'PENDING', 'MEDIUM', '2026-07-15 08:30:00', '2026-07-15 11:00:00', false, '2026-07-05', '2026-07-05'),
('Thử nghiệm cấu hình Nginx làm Load Balancer', 'Phân phối tải cho nhiều instance backend chạy song song', 'PENDING', 'HIGH', '2026-07-15 14:00:00', '2026-07-15 17:00:00', false, '2026-07-05', '2026-07-05'),
('Chơi game Liên Quân cùng bạn bè', 'Giải trí giảm căng thẳng buổi tối', 'PENDING', 'LOW', '2026-07-15 20:00:00', '2026-07-15 22:00:00', false, '2026-07-05', '2026-07-05'),
('Nghiên cứu cơ chế Circuit Breaker', 'Tìm hiểu cách cô lập lỗi cục bộ bằng Resilience4j', 'PENDING', 'HIGH', '2026-07-16 09:00:00', '2026-07-16 11:30:00', false, '2026-07-05', '2026-07-05'),
('Kiểm tra độ phủ code bằng Jacoco', 'Đo tỷ lệ test coverage của ứng dụng đạt chuẩn', 'PENDING', 'MEDIUM', '2026-07-16 14:00:00', '2026-07-16 16:30:00', false, '2026-07-05', '2026-07-05'),
('Chuẩn bị bài thuyết trình đồ án', 'Tóm tắt các công nghệ sử dụng trong đồ án học tập', 'PENDING', 'MEDIUM', '2026-07-17 09:00:00', '2026-07-17 11:30:00', false, '2026-07-05', '2026-07-05');