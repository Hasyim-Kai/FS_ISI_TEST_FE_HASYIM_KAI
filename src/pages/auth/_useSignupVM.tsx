import { AuthApiRepository } from "@/data/auth/auth-repository-api";
import { SignUpInputTypes } from "@/domain/model/auth";
import { IToastSuccess } from "@/utils/helper/toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function useSignUpVM() {
    const router = useNavigate()
    const authRepo = new AuthApiRepository();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignUpInputTypes>();
    const { mutate, error: signinErr, isPending } = useMutation({
        onSuccess: () => {
            router("/auth/signin")
            IToastSuccess('Sign up success')
        },
        mutationFn: (input: SignUpInputTypes) => authRepo.signup(input)
    })
    const onSubmit = (data: SignUpInputTypes) => { mutate(data) }


    return {
        register, handleSubmit, watch, errors,
        isPending, onSubmit,
        signinErr,

    }
}