import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { getAllChapterOfCourseApi, getAllLessonOfCourseApi } from '../../../../services/CourseService';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const MenuComponent = ({ currentCourseId }) => {

    // Menu ANTD
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    const params = useParams()
    const navigate = useNavigate()

    const [chapterData, setChapterData] = useState([])
    const [lessonData, setLessonData] = useState([])

    useEffect(() => {
        if (currentCourseId) {
            fetchAllChapterOfCourse(currentCourseId)
            fetchAllLessonOfCourse(currentCourseId)
        }
    }, [currentCourseId])

    // get chapter data
    const fetchAllChapterOfCourse = async (courseId) => {
        let response = await getAllChapterOfCourseApi(courseId)
        if (response && response.EC === 0) {
            setChapterData(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    // get lesson data
    const fetchAllLessonOfCourse = async (courseId) => {
        let response = await getAllLessonOfCourseApi(courseId)
        if (response && response.EC === 0) {
            setLessonData(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    let courseContent = chapterData.map((chapterItem, chapterIndex) => {
        return getItem(chapterItem.chapterName, 'chapter' + chapterItem.id, <MailOutlined />,
            lessonData.map((lessonItem, lessonIndex) => {
                if ((chapterIndex + 1) === lessonItem.chapterNumber) {
                    return (
                        getItem(lessonItem.lessonName, lessonItem.id)
                    )
                }
            })
        )

    })


    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
                width: '100%',
            }}
            items={courseContent}
            onClick={(value) => navigate(`/course/${params.courseName}/${value.key}`)}
        />
    );
};
export default MenuComponent;