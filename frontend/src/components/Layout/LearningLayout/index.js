
import classNames from 'classnames/bind';
import styles from './LearningLayout.module.scss'
import Header from "./Header";
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles)

const LearningLayout = ({ children }) => {
    return (
        <div >

            <Header />

            <div className={cx('container')}>

                <div className={cx('content')}>{children}</div>

                <Sidebar />

            </div>

        </div>
    )
}

export default LearningLayout