
import Home from "../pages/Home";
import AllCourses from "../pages/AllCourses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Exercises from "../pages/Exercises";
import UserInfo from "../pages/UserInfo";
import Settings from "../pages/Settings";
import Lesson from "../pages/Lesson";
import CourseDetail from '../pages/CourseDetail'

import { LearningLayout } from "../components/Layout";
import ManageUser from "../pages/ManageUser";
import ManageCourse from "../pages/ManageCourse";
import NotFoundPage from "../pages/NotFoundPage";
import CreateCourse from "../pages/ManageCourse/ModalCourse";
import ManageChapter from "../pages/ManageChapter";
import ManageLesson from "../pages/ManageLesson";

// Public Routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },

    {
        path: '/course/:courseName/:lessonId',
        component: Lesson,
        layout: LearningLayout,
    },

    {
        path: '/all-courses',
        component: AllCourses,
    },

    {
        path: '/login',
        component: Login,
    },

    {
        path: '/register',
        component: Register,
    },

    {
        path: '/exercises',
        component: Exercises,
    },

    {
        path: '/userInfo',
        component: UserInfo,
    },

    {
        path: '/settings',
        component: Settings,
    },

    {
        path: '/course/:courseName',
        component: CourseDetail,
    },

    {
        path: '/manage-user',
        component: ManageUser,
        isPrivate: true,
    },

    {
        path: '/manage-course',
        component: ManageCourse,
        isPrivate: true,
    },

    {
        path: 'manage-course/:courseId/manage-chapter/',
        component: ManageChapter,
        isPrivate: true,
    },

    {
        path: '/manage-course/:courseId/manage-chapter/:chapterNumber/manage-lesson',
        component: ManageLesson,
        isPrivate: true,
    },

    {
        path: "*",
        component: NotFoundPage,
    },

];

// Private Routes
const privateRoutes = [

];

export { publicRoutes, privateRoutes };
