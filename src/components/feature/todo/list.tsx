import { Button } from "@/components/input/button"
import Loading from "@/components/Loader/loading"
import { TodoGetAllResponseTypes } from "@/domain/model/todo"
import { formatDate } from "@/utils/helper/date"
import { CheckCircle2, Coffee, Pen, XCircle } from "lucide-react"

type Props = {
    isLoading?: boolean
    isError?: boolean
    todoList?: TodoGetAllResponseTypes
    updateFn?: (id: string) => void
    completeFn?: (id: string) => void
    deleteFn?: (id: string) => void
    uncheckFn?: (id: string) => void
}

export default function TodoList({
    isLoading = false, isError = false, todoList = { ongoing: [], completed: [] },
    updateFn = () => { },
    completeFn = () => { },
    deleteFn = () => { },
    uncheckFn = () => { }
}: Props) {
    // if error, show error message
    return isError ? <h1 className="mt-12 font-semibold text-red-500">Error loading data</h1>
        // if Loading, show Loading
        : isLoading ? <Loading className="mt-24" />
            // if data, show data
            : <>
                {/* ONGOING TASK */}
                <section className="w-full max-w-150 mt-5">
                    <h1 className="font-bold">Ongoing Task</h1>

                    {/* CONTENT CARD */}
                    {todoList.ongoing.length < 1
                        ? <h1 className="mt-5 flex items-center gap-3">No To Do for now, get some chill <Coffee size={20} /></h1>
                        : todoList.ongoing.map((todo) => todo.completed === false && <div className='flex gap-3 items-center mt-3 bg-[#D0D0D0] rounded-lg p-4' key={todo.id}>
                            {/* CONTENT */}
                            <div className="w-full">
                                <h1 className="text-black">{todo.task}</h1>
                                <p className="mt-1.5 text-xs text-gray-500">{formatDate(todo.created_at, `DD MMM YYYY, HH:mm`)}</p>
                            </div>
                            {/* ACTIONS */}
                            <div className="flex justify-between items-center gap-1">
                                <Button onClick={() => updateFn(String(todo.id))}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <Pen size={16} color='black' />
                                </Button>
                                <Button onClick={() => deleteFn(String(todo.id))}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <XCircle size={16} color='black' />
                                </Button>
                                <Button onClick={() => completeFn(String(todo.id))}
                                    size={`icon`} className="ml-1 h-4 w-4 bg-white hover:bg-white rounded-full border-2 border-black cursor-pointer">
                                </Button>
                            </div>
                        </div>)}
                </section>


                {/* COMPLETED TASK */}
                <section className="w-full max-w-150 mt-5 mb-24">
                    <h1 className="font-bold">Completed Task</h1>

                    {/* CONTENT CARD */}
                    {todoList.completed.length < 1
                        ? <h1 className="mt-5 flex items-center gap-3">No To Do for now, get some chill <Coffee size={20} /></h1>
                        : todoList.completed.map((todo) => todo.completed === true && <div className='flex gap-3 items-center mt-3 bg-[#D0D0D0] rounded-lg p-4' key={todo.id}>
                            {/* CONTENT */}
                            <div className="w-full">
                                <h1 className="text-black"><s>{todo.task}</s></h1>
                                <p className="mt-1.5 text-xs text-gray-500">{formatDate(todo.created_at, `DD MMM YYYY, HH:mm`)}</p>
                            </div>
                            {/* ACTIONS */}
                            <div className="flex justify-between items-center gap-1">
                                <Button onClick={() => updateFn(String(todo.id))}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <Pen size={16} color='black' />
                                </Button>
                                <Button onClick={() => deleteFn(String(todo.id))}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <XCircle size={16} color='black' />
                                </Button>
                                <Button onClick={() => uncheckFn(String(todo.id))}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <CheckCircle2 size={16} color='black' />
                                </Button>
                            </div>
                        </div>)}
                </section>
            </>
}