import ErrorCard from "@/components/card/error-card"
import { Button } from "@/components/input/button"
import InputText from "@/components/input/input-text"
import LoadingBtn from "@/components/input/loading-btn"
import { primaryGradient } from "@/utils/helper/color"
import { cn } from "@/utils/helper/style-merger"
import { ArrowRight, Lock, Mail, User } from "lucide-react"
import { Link } from "react-router-dom"
import useSignInVM from "./_useSigninVM"
import { useState } from "react"

export default function Signin() {
    const model = useSignInVM()
    const [isGuest, setIsGuest] = useState(false)

    return <main className={cn(`flex min-h-screen items-center justify-center dark:bg-black`)}>
        <section className="p-9 rounded-lg border-2 border-black">

            <nav className="flex mb-4 mx-auto w-fit">
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "px-4 py-2 border rounded-r-none",
                        isGuest ? "border-gray-300 text-gray-500" : "bg-blue-100 border-blue-500 text-black"
                    )}
                    onClick={() => setIsGuest(false)}
                >
                    User
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "px-4 py-2 border rounded-l-none",
                        isGuest ? "bg-blue-100 border-blue-500 text-black" : "border-gray-300 text-gray-500"
                    )}
                    onClick={() => setIsGuest(true)}
                >
                    Guest
                </Button>
            </nav>

            {isGuest ? <div className="text-center">
                <Button type="button" onClick={model.onLoginAsGuest}
                    className={cn("w-fit mt-2 dark:text-white bg-[#48AA52] hover:bg-[#57c262]")}>
                    Login
                </Button>
            </div>
                : <form onSubmit={model.handleSubmit(model.onSubmit)} className="flex flex-col items-center gap-2">
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

                    <LoadingBtn title="Login"
                        type="submit"
                        className={cn("w-fit mt-9 dark:text-white bg-[#48AA52] hover:bg-[#57c262]")}
                        loading={model.isPending}
                        disabled={model.isPending}
                    />

                    <div className="mt-2 text-center text-xs">
                        Don&apos;t have an account?{""}
                        <Link to="/auth/signup">
                            <Button type="button" variant="link">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </form>}

        </section>
    </main>
}