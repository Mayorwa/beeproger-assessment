export const FormValidationError = (props: { formError: string }): JSX.Element => {
    return <>
        {
            props.formError && <div className="alert alert-danger">
                <p className="mb-0">{props.formError}</p>
            </div>
        }
    </>;
}

