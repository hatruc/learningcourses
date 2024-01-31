
import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '../../../../assets/images';

import { useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles)

const Header = () => {

    const params = useParams()
    const navigate = useNavigate()
    const handleClickHome = () => {
        navigate('/')
    }

    return (

        <div className={cx('header-container')}>

            <div className={cx('header-wrapper')}>

                <div className={cx('header-left')}>

                    <div onClick={handleClickHome} className={cx('header-back')}>
                        <FontAwesomeIcon className={cx('header-back-icon')} icon={faAngleLeft} />
                    </div>

                    <div className={cx('header-title')}>

                        <a onClick={handleClickHome} className={cx('header-title-link')}>
                            <img src={images.logo} alt='LOGO' />
                        </a>

                        {/* <div className={cx('header-title-name')}>
                            {course.name}
                        </div> */}

                    </div>

                </div>

                <div className={cx('header-actions')}>

                    <div className={cx('header-progress-bar')}>

                        <p className={cx('header-course-complete')}>

                            {/* <strong>

                                <span className={cx('header-num')}>{course.completeLesson}</span>
                                /
                                <span className={cx('header-num')}>{course.totalLesson}</span>
                                {' '}
                                Bài Học

                            </strong> */}

                        </p>

                        <button className={cx('header-guide-btn')}>

                            <FontAwesomeIcon icon={faQuestionCircle} />

                            <span className={cx('header-guide-btn-label')}>Hướng dẫn</span>

                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Header