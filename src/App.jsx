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
    <div className="vh-100 w-100" style={{minHeight: '100vh', maxHeight: '100vh'}}>
      {/* <StarPlot data={data}/> */}
      <TabSwitch>
        <GroupOverview userModel={userModel} icon={<BsPeople/>} title="Groups"/>
        <ParticipantsView userModel={userModel} icon={<BsPerson/>} title="Participants"/>
      </TabSwitch>
    </div>
  )
}

export default App
