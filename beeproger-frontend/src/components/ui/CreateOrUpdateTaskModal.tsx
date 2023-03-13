import {Form, Formik, FormikHelpers} from "formik";
import {FormValidationError} from "./FormValidationError";
import {TextInput} from "./TextInput";
import {TextArea} from "./TextArea";
import {ChangeEvent, useState, useEffect} from "react";
import {Button} from "./Button";
import {API} from "../../utils/api";
import * as Yup from "yup";
import ReactDOM from "react-dom";
import {CreateTaskFormInterface, TaskInterface} from "../../interfaces/TaskInterface";
import {AxiosResponse} from "axios";

interface CreateTaskModalInterface{
    showOverlay: boolean,
    closeOverlay: () => void
    onCreateOrUpdateTask: (payload: CreateTaskFormInterface) => void
    task?: TaskInterface
    type: string
}

export const CreateOrUpdateTaskModal = ({showOverlay, closeOverlay, onCreateOrUpdateTask, task, type = 'create'}: CreateTaskModalInterface) => {

    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const formValidation = () => Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
    });

    useEffect(() => {
        if(task?.title && task?.description){
            setFormInitialValues({title: task?.title, description: task?.description})
        }
    }, [task]);


    const [formInitialValues, setFormInitialValues] = useState(
        {
            title: '',
            description: '',
        }
    );


    const createOrUpdateTask = (formValues: CreateTaskFormInterface, actions: FormikHelpers<CreateTaskFormInterface>) => {
        setFormError("")
        actions.setSubmitting(true);
        const payload : CreateTaskFormInterface = {
            title: formValues.title,
            description: formValues.description,
        }
        if(formValues.image){
            const file = formValues.image;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'a2r2gj3k');
            setLoading(true)
            API.uploadFileToCloudinary(formData).then((response: AxiosResponse) => {
                payload.image = response.data.secure_url

                onCreateOrUpdateTask(payload)
                setFormInitialValues({
                    title: '',
                    description: '',
                })
            }).catch(error => {
                console.log('error', error)
            }).finally(() => setLoading(false))
        }
        else{
            onCreateOrUpdateTask(payload)
        }
    }

    if (!showOverlay) return null
    return ReactDOM.createPortal(
        <>
            <div className="overlay-mask" onClick={closeOverlay}>
                <div className="overlay" onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                    <div className="overlay-inner">

                        { type === 'create' ?
                            <h3 className="title">Create A Task</h3>
                            :
                            <h3 className="title">Edit Task</h3>
                        }

                        <div>
                            <Formik
                                initialValues={formInitialValues}
                                validationSchema={formValidation}
                                enableReinitialize
                                onSubmit={(formValues: CreateTaskFormInterface, actions: FormikHelpers<CreateTaskFormInterface>) => createOrUpdateTask(formValues, actions)}>
                                {({setFieldValue, isValid, dirty}) => (
                                    <Form>
                                        <FormValidationError formError={formError}/>

                                        <TextInput
                                            label="Title"
                                            placeholder="Enter Task Title"
                                            name="title"
                                            type="text"
                                            min="4"
                                            required
                                        />
                                        <TextArea
                                            label="Description"
                                            placeholder="what is this task about"
                                            name="description"
                                            rows={10}
                                            required
                                        />

                                        <input id="file" name="file" type="file" accept="image/png, image/svg, image/jpg, image/jpeg" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            if(event?.currentTarget?.files)setFieldValue("image", event?.currentTarget?.files[0]);
                                        }} />
                                        <div className="add-task__footer">
                                            <Button loading={loading}
                                                    type="submit"
                                                    disabled={  !dirty || !isValid}
                                                    onClick={() => {}}
                                                    body={type === 'create' ? 'Create Task' : 'Edit Task'}/>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
    </>,
        document.getElementById('portal') as HTMLElement
    )
}