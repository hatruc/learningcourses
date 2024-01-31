
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { getOneCourseApi } from '../../../../services/CourseService';
import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import MenuComponent from './MenuComponent';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

const Sidebar = () => {

    const [courseData, setCourseData] = useState({})

    const params = useParams()

    useEffect(() => {
        fetchCourseDetail(params.courseName)
    }, [])

    const fetchCourseDetail = async (courseName) => {
        let response = await getOneCourseApi(courseName)
        if (response && response.EC === 0) {
            setCourseData(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <div className={cx('sidebar-container')}>

            <h1 className={cx('sidebar-heading')}>Nội Dung Khóa Học</h1>

            <MenuComponent currentCourseId={courseData.id} />

        </div>
    )
}

export default Sidebar