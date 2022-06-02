import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useRouter } from 'next/router'

const RatingModal = ({ children, setRating }) => {
  const router = useRouter()

  const {
    query: { id },
  } = router
  const user = useSelector((state) => state.user)
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true)
    } else {
      router.push({
        pathname: '/login',
        query: { from: `/product/${id}` },
      })
    }
  }

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{' '}
        {user ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
          setRating()
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default RatingModal
