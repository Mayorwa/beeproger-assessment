import {Icon} from "./Icon";
interface ButtonData{
    loading: boolean
    disabled: boolean
    btnClass?: string
    withIcon?: string
    type?: "button" | "submit" | "reset" | undefined
    title?: string
    onClick?: any
    body: any
}
export const Button = ({loading, disabled, btnClass, withIcon, body, type, onClick, title }: ButtonData) => {
    const classes = () => {
        const compiled_class = btnClass ? btnClass: ''

        return `button ${compiled_class}`
    }

    const buttonIcon = () => {
        if (withIcon) return <Icon name={withIcon}/>
        return ''
    }

    return (
        <>
            <button
                className={classes()}
                type={type ?? "button"}
                disabled={disabled || loading}
                onClick={onClick ?? (() =>{})}
                title={title}
            >
                {
                    loading ?
                        <span>Loading...</span>
                        : withIcon ? <>{buttonIcon()} {body}</>: body
                }
            </button>
        </>
    )
}
