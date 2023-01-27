import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './scss/bootstrap.scss'
import StarPlot from './features/StarPlot/StarPlot'
import GroupOverview from './features/Groups/GroupOverview'
import TabSwitch from './features/TabSwitch/TabSwitch'
import { BsBarChartLine, BsInfoCircle, BsPeople, BsPerson } from 'react-icons/bs'
import InfoView from './features/Info/Info'
import Overview from './features/Overview/Overview'
import ParticipantsView from './features/Participants/ParticipantsView'
import Test from './Test'

function App({data, userModel}) {
  return (
    <div className="vh-100 w-100 d-flex">
      {/* <StarPlot data={data}/> */}
      <TabSwitch>
        <InfoView icon={<BsInfoCircle/>} title="Information"/>
        <ParticipantsView userModel={userModel} icon={<BsPerson/>} title="Participants"/>
        <GroupOverview userModel={userModel} icon={<BsPeople/>} title="Groups"/>
        <Overview icon={<BsBarChartLine/>} title="Overview"/>
      </TabSwitch>
    </div>
  )
}

export default App
