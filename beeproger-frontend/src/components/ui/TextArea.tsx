import {useField} from "formik";

export const TextArea = ({label, ...props}: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group">
                <label htmlFor={props.id || props.name}>{label}</label>
                <textarea className="form-control" {...field} {...props} />
                {meta.touched && meta.error && <>
                    <div className="text-danger small mt-2">{meta.error}</div>
                </>}
            </div>
        </>
    );
};
