import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MembersSource_2 } from './MemberSource_2'
import { MembersSource_3 } from './MemberSource_3'
import { UserModel } from './UserModel'
import { getAvgMember } from './utils/getAvgMember'

const userModel = new UserModel(MembersSource_3)
userModel.avg_member = getAvgMember(MembersSource_3)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App userModel={userModel}/>
  </React.StrictMode>,
)
