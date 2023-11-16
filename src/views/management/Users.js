import React, { useEffect, useState, useRef } from 'react'
import { CButton, CBadge, CAvatar } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { SERVER_BASE_URL } from '../../reducers/actions/'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Input, Space, Table, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
const Users = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const searchInput = useRef(null)

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns = [
    {
      key: 'id',
      title: '#',
      dataIndex: 'id',
      width: '3%',
    },
    {
      key: 'avatar',
      title: <UserOutlined />,
      dataIndex: 'avatar',
      width: '3%',
    },
    {
      key: 'username',
      title: 'Fullname',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      key: 'phonenumber',
      title: 'Phonenumber',
      dataIndex: 'phonenumber',
      ...getColumnSearchProps('phonenumber'),
      width: '10%',
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender',
      width: '8%',
      filters: [
        {
          text: 'Male',
          value: 'Male',
        },
        {
          text: 'Female',
          value: 'Female',
        },
      ],
    },
    {
      key: 'birth',
      title: 'Birth',
      dataIndex: 'birth',
      width: '13%',
      ...getColumnSearchProps('birth'),
    },

    {
      key: 'location',
      title: 'Location',
      dataIndex: 'location',
      ...getColumnSearchProps('location'),
      width: '10%',
    },
    {
      key: 'zipcode',
      title: 'Zipcode',
      dataIndex: 'zipcode',
      ...getColumnSearchProps('zipcode'),
      width: '10%',
    },
    {
      key: 'friends',
      title: 'Friends',
      dataIndex: 'friends',
      width: '5%',
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      width: '5%',
    },
  ]

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  console.log(users)
  const setUserRoles = (index) => {
    dispatch({ type: 'SET_USER_ROLES', data: index })
  }
  useEffect(() => {}, [])
  return (
    <>
      <Table
        // size="small"
        pagination={{ pageSize: 15 }}
        dataSource={users.map((user, index) => {
          return {
            avatar: <CAvatar src={`${SERVER_BASE_URL}/avatars/${user.avatar}`} status="success" />,
            username: user.username,
            email: user.email,
            gender: user.gender ? 'Male' : 'Gemale',
            phonenumber: <CBadge color="info">{user.phonenumber || '+73892004'}</CBadge>,
            birth: user.birth || ' 12 / 3 / 1993',
            location: (
              <>
                <CIcon icon={icon.cifGq} title={'name'} /> {' ' + (user.location || ' Ukrine')}
              </>
            ),
            zipcode: user.zipcode || 2322,
            friends: (
              <CButton color="primary" size="sm">
                <CIcon icon={icon.cilFork} size="sm"></CIcon>
              </CButton>
            ),
            role: (
              <CButton
                color={user.roles.length && user.roles[0] === 'access' ? 'info' : 'danger'}
                style={{ color: 'white' }}
                size="sm"
                onClick={() => {
                  // setUserRoles(index)
                }}
              >
                {user.roles && user.roles[0] === 'access' ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </CButton>
            ),
            id: index + 1,
          }
        })}
        columns={columns}
      ></Table>
    </>
  )
}

export default Users
