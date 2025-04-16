import { AuthApiRepository } from "@/data/auth/auth-repository-api";
import { SignInInputTypes, SignInResTypes } from "@/domain/model/auth";
import { useAppContext } from "@/store";
import { appConfig } from "@/utils/app-config";
import { IToastSuccess } from "@/utils/helper/toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function useSignInVM() {
    const { dispatch } = useAppContext()
    const router = useNavigate()
    const authRepo = new AuthApiRepository();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignInInputTypes>();
    const { mutate, error: signinErr, isPending } = useMutation({
        onSuccess: (data: SignInResTypes) => {
            localStorage.setItem(`${appConfig.localStorageName}`, JSON.stringify({ token: data.token }))
            dispatch({ type: "SET_USER", payload: { user_id: data.user_id, username: data.username, email: data.email, isGuest: false } })
            router("/")
            IToastSuccess('Welcome back', 'Have a look on our goods catalog')
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: [QueryKey.userInfo] }),
        mutationFn: (input: SignInInputTypes) => authRepo.signin(input)
    })
    const onSubmit = (data: SignInInputTypes) => { mutate(data) }


    const onLoginAsGuest = () => {
        dispatch({ type: "SET_USER", payload: { isGuest: true } })
        router("/")
    }

    // if already have jwt token, redirect to dashboard
    useEffect(() => {
        const jsonToken = localStorage.getItem(appConfig.localStorageName);
        const jsonParse = jsonToken ? JSON.parse(jsonToken) : { token: null };
        if (jsonParse.token) {
            router("/")
        }
    }, [])



    return {
        register, handleSubmit, watch, errors,
        isPending, onSubmit, onLoginAsGuest,
        signinErr,

    }
}