import TodoList from '@/components/feature/todo/list';
import { Button } from '@/components/input/button';
import FetchingLoading from '@/components/Loader/fetching-loading';
import useVM from './_useVM';
import Loading from '@/components/Loader/loading';
import ErrorCard from '@/components/card/error-card';
import DefaultLayout from '@/components/layout/default-layout';

type Props = {}

export default function index({ }: Props) {
    const model = useVM()

    return <DefaultLayout>
        <main className="relative mt-10 px-5 lg:px-0 flex min-h-screen max-w-4xl mx-auto flex-col items-center">
            <h1 className="text-5xl text-center">Task Management</h1>

            <form onSubmit={model.handleSubmit(model.isEditing ? model.onUpdate : model.onSubmit)}
                className="w-full max-w-150 mt-5">
                <div className="flex flex-col items-center">
                    <div className='w-full'>
                        <label htmlFor="todoTitle" className='block'>Title</label>
                        <input
                            id='todoTitle'
                            type="text"
                            placeholder="Enter a task"
                            className="p-2 border rounded-md w-full border-gray-500"
                            {...model.register('task', { required: 'This field is required' })}
                        />
                        {model.errors.task && <span className="text-red-500 text-sm mt-2">{String(model.errors.task.message)}</span>}
                    </div>

                    <div className='flex items-center justify-center gap-3 mt-5'>
                        {model.isEditing ? <>
                            <Button
                                type="submit" disabled={model.isTodoLoading || model.isUpdatePending}
                                className="text-gray-700 bg-[#FFB46F] hover:bg-[#ffac5e] items-center gap-3">
                                Update Task
                                {(model.isTodoLoading || model.isUpdatePending) && <Loading isSmall className="" />}
                            </Button>

                            <Button onClick={model.onCancelUpdate}
                                type="button" disabled={model.isTodoLoading || model.isUpdatePending}
                                className="text-gray-700 bg-[#FF6F6F] hover:bg-[#ff6060] items-center gap-3">
                                Cancel
                                {(model.isTodoLoading || model.isUpdatePending) && <Loading isSmall className="" />}
                            </Button>
                        </>
                            : <Button
                                type="submit" disabled={model.isCreatePending}
                                className="text-gray-700 bg-[#6FCBFF] hover:bg-[#4bbdff] items-center gap-3">
                                Add Task
                                {model.isCreatePending && <Loading isSmall className="" />}
                            </Button>}
                    </div>

                    {(model.createErr || model.updateErr) && <ErrorCard className='mt-4' msg={model.createErr || model.updateErr} />}
                </div>
            </form>

            <TodoList todoList={model.todoListData}
                isLoading={model.isTodoListLoading || model.isTodoListFetching || model.isDeletePending}
                isError={model.todoListError}
                updateFn={model.onSelectTodoToUpdate}
                completeFn={model.onCompleteTodo}
                uncheckFn={model.onUncheckTodo}
                deleteFn={model.onDel}
            />

            {(model.isTodoFetching
                || model.isUpdatePending) && <FetchingLoading />}
        </main>
    </DefaultLayout>
}