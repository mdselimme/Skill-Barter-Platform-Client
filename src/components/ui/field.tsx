import * as React from "react"

import { cn } from "@/lib/utils"

function Field({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="field" className={cn("space-y-2", className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
    return (
        <label
            data-slot="field-label"
            className={cn("text-sm leading-none font-medium", className)}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="field-content" className={cn("space-y-2", className)} {...props} />
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="field-error"
            className={cn("text-xs text-destructive", className)}
            role="alert"
            {...props}
        />
    )
}

export { Field, FieldContent, FieldError, FieldLabel }