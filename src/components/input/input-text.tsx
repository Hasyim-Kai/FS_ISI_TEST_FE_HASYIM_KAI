import React, { forwardRef } from "react";
import { cn } from "@/utils/helper/style-merger";

type TInputProps = {
    type?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    error?: boolean;
    step?: number;
    // errorText?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    value?: string;
    // [key: string]: any;
};

const InputText = forwardRef<HTMLInputElement, TInputProps>(({
    type = "text",
    placeholder = "",
    className,
    label,
    step = 1,
    error = false,
    // errorText,
    icon,
    disabled = false,
    ...props
}: TInputProps, ref) => {

    return <div className={cn("flex flex-col",)}>
        {label && <label className="text-xs" >{label}</label>}

        <div className="relative mt-1">
            {icon && <div className="absolute top-1/2 -translate-y-1/2 left-3">
                {icon}
            </div>}
            <input type={type} step={step} placeholder={placeholder}
                disabled={disabled} ref={ref} {...props}
                className={cn(`py-2 rounded-md w-full border border-black`, icon ? 'pl-10' : '', className)} />
        </div>

        <div className="">
            {error && <span className="text-sm text-red-500 mt-2">{"Required"}</span>}
        </div>
    </div>
})

InputText.displayName = 'InputText';

export default InputText;
