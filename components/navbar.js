import {
  AppstoreAddOutlined,
  CarryOutOutlined,
  DashboardFilled,
  LoginOutlined,
  LogoutOutlined,
  SettingFilled,
  ShoppingFilled,
  UserAddOutlined,
} from '@ant-design/icons'
import { Menu, Badge } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logOut as logOutR } from '../app/userSlice'
import { HOME, LOGIN, REGISTER, SHOP } from '../routes'
import SearchNavForm from './forms/SearchNavForm'
import { emptyCart } from '../app/cartSlice'

const { Item, SubMenu } = Menu
const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedItem, setSelectedItem] = useState('/')

  const userExists = useSelector((state) => state.user)

  const cart = useSelector((state) => state.cart)

  const cartLength = cart?.length

  const dashboardLink =
    userExists && userExists.role === 'admin'
      ? '/admin/dashboard'
      : '/user/history'

  const logOut = () => {
    try {
      signOut(auth).then(() => {
        toast.success('Signed Out Successfully')
        dispatch(logOutR(null))
        dispatch(emptyCart())
        localStorage.removeItem('ecommerce-cart')
        router.push('/login')
      })
    } catch (e) {
      console.log(e)
    }
  }

  const selectNavItem = (e) => {
    setSelectedItem(e.key)
  }
  return (
    <Menu mode="horizontal" selectedKeys={[selectedItem]}>
      <Item key="/" icon={<AppstoreAddOutlined />} onClick={selectNavItem}>
        <Link href={HOME} passHref>
          <a>Ecommerce</a>
        </Link>
      </Item>
      {!userExists && (
        <>
          <Item
            key="/register"
            icon={<UserAddOutlined />}
            onClick={selectNavItem}
          >
            <Link href={REGISTER} passHref>
              <a>Register</a>
            </Link>
          </Item>

          <Item key="/login" icon={<LoginOutlined />} onClick={selectNavItem}>
            <Link href={LOGIN} passHref>
              <a>Login</a>
            </Link>
          </Item>
        </>
      )}
      <Item key="shop" icon={<ShoppingFilled />} onClick={selectNavItem}>
        <Link href={SHOP} passHref>
          <a>Shop</a>
        </Link>
      </Item>
      <Item key="cart" icon={<CarryOutOutlined />}>
        <Link href={'/cart'} passHref>
          <Badge count={cartLength} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      <Item key="search" onClick={selectNavItem} className="mx-auto">
        <SearchNavForm />
      </Item>
      <SubMenu
        title={userExists ? userExists.email : 'Username'}
        icon={<SettingFilled />}
        key="/submenu"
        style={{ marginLeft: 'auto' }}
      >
        <Item
          key="dashboard"
          icon={<DashboardFilled />}
          onClick={() => router.push(dashboardLink)}
        >
          Dashboard
        </Item>

        {userExists && (
          <Item key="logOut" icon={<LogoutOutlined />} onClick={logOut}>
            Log Out
          </Item>
        )}
      </SubMenu>
    </Menu>
  )
}

export default Navbar
