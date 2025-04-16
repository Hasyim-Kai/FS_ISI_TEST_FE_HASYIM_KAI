import { cn } from '@/utils/helper/style-merger'
import { RefreshCw } from 'lucide-react'

type Props = {
    className?: string
    isSmall?: boolean
}

export default function Loading({ className, isSmall = false }: Props) {
    return <div className={cn(`flex justify-center items-center w-full h-full`, className)}>
        <RefreshCw size={isSmall ? 16 : 24} className='animate-spin' />
    </div>
}