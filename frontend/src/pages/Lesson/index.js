import React, { useEffect, useState } from "react"
import { getOneLessonApi } from "../../services/LessonService"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { userSelector } from "../../features/user/userSlice"
import classNames from "classnames/bind"
import styles from "./Lesson.module.scss"

const cx = classNames.bind(styles)

const Lesson = () => {

    const [lesson, setLesson] = useState('')
    const params = useParams()
    const user = useSelector(userSelector)

    useEffect(() => {
        fetchLessonApi(params.lessonId)
    }, [params.lessonId])

    const fetchLessonApi = async (id) => {
        const response = await getOneLessonApi(user.access_token, id)
        if (response && response.DT && response.EC === 0) {
            setLesson(response.DT.video)
        } else {
            // toast.error(response.EM)
        }
    }

    return (
        <div className={cx('lesson-container')}>
            {/* <p style={{ alignContent: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: '300' }}>Tính năng đang được hoàn thiện ...</p> */}
            <div className={cx('lesson-wrapper')}>
                <video src={lesson} width="1000" height="600" controls >
                    {/* <source src={''}
                        type="video/webm"
                    /> */}
                </video>
            </div>
        </div>

    )
}

export default Lesson
