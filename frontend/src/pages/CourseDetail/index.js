import React, { useState, useEffect, useRef } from 'react'

import classNames from "classnames/bind"
import styles from "./CourseDetail.module.scss"

import MenuCourseComponent from './MenuCourseComponent'
import { getAllLessonOfCourseApi, getOneCourseApi } from '../../services/CourseService'

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Row, Col } from 'antd'

const cx = classNames.bind(styles)

const CourseDetail = () => {

    const [courseData, setCourseData] = useState({})
    const [allLesson, setAllLesson] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchCourseDetail(params.courseName)
        fetchAllLessonsOfCourse(courseData.id)
    }, [])

    const fetchCourseDetail = async (courseName) => {
        let response = await getOneCourseApi(courseName)
        if (response && response.EC === 0) {
            setCourseData(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const fetchAllLessonsOfCourse = async (courseId) => {
        let response = await getAllLessonOfCourseApi(courseId)
        if (response && response.EC === 0) {
            console.log(response);
            setAllLesson(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleLearningCourse = (courseName) => {
        if (courseData.totalLesson !== 0) {
            navigate(`/course/${courseName}/1`)
        } else {
            toast.error('Khóa Học Đang Được Xây Dựng !')
        }
    }

    return (

        <div className={cx('course-detail-wrapper')}>

            <Row className={cx('course-detail-container')}>

                <Col className={cx('content-left')} span={16}>

                    <div className={cx('wrapper')}>

                        <h1 className={cx('course-name')}> {courseData.courseName} </h1>

                        <p className={cx('content-text')}>
                            {courseData.contentText}
                        </p>

                        <div className={cx('content-course')}>

                            <div className={cx('course')}>

                                <h5 className={cx('title')}>
                                    Nội Dung Khóa Học
                                </h5>

                                <div className={cx('course-info-wrapper')}>
                                    <ul className={cx('course-info')}>
                                        <li className={cx('lesson')}> {courseData.totalLesson} Bài Học </li>
                                        <li>.</li>
                                        <li className={cx('duration')}> 100 Giờ 00 phút </li>
                                    </ul>
                                </div>

                            </div>

                            <MenuCourseComponent currentCourseId={courseData.id} />

                        </div>

                    </div>

                </Col>

                <Col className={cx('content-right')} span={8}>

                    <div className={cx('wrapper')}>

                        <h2 className={cx('heading')}>FREE</h2>

                        <div className={cx('content')}>
                            <p className={cx('level')}>Trình độ: {courseData.level}</p>
                            <p className={cx('total-lesson')}>Tổng số {courseData.totalLesson} bài học</p>
                            <p className={cx('duration')}>Thời lượng 100 giờ 00 phút</p>
                            <p className={cx('slogan')}>Học mọi lúc mọi nơi</p>

                            <button onClick={() => handleLearningCourse(courseData.courseName)} type="button" className="btn btn-primary">Học Ngay</button>
                        </div>

                    </div>

                </Col>

            </Row>

        </div>

    )
}

export default CourseDetail