import {TaskInterface} from "../interfaces/TaskInterface";
import {Button} from "./ui/Button";
import {isTaskPending} from "../utils/helper";
interface TaskCardPropsInterface{
    task: TaskInterface,
    onComplete: (id: string) => void
    viewTaskDetails: (id: string) => void
}
export const TaskCard = ({ task, onComplete, viewTaskDetails}: TaskCardPropsInterface) => {

    return (
            <div className="single-task">
                {
                    task.image &&
                    <div className="single-task__img">
                        <img src={task.image} alt=""/>
                    </div>
                }
                <div className="single-task__details">
                    <h2 className="title">{task.title}</h2>
                    <p className="description">{task.description}</p>
                </div>
                <div className="single-task__actions">
                    <>
                        {
                            isTaskPending(task.status) ?
                            <Button loading={false}
                                    withIcon="checkmark"
                                    disabled={false}
                                    onClick={() => onComplete(task.id)}
                                    body={<span className="ml-2">Complete</span>}/>
                            :
                                <Button loading={false}
                                        withIcon="checkmark-circle"
                                        disabled={true}
                                        body={<span className="ml-2">Completed</span>}/>
                        }
                    </>
                    <Button loading={false}
                            withIcon="open-in-tab"
                            disabled={false}
                            btnClass='mt-2'
                            onClick={() => viewTaskDetails(task.id)}
                            body={<span className="ml-2">View Details</span>}/>
                </div>
            </div>
    )
}