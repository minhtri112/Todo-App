import axiosClient from '../api/axiosClient';


const todoService = {
    getTodosForCurrentWeek : async (week,status,priority,title) => {
        const response = await axiosClient.get('todos/week', { params: { week, status, priority, title } });
        return response.data;
    },
    createTodo: async (todoData) => {
        const response = await axiosClient.post('todos', todoData);
        return response.data;
    },
    editTodo: async (todoId, todoData) => {
        const response = await axiosClient.put(`todos/${todoId}`, todoData);
        return response.data;
    },
    deleteTodo: async (todoId) => {
        const response = await axiosClient.delete(`todos/${todoId}`);
        return response.data;
    },
    getTodoById : async (todoId) => {
        const response = await axiosClient.get(`todos/${todoId}`);
        return response.data;
    }
}

export default todoService;