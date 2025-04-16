export interface TodoGetAllResponseTypes {
    ongoing: Todo[]
    completed: Todo[]
}

export interface Todo {
    id: number
    task: string
    completed: boolean
    created_at: Date
    updated_at: Date
}

export interface TodoCreateInputTypes {
    task: string
}

export interface TodoUpdateInputTypes {
    // id: string
    task?: string
    completed?: boolean
}

export const defaultTodo: Todo = {
    id: 0,
    task: ``,
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
}