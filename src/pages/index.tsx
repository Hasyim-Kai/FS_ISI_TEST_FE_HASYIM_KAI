import TodoList from '@/components/feature/todo/list';
import { Button } from '@/components/input/button';
import FetchingLoading from '@/components/Loader/fetching-loading';
import Loading from '@/components/Loader/loading';
import { IToast, IToastSuccess } from '@/utils/helper/toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {}

export default function index({ }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        IToastSuccess(`Task Added Successfully`, `Task has been added successfully!`);
        reset(); // Reset the form after submission
    };

    useEffect(() => {

    });

    const isLoading = false
    const isFetching = true

    const updateTodo = (id: number) => {
        IToast(`Task ${id}`);
    }
    const completeTodo = (id: number) => {
        IToast(`Task ${id}`);
    }
    const deleteTodo = (id: number) => {
        IToast(`Task ${id}`);
    }
    const uncheckTodo = (id: number) => {
        IToast(`Task ${id}`);
    }

    const todoListData = [
        {
            id: 1,
            title: 'Task 1',
            dueDate: '2023-10-10',
            isCompleted: false,
        },
        {
            id: 2,
            title: 'Task 2',
            dueDate: '2023-10-12',
            isCompleted: true,
        },
        {
            id: 3,
            title: 'Task 3',
            dueDate: '2023-10-15',
            isCompleted: false,
        },
        {
            id: 4,
            title: 'Task 4',
            dueDate: '2023-10-20',
            isCompleted: true,
        }
    ]

    return <main className="relative mt-10 px-5 lg:px-0 flex min-h-screen max-w-4xl mx-auto flex-col items-center">
        <h1 className="text-5xl text-center">Task Management</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-150 mt-5">
            <div className="flex flex-col items-center">
                <div className='w-full'>
                    <label htmlFor="todoTitle" className='block'>Title</label>
                    <input
                        id='todoTitle'
                        type="text"
                        placeholder="Enter a task"
                        className="p-2 border rounded-md w-full border-gray-500"
                        {...register('todo', { required: 'This field is required' })}
                    />
                    {errors.todo && <span className="text-red-500 text-sm mt-2">{String(errors.todo.message)}</span>}
                </div>

                <div className='flex items-center justify-center gap-3 mt-5'>
                    <Button
                        type="submit" disabled={isLoading}
                        className="text-gray-700 bg-[#6FCBFF] hover:bg-[#4bbdff] ">
                        Add Task
                    </Button>

                    <Button
                        type="submit" disabled={isLoading}
                        className="text-gray-700 bg-[#FFB46F] hover:bg-[#ffac5e] ">
                        Update Task
                    </Button>

                    <Button
                        type="button" disabled={isLoading}
                        className="text-gray-700 bg-[#FF6F6F] hover:bg-[#ff6060] ">
                        Cancel
                    </Button>
                </div>
            </div>
        </form>

        <TodoList todoList={todoListData}
            updateFn={updateTodo}
            completeFn={completeTodo}
            deleteFn={deleteTodo}
            uncheckFn={uncheckTodo} />

        {isFetching && <FetchingLoading />}
    </main>
}