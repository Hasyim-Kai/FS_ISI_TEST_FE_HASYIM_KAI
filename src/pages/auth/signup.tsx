
import { primaryGradient } from "@/utils/helper/color"
import { cn } from "@/utils/helper/style-merger"
import { ArrowRight, Lock, Mail, User } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/input/button"
import LoadingBtn from "@/components/input/loading-btn"
import InputText from "@/components/input/input-text"
import ErrorCard from "@/components/card/error-card"
import useSignUpVM from "./_useSignupVM"

export default function Signin() {
    const model = useSignUpVM()

    return <main className={cn(`flex min-h-screen items-center justify-center dark:bg-black`)}>
        <section className="p-9 rounded-lg border-2 border-black">

            <form onSubmit={model.handleSubmit(model.onSubmit)} className="flex flex-col items-center gap-2">
                <InputText
                    label="Username"
                    type="text"
                    placeholder="Sugiono"
                    icon={<User size={18} color="gray" />}
                    {...model.register("username", { required: true })}
                    error={!!model.errors.username}
                />
                <InputText
                    label="Email"
                    type="email"
                    placeholder="sugiono@gmail.com"
                    icon={<Mail size={18} color="gray" />}
                    {...model.register("email", { required: true })}
                    error={!!model.errors.email}
                />
                <InputText
                    label="Password"
                    type="password"
                    icon={<Lock size={18} color="gray" />}
                    {...model.register("password", { required: true })}
                    error={!!model.errors.password}
                />

                {model.signinErr && <ErrorCard msg={`Invalid credentials or Something went wrong`} />}

                <LoadingBtn title="Register"
                    type="submit"
                    className={cn("w-fit mt-9 dark:text-white bg-[#48AA52] hover:bg-[#57c262]")}
                    loading={model.isPending}
                    disabled={model.isPending}
                />

                <div className="mt-2 text-center text-xs">
                    Already have an account?{""}
                    <Link to="/auth/signin">
                        <Button type="button" variant="link">
                            Sign in
                        </Button>
                    </Link>
                </div>
            </form>

        </section>
    </main>
}