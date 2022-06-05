import {
  AppstoreAddOutlined,
  DashboardFilled,
  LoginOutlined,
  LogoutOutlined,
  SettingFilled,
  UserAddOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logOut as logOutR } from '../app/userSlice'
import { HOME, LOGIN, REGISTER } from '../routes'
import SearchNavForm from './forms/SearchNavForm'

const { Item, SubMenu } = Menu
const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedItem, setSelectedItem] = useState('/')

  const userExists = useSelector((state) => state.user)

  const dashboardLink =
    userExists && userExists.role === 'admin'
      ? '/admin/dashboard'
      : '/user/history'

  const logOut = () => {
    try {
      signOut(auth).then(() => {
        toast.success('Signed Out Successfully')
        dispatch(logOutR(null))
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
      <span className="float-right p-1" key="search">
        <SearchNavForm />
      </span>
    </Menu>
  )
}

export default Navbar
