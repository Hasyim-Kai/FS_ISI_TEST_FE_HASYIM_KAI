import { Todo, TodoCreateInputTypes, TodoGetAllResponseTypes, TodoUpdateInputTypes } from "../model/todo"

export interface TodoRepository {
  getAll(): Promise<TodoGetAllResponseTypes>
  get(id: string): Promise<Todo>
  create(params: TodoCreateInputTypes): Promise<Todo>
  update(id: string, params: TodoUpdateInputTypes,): Promise<Todo>
  delete(id: string): Promise<void>
}
