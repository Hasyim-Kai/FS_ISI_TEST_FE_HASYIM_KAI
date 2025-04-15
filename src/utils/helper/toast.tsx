import { Button } from "@/components/input/button";
import Loading from "@/components/Loader/loading";
import { X } from "lucide-react";
import { toast } from "sonner";

const toastConfig = {
    action: {
        label: <X size={16} />,
        onClick: () => console.log('Undo')
    },
}

export function IToast(title: string = `🦄 Wow so easy!`, desc?: string) {
    toast(title, {
        ...toastConfig,
        description: desc ? desc : null
    })
}

export function IToastDesc(title: string = `🦄 Wow so easy!`, desc?: string) {
    toast.message(title, {
        ...toastConfig,
        description: desc ? desc : null
    })
}

export function IToastLoading(title: string = `🦄 Wow so easy!`, desc?: string) {
    toast(<div className="flex gap-3 items-center w-full">
        <Loading isSmall className="w-fit" />
        <div className="w-full">
            <h1 className="font-semibold">{title}</h1>
            {desc && <p className="text-xs text-slate-400">{desc}</p>}
        </div>
        <Button size={`icon`} className="h-7 w-11"><X size={16} /></Button>
    </div>);
}

export function IToastSuccess(title: string = `🦄 Wow so easy!`, desc?: string) {
    toast.success(title, {
        ...toastConfig,
        description: desc ? desc : null
    });
}

export function IToastFail(title: string = `🦄 Wow so easy!`, desc?: string) {
    toast.error(title, {
        ...toastConfig,
        description: desc ? desc : null
    });
}