import { cn } from '@/utils/helper/style-merger'
import { TriangleAlert } from 'lucide-react'

type Props = {
    msg?: string | string[]
    className?: string
}

export default function ErrorCard({ msg = `Something went wrong`, className }: Props) {
    return <div className={cn("text-sm font-medium border-2 bg-red-100 border-red-400 rounded-md p-4", className)}>
        <div className='mb-1 text-red-500 flex items-center gap-1 text-base'>
            <TriangleAlert size={18} /><h1>Warning</h1>
        </div>
        {Array.isArray(msg)
            ? msg.map((msg, index) => <p className='my-0.5 dark:text-slate-800' key={index}>- {msg}</p>)
            : <p className='my-0.5 dark:text-slate-800'>{msg || `Something went wrong`}</p>}
    </div>
}