import { api } from "@/data/_api";
import { Todo, TodoCreateInputTypes, TodoGetAllResponseTypes, TodoUpdateInputTypes } from "@/domain/model/todo";
import { TodoRepository } from "@/domain/repository/todo";

export class TodoApiRepository implements TodoRepository {
    constructor(private _api = api) { }

    getAll(): Promise<TodoGetAllResponseTypes> {
        return this._api.get(`todo/`,).then(res => res.data);
    }
    get(id: string): Promise<Todo> {
        return this._api.get(`todo/get/${id}`,).then(res => res.data);
    }
    create(input: TodoCreateInputTypes): Promise<Todo> {
        return this._api.post(`todo/create`, input).then(res => res.data);
    }
    update(id: string, input: TodoUpdateInputTypes): Promise<Todo> {
        return this._api.put(`todo/update/${id}`, input).then(res => res.data);
    }
    delete(id: string): Promise<void> {
        return this._api.delete(`todo/delete/${id}`).then(res => res.data);
    }
}

