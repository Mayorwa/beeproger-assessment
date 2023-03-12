import {Icon} from "../components/ui/Icon";
import styles from '../assets/css/index.module.css'

export const Index = (): JSX.Element => {
    return (
        <div>
            <p className={styles.addTask}>
                <Icon name="plus" viewBox="0 0 20 20" />
                <span className="ml-3">New Task</span>
            </p>
            This is the home page
        </div>
    )
}