import { ArrowRight } from 'lucide-react'
import React from 'react'
import Loading from '../Loader/loading'
import { cn } from '@/utils/helper/style-merger'
import { Button } from './button'

type Props = {
    className?: string
    type: "submit" | "button" | "reset",
    title?: string
    disabled?: boolean
    loading?: boolean
    icon?: React.ReactNode
    onClickFn?: () => void
}

export default function LoadingBtn({
    className,
    type,
    title = 'Submit',
    disabled = false,
    loading = false,
    onClickFn = () => { },
    icon = <ArrowRight size={18} color="white" />, }: Props) {

    return <Button type={type} disabled={disabled}
        className={cn(`items-center gap-2`, className)} onClick={onClickFn}>
        {title}
        {loading ? <Loading className='w-fit' isSmall /> : icon}
    </Button>
}