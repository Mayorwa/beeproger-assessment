import {useState, useEffect} from "react";
import {Button} from "../components/ui/Button";
import {Overlay} from "../components/ui/Overlay";
import {Loader} from "../components/ui/loaders/Loader";
import {LoadingError} from "../components/ui/loaders/LoadingError";
import {TaskCard} from "../components/TaskCard";
import {CreateTaskFormInterface, TaskInterface} from "../interfaces/TaskInterface";
import {API} from "../utils/api";
import styles from '../assets/css/index.module.css'
import {CreateOrUpdateTaskModal} from "../components/ui/CreateOrUpdateTaskModal";

export const Index = (): JSX.Element => {
    const [overlayTasksDetails, setOverlayTasksDetails] = useState<TaskInterface>({
        id: '',
        title: '',
        description: '',
        status: '',
        created_at: ''
    })
    const [overlayVisibility, setOverlayVisibility] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TaskInterface[]>([])
    const [actionType, setActionType] = useState<string>('create')
    const [pendingTasks, setPendingTasks] = useState<TaskInterface[]>([])
    const [completedTasks, setCompletedTasks] = useState<TaskInterface[]>([])
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

    useEffect(() => {
         getAllTasks();
    }, []);

    useEffect(() => {
        setPendingTasks(tasks.filter(task => task.status === 'pending'));
        setCompletedTasks(tasks.filter(task => task.status === 'completed'));
    },[tasks])

    const getAllTasks = async () => {
        setLoading(true)
        setHasError(false)
        await API.getAllTasksResponse().then(response => {
            setTasks(response.data.data)
        }).catch(() => {
            setHasError(true)
        }).finally(() => setLoading(false));
    };

    tasks.sort((a: TaskInterface, b:TaskInterface) => (a.status > b.status) ? 1 : -1)

    const markTaskAsComplete = async (id: string) => {
        await API.markTaskAsCompleted({ 'item_id': id }).then(() => {
            setTasks(tasks.map((task) =>
                task.id === id ? {...task, status: 'completed'} : task
            ))
        }).catch(() => {
            setHasError(true)
        }).finally(() => setLoading(false));
    }

    const deleteTask = async (id: string) => {
        await API.deleteTaskResponse(id).then(() => {
            setTasks(tasks.filter((task) =>
                task.id !== id
            ))
        }).catch(() => {
            setHasError(true)
        }).finally(() => setLoading(false));
    }

    const createOrEditTask = async (payload: CreateTaskFormInterface) => {
        if (actionType === 'create'){
            await API.createTaskResponse(payload).then(() => {
                getAllTasks()
            }).catch(() => {
                setHasError(true)
            }).finally(() => setLoading(false));
        }
        else{
            await API.updateTaskResponse(payload, overlayTasksDetails.id).then(() => {
                getAllTasks()
            }).catch(() => {
                setHasError(true)
            }).finally(() => setLoading(false));
        }
    }

    const toggleEditTask = () => {
        setActionType('edit')
        setOverlayVisibility(false)
        setCreateTaskModalOpen(true)
    }

    const toggleTaskOverlay = (type: 'close' | 'open', id?: string,) => {
        document.documentElement.scrollTo(0, 0);
        if (type === 'open'){
            let task = tasks.find(task => task.id === id)
            if (task) {
                setOverlayTasksDetails(task)
                setOverlayVisibility(true)
            }
        }
        else{
            let task = {
                id: '',
                title: '',
                description: '',
                status: '',
                created_at: ''
            }
            setOverlayTasksDetails(task)
            setOverlayVisibility(false)
        }
    }

    return (
        <div>
            {loading && <><Loader display="To-do List"/></>}
            {hasError && <><LoadingError display="There was a problem loading tasks!" /></>}
            {(!loading && !hasError) &&
                <>
                    <Button loading={false}
                            withIcon="plus"
                            disabled={false}
                            onClick={() => setCreateTaskModalOpen(true)}
                            body={<span className="ml-3">New Task</span>}/>
                    <div>
                        <h1>Pending Tasks</h1>
                        <div className={styles.taskContainer}>
                            {
                                pendingTasks.length === 0 &&
                                <>
                                    <div className={styles.emptyState}>
                                        You have no tasks yet, click on the add task button to create tasks
                                    </div>
                                </>
                            }

                            {
                                pendingTasks.map((task: TaskInterface) => (
                                        <TaskCard onComplete={markTaskAsComplete}  viewTaskDetails={(id) => toggleTaskOverlay('open', id)} key={task.id} task={task}/>
                                    )
                                )
                            }
                        </div>
                    </div>

                    <div>
                        <h1>Completed Tasks</h1>
                        <div className={styles.taskContainer}>
                            {
                                completedTasks.length === 0 &&
                                <>
                                    <div className={styles.emptyState}>
                                        You have not completed any task yet
                                    </div>
                                </>
                            }

                            {
                                completedTasks.map((task: TaskInterface) => (
                                        <TaskCard onComplete={markTaskAsComplete} viewTaskDetails={(id) => toggleTaskOverlay('open', id)} key={task.id} task={task}/>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <CreateOrUpdateTaskModal showOverlay={isCreateTaskModalOpen} closeOverlay={() => setCreateTaskModalOpen(false)} onCreateOrUpdateTask={(payload) => {setCreateTaskModalOpen(false); createOrEditTask(payload) }} type={actionType} task={overlayTasksDetails} />
                    <Overlay loading={false} showOverlay={overlayVisibility} task={overlayTasksDetails} onComplete={(id) => {toggleTaskOverlay('close'); markTaskAsComplete(id)}} closeOverlay={() => toggleTaskOverlay('close')} onDelete={(id) => {toggleTaskOverlay('close'); deleteTask(id)}} onEdit={toggleEditTask} />
                </>
            }
        </div>

    )
}