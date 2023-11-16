import { Button, Table, Modal, Select, Checkbox, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../../reducers/actions/notificationAction'
import { SERVER_BASE_URL } from '../../reducers/actions/'
import {
  SettingOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  NotificationOutlined,
  EditOutlined,
} from '@ant-design/icons'
import moment from 'moment/moment'
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import TextArea from 'antd/es/input/TextArea'
const { confirm } = Modal

const Notifications = () => {
  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const notifications = useSelector((state) => state.notifications)
  const users = useSelector((state) => state.users)
  const [modal2Open, setModal2Open] = useState(false)

  const [newNotification, setNotificationData] = useState({
    title: '',
    content: '',
    effectiveDate: new Date(),
    permissions: ['all'],
  })

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const columns = [
    { key: 'id', title: '#', dataIndex: 'id', width: '5%' },
    { key: 'title', title: 'Title', dataIndex: 'title', width: '20%' },
    { key: 'content', title: 'Content', dataIndex: 'content', width: '50%' },
    { key: 'recipient', title: 'Recipient', dataIndex: 'recipient', window: '5%' },
    { key: 'createdAt', title: 'CreatedAt', dataIndex: 'createdAt', width: '15%' },
    {
      key: 'edit',
      title: 'Edit',
      render: (record) => {
        return (
          <>
            <Button size="sx" type={'primary'}>
              <SettingOutlined />
            </Button>
          </>
        )
      },
      width: '3%',
    },
    {
      key: 'delete',
      title: 'Delete',
      render: (record) => {
        return (
          <>
            <Button size="sx" type={'dashed'} color="red" onClick={() => showDeleteConfirm()}>
              <DeleteOutlined />
            </Button>
          </>
        )
      },
      width: '3%',
    },
  ]

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      style: { marginTop: '100px' },
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const onChange = (e) => {
    setNotificationData({ ...newNotification, permissions: [e.target.checked ? 'all' : ''] })
  }

  const friendthem = ' invited you as a friend.'

  useEffect(() => {
    dispatch(getNotifications())
  }, [])
  return (
    <CContainer className="pb-5">
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow className="row justify-content-md-start">
                <CCol xs lg={1}>
                  <NotificationOutlined
                    style={{
                      fontSize: 25,
                      color: 'green',
                    }}
                  />
                </CCol>
                <CCol
                  syle={{
                    fontSize: 25,
                    color: 'green',
                  }}
                >
                  New Notification
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <TextArea
                placeholder="title text..."
                autoSize
                value={newNotification.title}
                onChange={(e) => setNotificationData({ ...newNotification, title: e.target.value })}
                style={{ marginTop: '10px' }}
              />
              <TextArea
                value={newNotification.content}
                style={{ marginTop: '10px' }}
                onChange={(e) =>
                  setNotificationData({ ...newNotification, content: e.target.value })
                }
                placeholder="some text..."
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <CRow className="pt-3">
                <CCol sm={7}>
                  <Checkbox className="p-1" onChange={onChange}>
                    all
                  </Checkbox>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={handleChange}
                    disabled={newNotification.permissions[0] === 'all'}
                    options={users.map((user) => {
                      return {
                        value: user.username,
                      }
                    })}
                  />
                </CCol>
                <CCol sm={4}>
                  <div className="p-1">effective date</div>
                  <DatePicker picker="effective date" format={'YYYY/MM/DD'} />
                </CCol>
              </CRow>
              <CRow className="p-3">
                <CButton>submit</CButton>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div className="row justify-content-md-center pt-5">
        <Table
          columns={columns}
          dataSource={notifications.map((notification, index) => {
            var user
            if (notification.permissions === 'all') {
              user = {
                avatar: 'default.png',
                username: 'all',
              }
            } else {
              user = users.find((user) => user._id === notification.permissions)
            }

            var content = ''
            if (notification.title === 'friend request') {
              var otheruser = users.find((user) => user._id === notification.content)
              content = (
                <>
                  hello {user.username}, <br></br>
                  <CAvatar src={`${SERVER_BASE_URL}/avatars/${otheruser.avatar}`} />
                  {otheruser.username} {friendthem}
                </>
              )
            } else {
              content = notification.content
            }

            return {
              id: index + 1,
              title: notification.title,
              content: content,
              recipient: (
                <>
                  <CAvatar src={`${SERVER_BASE_URL}/avatars/${user.avatar}`} status="success" />
                  {user.username}
                </>
              ),
              createdAt: (
                <CBadge color="info">
                  {moment(notification.createdAt).format('DD/MM/YY hh:mm:ss')}
                </CBadge>
              ),
            }
          })}
          rowSelection={rowSelection}
          pagination={{ pageSize: 15 }}
        ></Table>
      </div>
    </CContainer>
  )
}

export default Notifications
