
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from './Footer';

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
    return (
        <div >

            <Header />

            <div className={cx('container')}>

                <Sidebar />

                <div className={cx('content')}>{children}</div>

            </div>

            <Footer />

        </div>
    )
}

export default DefaultLayout