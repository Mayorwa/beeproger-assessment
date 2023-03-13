import {useField} from "formik";

export const TextInput = ({label, ...props}: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group">
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="form-control" {...field} {...props} />
                {
                    props.help && <div className="text-muted small">{props.help}</div>
                }
                {meta.touched && meta.error && <>
                    <div className="text-danger small mt-2">{meta.error}</div>
                </>}
            </div>
        </>
    );
};
