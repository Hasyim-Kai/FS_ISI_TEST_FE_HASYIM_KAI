import { TodoApiRepository } from "@/data/todo";
import { Todo, TodoCreateInputTypes, TodoUpdateInputTypes } from "@/domain/model/todo";
import { TodoRepository } from "@/domain/repository/todo";
import { QueryKey } from "@/utils/helper/query-key";
import { IToastLoading, IToastSuccess } from "@/utils/helper/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useVM() {
    const queryClient = useQueryClient()
    const todoRepo: TodoRepository = new TodoApiRepository();

    const [isEditing, setIsEditing] = useState(false)
    const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);


    // GET ALL TODO ===========================================================================
    const { data: todoListData, isLoading: isTodoListLoading, isFetching: isTodoListFetching, isError: todoListError } = useQuery({
        queryKey: [QueryKey.getAllTodo],
        queryFn: () => todoRepo.getAll(),
    })


    // GET TODO ===========================================================================
    const { data: todoData, isLoading: isTodoLoading, isFetching: isTodoFetching, isError: todoError } = useQuery({
        queryKey: [QueryKey.getTodo, selectedTodoId],
        queryFn: () => selectedTodoId ? todoRepo.get(selectedTodoId) : Promise.reject("No ID provided"),
        enabled: !!selectedTodoId && isEditing, // Only run the query if selectedTodoId has a value & in editing mode
    })



    // MUTATION SECTION ===========================================================================
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<TodoCreateInputTypes>({
        values: { task: isEditing ? todoData?.task || '' : '' },
    });
    const resetFormAfterSelectTodoId = () => {
        setSelectedTodoId(null)
    };


    // CREATE TODO ===========================================================================
    const { mutate: mutateCreate, error: createErr, isPending: isCreatePending } = useMutation({
        onSuccess: () => {
            reset(); // Reset the form after submission
            IToastSuccess('Task Added Successfully')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.getAllTodo] })
        },
        mutationFn: (input: TodoCreateInputTypes) => todoRepo.create(input)
    })
    const onSubmit = (data: TodoCreateInputTypes) => {
        mutateCreate(data)
    }


    // UPDATE TODO ===========================================================================
    const { mutate: mutateUpdate, error: updateErr, isPending: isUpdatePending } = useMutation({
        onSuccess: () => {
            resetFormAfterSelectTodoId(); // Reset the form after submission
            setIsEditing(false)
            IToastSuccess('Task Updated Successfully')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.getAllTodo] })
            queryClient.invalidateQueries({ queryKey: [QueryKey.getTodo, selectedTodoId] })
        },
        mutationFn: (input: TodoUpdateInputTypes) => {
            if (!selectedTodoId) {
                throw new Error("No ID provided for update");
            }
            return todoRepo.update(selectedTodoId, input);
        }
    })
    const onUpdate = (data: TodoCreateInputTypes) => {
        mutateUpdate(data)
    }

    const onSelectTodoToUpdate = (id: string) => {
        setSelectedTodoId(id)
        setIsEditing(true)
    }

    const onCompleteTodo = (id: string) => {
        setSelectedTodoId(id)
        mutateUpdate({ completed: true })
    }

    const onUncheckTodo = (id: string) => {
        setSelectedTodoId(id)
        mutateUpdate({ completed: false })
    }

    const onCancelUpdate = () => {
        resetFormAfterSelectTodoId();
        setIsEditing(false)
    }


    // DELETE TODO ===========================================================================
    const { mutate: mutateDelete, error: deleteErr, isPending: isDeletePending } = useMutation({
        onSuccess: () => {
            reset(); // Reset the form after submission
            IToastSuccess('Task Deleted Successfully')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.getAllTodo] })
        },
        mutationFn: (id: string) => todoRepo.delete(id)
    })
    const onDel = (id: string) => {
        mutateDelete(id)
    }


    return {
        isEditing, setIsEditing,
        register, handleSubmit, reset, errors,
        setSelectedTodoId,

        todoListData, isTodoListLoading, isTodoListFetching, todoListError,
        todoData, isTodoLoading, isTodoFetching, todoError,

        isCreatePending, onSubmit,
        createErr: (createErr as any)?.response?.data?.detail,
        isUpdatePending, onUpdate, onSelectTodoToUpdate, onCompleteTodo, onUncheckTodo, onCancelUpdate,
        updateErr: (updateErr as any)?.response?.data?.detail,
        isDeletePending, onDel,
        deleteErr: (deleteErr as any)?.response?.data?.detail,

    }
}