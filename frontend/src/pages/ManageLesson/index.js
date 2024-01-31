import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Table } from 'antd';
import { toast } from 'react-toastify';
import styles from './ManageLesson.module.scss'
import classNames from 'classnames/bind';
import ModalLesson from './ModalLesson';
import { useNavigate, useParams } from 'react-router-dom';
import { deletelessonApi, getAllLessonOfChapterApi } from '../../services/LessonService';
import ModalDelete from './ModalDelete';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/user/userSlice';
import firebase from '../../setup/firebase/firebase'

const cx = classNames.bind(styles)

const ManageLesson = () => {

    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector(userSelector)

    // Modal delete
    const [dataModal, setDataModal] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)

    const [allLesson, setAllLesson] = useState([])
    const [lesson, setLesson] = useState({})
    const [state, setState] = useState({
        isOpenModalCreate: false,
        isOpenModalUpdate: false,
    })

    useEffect(() => {
        fetchAllLesson()
    }, [])

    const fetchAllLesson = async () => {
        let response = await getAllLessonOfChapterApi(params.courseId, params.chapterNumber)
        if (response && response.EC === 0) {
            setAllLesson(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleUpdateLesson = (lesson) => {
        setLesson(lesson)
        setState({ ...state, isOpenModalUpdate: true })
    }

    const handleDeleteLesson = (lesson) => {
        setDataModal(lesson)
        setIsShowModalDelete(true)
    }

    const confirmDeleteLesson = async (url) => {

        let response = await deletelessonApi(user.access_token, dataModal.id)
        let storageRef = firebase.storage().refFromURL(url)

        if (response && response.DT && response.EC === 0) {
            await storageRef.delete()
                .then(() => {
                    toast.success('Delete success from firebase storage !')
                })
                .catch(() => {
                    toast.error('Delete fail from firebase storage !')
                })
            setIsShowModalDelete(false)
            toast.success(response.EM)
            await fetchAllLesson()
        } else {
            toast.error(response.EM)
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
            title: 'Lesson Name',
            dataIndex: 'lessonName',
        },
        {
            title: 'Lesson Number',
            dataIndex: 'lessonNumber',
        },
        {
            title: 'Video URL',
            dataIndex: 'video',
        },
        {
            title: 'Video Duration',
            dataIndex: 'videoDuration',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, lesson) => {
                return <div>
                    <Button onClick={() => handleUpdateLesson(lesson)}>UPDATE</Button>
                    <Button onClick={() => handleDeleteLesson(lesson)}>Delete Lesson</Button>
                </div>
            }
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className={cx('container')}>
            <Button onClick={() => setState({ ...state, isOpenModalCreate: true })} type="primary">Tạo Mới</Button>

            {allLesson ?
                <Table pagination={{ pageSize: 2 }} columns={columns}
                    dataSource={allLesson.map((item, index) => {
                        return { ...item, key: item.id }
                    })}
                    onChange={onChange}
                />
                :
                <Skeleton />
            }

            <Button type='primary' onClick={() => navigate(`/manage-course/${params.courseId}/manage-chapter`)}>Back</Button>

            <ModalLesson
                data={lesson}
                state={state}
                setState={setState}
                refresh={fetchAllLesson}
            />

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteLesson={confirmDeleteLesson}
                dataModal={dataModal}
            />

        </div>
    )


}
export default ManageLesson;