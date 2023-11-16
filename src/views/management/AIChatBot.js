import React, { useEffect, useState } from 'react'
import { CContainer, CRow } from '@coreui/react'
import { Input } from 'antd'
import { EyeOutlined, CheckCircleTwoTone } from '@ant-design/icons'

import { API_SERVER_URL, axiosRequest } from 'src/reducers/actions'

const AIChatBot = () => {
  const [APIKEY, setKey] = useState({
    key: '',
    available: true,
  })

  const onChange = async (e) => {
    try {
      const res = await axiosRequest.post(`${API_SERVER_URL}/chatbotapikey`, {
        key: e.target.value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getAPIkey = async () => {
    try {
      const res = await axiosRequest.post(`${API_SERVER_URL}/getapikey`)
      setKey(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAPIkey()
  })
  return (
    <CContainer>
      <CRow>
        <Input
          addonBefore={<div style={{ color: 'blue' }}>API key</div>}
          suffix={APIKEY.available ? <CheckCircleTwoTone /> : <EyeOutlined />}
          onChange={onChange}
          defaultValue={APIKEY.key}
          placeholder="xxx xxx xxx"
        />
      </CRow>
    </CContainer>
  )
}

export default AIChatBot
