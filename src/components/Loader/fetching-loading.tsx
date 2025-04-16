import Loading from "./loading"

type Props = {}

export default function FetchingLoading({ }: Props) {
    return <Loading className='fixed bottom-7 right-5 w-fit h-fit p-3 rounded-lg shadow-lg border bg-white' />
}