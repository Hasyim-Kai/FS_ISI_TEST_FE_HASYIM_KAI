import { Button } from "@/components/input/button"
import Loading from "@/components/Loader/loading"
import { CheckCircle2, Pen, XCircle } from "lucide-react"

type Props = {
    isLoading?: boolean
    isError?: boolean
    todoList?: any[]
    updateFn?: (id: number) => void
    completeFn?: (id: number) => void
    deleteFn?: (id: number) => void
    uncheckFn?: (id: number) => void
}

export default function TodoList({
    isLoading = false, isError = false, todoList = [],
    updateFn = () => { },
    completeFn = () => { },
    deleteFn = () => { },
    uncheckFn = () => { }
}: Props) {
    // if error, show error message
    return isError ? <h1 className="mt-12 font-semibold">Error loading data</h1>
        // if Loading, show Loading
        : isLoading ? <Loading className="mt-24" />
            // if no data, show no data message
            : todoList.length < 1 ? <h1 className="mt-12 font-semibold text-center">No To Do for now <br /> get some chill</h1>
                // if data, show data
                : <>
                    {/* ONGOING TASK */}
                    <section className="w-full max-w-150 mt-5">
                        <h1 className="font-bold">Ongoing Task</h1>

                        {/* CONTENT CARD */}
                        {todoList.map((todo) => todo.isCompleted === false && <div className='flex gap-3 items-center mt-3 bg-[#D0D0D0] rounded-lg p-4' key={todo.id}>
                            {/* CONTENT */}
                            <div className="w-full">
                                <h1 className="text-black">{todo.title}</h1>
                                <p className="mt-1.5 text-xs text-gray-500">{todo.dueDate}</p>
                            </div>
                            {/* ACTIONS */}
                            <div className="flex justify-between items-center gap-1">
                                <Button onClick={() => updateFn(todo.id)}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <Pen size={16} color='black' />
                                </Button>
                                <Button onClick={() => deleteFn(todo.id)}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <XCircle size={16} color='black' />
                                </Button>
                                <Button onClick={() => completeFn(todo.id)}
                                    size={`icon`} className="ml-1 h-4 w-4 bg-white hover:bg-white rounded-full border-2 border-black cursor-pointer">
                                </Button>
                            </div>
                        </div>)}
                    </section>


                    {/* COMPLETED TASK */}
                    <section className="w-full max-w-150 mt-5 mb-24">
                        <h1 className="font-bold">Completed Task</h1>

                        {/* CONTENT CARD */}
                        {todoList.map((todo) => todo.isCompleted === true && <div className='flex gap-3 items-center mt-3 bg-[#D0D0D0] rounded-lg p-4' key={todo.id}>
                            {/* CONTENT */}
                            <div className="w-full">
                                <h1 className="text-black"><s>{todo.title}</s></h1>
                                <p className="mt-1.5 text-xs text-gray-500">{todo.dueDate}</p>
                            </div>
                            {/* ACTIONS */}
                            <div className="flex justify-between items-center gap-1">
                                <Button onClick={() => updateFn(todo.id)}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <Pen size={16} color='black' />
                                </Button>
                                <Button onClick={() => deleteFn(todo.id)}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <XCircle size={16} color='black' />
                                </Button>
                                <Button onClick={() => uncheckFn(todo.id)}
                                    size={`icon`} className="h-6 w-6 bg-transparent hover:bg-transparent">
                                    <CheckCircle2 size={16} color='black' />
                                </Button>
                            </div>
                        </div>)}
                    </section>
                </>
}