import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Axios from 'axios'
import { message } from 'antd'
import { API_SERVER_URL } from 'src/reducers/actions'
import { useDispatch, useSelector } from 'react-redux'
const Login = (props) => {
  const dispatch = useDispatch()
  const [username, setName] = useState('')
  const [password, setPass] = useState('')
  const auth = useSelector((state) => state.auth)

  const signin = async () => {
    try {
      if (username === '') {
        message.warning('Please enter your name!')
        return
      } else if (password === '') {
        message.warning('Please enter your password!')
        return
      }

      const res = await Axios.post(`${API_SERVER_URL}/auth/signin`, { username, password })
      dispatch({ type: 'SET_TOKEN', data: res.data })
      document.location.href = '/'
      message.success(`welcome ${res.data.username}`)
    } catch (error) {
      message.error('ssss')
      console.log(error)
    }
  }

  const onChange = (e) => {
    if (e.target.name === 'username') {
      setName(e.target.value)
    } else if (e.target.name === 'password') {
      setPass(e.target.value)
    }
  }

  useEffect(() => {
    if (auth.accessToken) {
      document.location.href = '#/'
    }
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={onChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        onChange={onChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={signin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <br></br>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
