
import { useState, useEffect } from "react";

import CardComponent from "../../components/Cards"
import { Col, Row } from 'antd';

import classNames from "classnames/bind"
import styles from "./AllCourses.module.scss"

import { useNavigate } from "react-router-dom";
import { getAllCoursesApi } from "../../services/CourseService";
import ReactPaginate from "react-paginate";


const cx = classNames.bind(styles)

const AllCourses = () => {

    const navigate = useNavigate()

    const [listCourses, setListCourses] = useState([])

    // pagination
    const [totalPage, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(2)

    useEffect(() => {
        fetchCourses()
    }, [currentPage])

    const fetchCourses = async () => {
        let response = await getAllCoursesApi(currentPage, currentLimit)
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages)
            setListCourses(response.DT.courses)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleOnClick = (courseName) => {
        navigate(`/course/${courseName}`)
    }

    return (
        <div className={cx('allCourses-container')}>
            <Row className={cx('allCourses-wrapper')}>

                {listCourses && listCourses.length > 0 ?
                    <>
                        {listCourses.map((item, index) =>
                            <Col key={index} className={cx('course')} span={6}>
                                <CardComponent onClick={() => handleOnClick(item.courseName)} name={item.courseName} imgSrc={item.imgCourse} />
                            </Col>
                        )}
                    </>
                    :
                    <>
                        <div>
                            <span>Chưa Có Khóa Học Được Thêm Vào</span>
                        </div>
                    </>
                }


            </Row>

            {totalPage > 0 &&
                <div className={cx('user-footer')}>

                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={4}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakLabel='...'
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        containerClassName='pagination'
                        activeClassName='active'
                        renderOnZeroPageCount={null}

                    />

                </div>
            }
        </div>
    )

}

export default AllCourses