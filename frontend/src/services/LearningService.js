
// fake data

const courses = [
    {
        id: '1',
        name: 'HTML CSS zero to hero',
        title: 'HTML-CSS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 120,
        completeLesson: 90
    },
    {
        id: '2',
        name: 'Lập trình javascript cơ bản',
        title: 'Javascript',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 150,
        completeLesson: 60
    },
    {
        id: '3',
        name: 'Xây dựng website với reactJs',
        title: 'React-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 50,
        completeLesson: 30
    },
    {
        id: '4',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
    {
        id: '5',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
    {
        id: '6',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
    {
        id: '7',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
    {
        id: '8',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
    {
        id: '9',
        name: 'Xây dựng website với Nodejs',
        title: 'Node-JS',
        img: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        totalLesson: 70,
        completeLesson: 20
    },
]

export const getInfoCouse = (title) => {

    const course = courses.filter((course, index) => course.title === title)

    return course[0]

}

export const getAllCourses = () => {
    return courses
}

