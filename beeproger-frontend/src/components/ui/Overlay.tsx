import ReactDOM from "react-dom";
import {TaskInterface} from "../../interfaces/TaskInterface";
import {Button} from "./Button";
import {isTaskPending} from "../../utils/helper";

interface OverlayInterface{
    loading: boolean,
    showOverlay: boolean,
    task: TaskInterface,
    onComplete: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (id: string) => void
    closeOverlay: () => void
}

export const Overlay = ({loading, showOverlay, task, onComplete, closeOverlay, onDelete, onEdit}: OverlayInterface) => {
    if (!showOverlay) return null
    return ReactDOM.createPortal(
        <>
            <div className="overlay-mask" onClick={closeOverlay}>
                <div className="overlay" onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                    <div className="overlay__task-details">
                        {
                            task.image && <div className="image">
                                <img src={task.image} alt=""/>
                            </div>
                        }
                        <div>
                            <h2 className="description">{task.title}</h2>
                        </div>
                        <div>
                            <p className="description">{task.description}</p>
                        </div>
                        <div>
                            <p className={isTaskPending(task.status) ? 'pill-danger' : 'pill-success' }>{task.status}</p>
                        </div>
                        <>
                            {
                                isTaskPending(task.status) ?
                                    <Button loading={false}
                                            withIcon="checkmark"
                                            disabled={false}
                                            onClick={() => onComplete(task.id)}
                                            body={<span className="ml-2">Mark As Complete</span>}/>
                                    :
                                    <Button loading={false}
                                            withIcon="checkmark-circle"
                                            disabled={true}
                                            body={<span className="ml-2">Completed</span>}/>
                            }
                        </>
                        <Button loading={false}
                                withIcon="edit"
                                disabled={false}
                                btnClass='ml-2'
                                onClick={onEdit}
                                body={<span className="ml-2">Edit</span>}/>
                        <Button loading={false}
                                withIcon="trash"
                                disabled={false}
                                btnClass='ml-2'
                                onClick={() => onDelete(task.id)}
                                body={<span className="ml-2">Remove</span>}/>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal') as HTMLElement
    )
}
