import DefaultLayout from '@/components/layout/default-layout';
import { useAppContext } from '@/store';

type Props = {}

export default function index({ }: Props) {
    const { state } = useAppContext()

    return <DefaultLayout>
        <main className="relative px-5 lg:px-0 flex min-h-screen max-w-4xl mx-auto flex-col items-center">
            <div className='my-auto'>
                {state.user.isGuest ? <h1 className="text-center">Hello Guest</h1>
                    : <>
                        <p className="text-center">Email: {state.user.email}</p>
                        <p className="text-center">Fullname: {state.user.username}</p>
                    </>}
            </div>
        </main>
    </DefaultLayout>
}