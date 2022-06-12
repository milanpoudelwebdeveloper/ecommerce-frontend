import { Drawer } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDrawer } from '../../app/drawerSlice'

const SideDrawer = () => {
  const drawerState = useSelector((state) => state.drawer)

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(drawerState)

  useEffect(() => {
    setVisible(drawerState)
  }, [drawerState])

  const onClose = () => {
    dispatch(openDrawer(false))
  }

  return (
    <Drawer
      title={`Cart / ${cart.length} Products`}
      placement="right"
      onClose={onClose}
      visible={visible}
      className="text-center"
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images.length > 0 && (
              <img
                src={p.images[0].url}
                style={{
                  width: '100%',
                  height: '60px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            )}
            <p className="text-center bg-secondary text-light">
              {p.title} X {p.count}
            </p>
          </div>
        </div>
      ))}
      <Link href="/cart" passHref>
        <button
          className="text-center btn btn-primary"
          onClick={() => {
            dispatch(openDrawer(false))
          }}
        >
          Go to cart
        </button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
