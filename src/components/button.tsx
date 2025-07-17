import type { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    state?: "inverse" | "danger" | "decolor",
}

export default function Button({ 
    className, 
    state, 
    ...props 
}: ButtonProps) {
    return (
        <button
            data-state={state}
            className="btn"
            {...props}
        />
    )
}
