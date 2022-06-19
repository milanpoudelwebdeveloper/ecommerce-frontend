import React from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

interface IPagination {
  totalItems: number
  currentPage: number
  setCurrentPage: Function
}

const Pagination: React.FC<IPagination> = ({
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const showPerPage = 3

  const totalButtons = totalItems && Math.ceil(totalItems / showPerPage)

  const hasEnded = totalButtons === currentPage

  return (
    <div>
      <ul className="pagination justify-content-center">
        <button
          className="button-pagination"
          onClick={() => setCurrentPage((prevPage: number) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftOutlined />
        </button>
        <div style={{ display: 'flex' }}>
          {new Array(totalButtons).fill('').map((n, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1
                  ? 'button-pagination selected-button'
                  : 'button-pagination'
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="button-pagination"
          onClick={() => setCurrentPage((prevPage: number) => prevPage + 1)}
          disabled={hasEnded}
        >
          <ArrowRightOutlined />
        </button>
      </ul>
    </div>
  )
}

export default Pagination

//custom pagination from scratch
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import PaginationCard from '../components/PaginationCard'

// const Pagination = () => {
//   const [posts, setPosts] = useState([])
//   const [counter, setCounter] = useState(1)
//   const showPerPage = 4
//   const [pagination, setPagination] = useState({
//     start: 0,
//     end: showPerPage,
//   })

//   const endOfPage = Math.ceil(posts.length / showPerPage)

//   const isEnd = endOfPage === counter

//   const loadPosts = async () => {
//     const response = await axios.get(
//       'https://jsonplaceholder.typicode.com/posts'
//     )
//     setPosts(response.data)
//   }

//   useEffect(() => {
//     loadPosts()
//   }, [])

//   useEffect(() => {
//     const value = showPerPage * counter
//     const start = value - showPerPage
//     const end = value
//     onPaginationChange(start, end)
//   }, [counter])

//   const onPaginationChange = (start, end) => {
//     setPagination((prevValue) => ({ ...prevValue, start: start, end: end }))
//   }

//   const noOfButtons = Math.ceil(posts.length / showPerPage)

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           {posts.slice(pagination.start, pagination.end).map((p) => (
//             <PaginationCard post={p} key={p._id} />
//           ))}
//         </div>
//       </div>
//       <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
//         <button
//           className="btn btn-primary"
//           onClick={() => setCounter((prevCounter) => prevCounter + 1)}
//           disabled={isEnd}
//         >
//           Next
//         </button>
//         <div style={{ display: 'flex', background: 'red', width: 'full' }}>
//           {new Array(noOfButtons).fill('').map((n, index) => (
//             <button
//               onClick={() => setCounter(index + 1)}
//               className={counter === index + 1 ? 'selected-button' : ''}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <button
//           className="btn btn-primary"
//           onClick={() => setCounter((prevCounter) => prevCounter - 1)}
//           disabled={counter === 1}
//         >
//           Previous
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Pagination
