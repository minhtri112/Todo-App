import axiosClient from '../api/axiosClient';


const todoService = {
    getTodosForCurrentWeek : async (week,status,priority,title) => {
        const response = await axiosClient.get('todos/week', { params: { week, status, priority, title } });
        return response.data;
    }
}

export default todoService;