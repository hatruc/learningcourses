import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Table } from 'antd';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import { deleteCourse, getAllCoursesApi } from '../../services/CourseService';
import { toast } from 'react-toastify';
import styles from './ManageCourse.module.scss'
import classNames from 'classnames/bind';
import ModalCourse from './ModalCourse';
import { useNavigate, useParams } from 'react-router-dom';
import ModalDelete from './ModalDelete';
import firebase from '../../setup/firebase/firebase'

const cx = classNames.bind(styles)

const ManageCourse = () => {

    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector(userSelector)

    // Modal delete
    const [dataModal, setDataModal] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    const [allCourse, setAllCourse] = useState([])
    const [course, setCourse] = useState({})
    const [state, setState] = useState({
        isOpenModalCreate: false,
        isOpenModalUpdate: false,
    })

    useEffect(() => {
        fetchAllCourse()
    }, [])

    const fetchAllCourse = async () => {
        let response = await getAllCoursesApi(params.courseId)
        if (response && response.EC === 0) {
            setAllCourse(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleUpdateCourse = (course) => {
        setCourse(course)
        setState({ ...state, isOpenModalUpdate: true })
    }

    const handleDeleteCourse = (course) => {
        setDataModal(course)
        setIsShowModalDelete(true)
    }

    const confirmDeleteCourse = async () => {

        let response = await deleteCourse(user.access_token, dataModal.id)
        let storageRef = firebase.storage().refFromURL(response.DT.imgCourse)

        if (response && response.DT && response.EC === 0) {
            // delete imgCourse in firebase storage
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage !')
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage !')
                })

            // delete all lesson video of course in firebase storage
            const allLessonVideoURLOfCourse = response.LS.map((item, index) => item.video)
            deleteAllLessonOfCourseFirebase(allLessonVideoURLOfCourse)
            console.log(response);
            setIsShowModalDelete(false)
            toast.success(response.EM)
            await fetchAllCourse()
        } else {
            toast.error(response.EM)
        }
    }

    const deleteAllLessonOfCourseFirebase = async (arrUrl) => {
        for (let i = 0; i < arrUrl.length; i++) {
            let storageRef = firebase.storage().refFromURL(arrUrl[i])
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage: ', arrUrl[i])
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage lesson: ', arrUrl[i])
                })
        }
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },

        {
            title: 'Course Name',
            dataIndex: 'courseName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Content Text',
            dataIndex: 'contentText',
        },
        {
            title: 'Level',
            dataIndex: 'level',
        },
        {
            title: 'Total Lesson',
            dataIndex: 'totalLesson',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, course) => {
                return <div>
                    <Button onClick={() => navigate(`/manage-course/${course.id}/manage-chapter`)}>Chapter</Button>
                    <Button onClick={() => handleUpdateCourse(course)}>UPDATE</Button>
                    <Button onClick={() => handleDeleteCourse(course)}>Delete Course</Button>
                </div>
            }
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className={cx('container')}>
            <Button
                style={{ margin: '12px 0' }}
                onClick={() => setState({ ...state, isOpenModalCreate: true })}
                type="primary"
            >
                Tạo Mới
            </Button>

            {allCourse ?
                <Table pagination={{ pageSize: 2 }} columns={columns}
                    dataSource={allCourse.map((item, index) => {
                        return { ...item, key: item.id }
                    })}
                    onChange={onChange}
                />
                :
                <Skeleton />
            }

            <ModalCourse
                data={course}
                state={state}
                setState={setState}
                refresh={fetchAllCourse}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteCourse={confirmDeleteCourse}
                dataModal={dataModal}
            />

        </div>
    )
}
export default ManageCourse;