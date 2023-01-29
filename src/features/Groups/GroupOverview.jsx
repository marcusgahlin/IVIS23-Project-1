import { FloatingLabel, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { MembersSource_2 } from "../../MemberSource_2";
import MemberCard from "../MemberCard/MemberCard";
import { BsPlus } from 'react-icons/bs';
import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import HiddenTabSwitch from "./HiddenTabSwitch";
import AddGroupView from "./AddGroupView";
import BoxPlotWrapper from "../Overview/BoxPlotWrapper";
import { axisLabels } from "../../utils/axisLabels";
import { getAvgMember } from "../../utils/getAvgMember";


export default function ({userModel}){
  const [tabIndex, setTabIndex] = useState(0)
  /*
  useEffect(()=>{
    console.log(tabIndex)
    console.log(userModel.groups)
  },[tabIndex])
  */

  const [groups, setGroups] = useState(userModel.groups)
  const [allMembers, setAllMembers] = useState(Object.values(userModel.members))

  useEffect(()=>{
    function Obs(){
      setGroups(userModel.groups)
      setAllMembers(Object.values(userModel.members))
      };
      userModel.addObserver(Obs);
                      // 1. subscribe
        return function(){ userModel.removeObserver(Obs);}
    },[userModel])

  function handleAddGroup(){
    userModel.addGroup()
    setTabIndex(userModel.groups.length)
  }
  return(
    <div className="d-flex flex-grow-1 py-3 px-3 h-100">
      <HiddenTabSwitch tabIndex={tabIndex}>
      <GroupManager groups={groups} userModel={userModel} handleAddGroup={handleAddGroup} tabIndex={{data: tabIndex, setData: setTabIndex}}/>
      {groups.map((group, idx) => 
          <AddGroupView key={100 + idx} group={group} userModel={userModel} allMembers={allMembers} tabIndex={{data: tabIndex, setData: setTabIndex}}/>  
      )}
      </HiddenTabSwitch>
    </div>
  )
}

function GroupManager({groups, userModel, handleAddGroup, tabIndex}){
  return(
    <div className="d-flex w-100 h-100">
      <div className="w-50 d-flex flex-column">
        <p className="fs-5 fw-light">Group manager</p>
        <div className='d-flex flex-wrap w-100 gap-2 overflow-scroll'>
          {/* All group cards */}
          {/*
          {Object.values(MembersSource_2).map((member) => 
          <MemberCard member={member} />)}
          */}
          {groups.map((group, idx) => 
          <GroupCard key={idx} group={group} deleteGroup={()=> userModel.deleteGroup(group.id)} setTabIndex={()=>tabIndex.setData(idx + 1)}/>)}
          <div className="d-flex align-items-center p-2 rounded" style={{cursor: 'pointer'}} onClick={() => handleAddGroup()}>
            <button className="btn btn-primary d-flex align-items-center rounded-pill p-2 fw-light">
            <BsPlus/>
            <p className="m-0">Add group</p>
            </button>
          </div>
        </div>
      </div>
      <div className="h-100 w-50">
        <p className="fs-5 fw-light">Groups overview</p>
        {groups.length > 0 
        ? <GroupsSummary groups={groups}/>
        : <div className="py-4"><p className="text-secondary">Add groups to see the overview</p></div>}
      </div>
    </div>
  )
}

function GroupsSummary({groups}){
  /*
        Lowest value   Highest value  Diff
  Skill


  */

  const summary = {}
  Object.keys(axisLabels).forEach((skill) => {
    summary[skill] = getStatistics(groups, skill)
  })
  return(
    <table className="table table-sm table-striped">
      <thead>
        <tr>
          <th>Skill</th>
          <th className="text-center">Min value</th>
          <th className="text-center">Avg. value</th>
          <th className="text-center">Max value</th>
          <th className="text-center">Difference</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(axisLabels).map(key => {
      return (
        <tr key={key}>
          <td>{axisLabels[key]}</td>
          <td className="text-center"><TableOverlay value={summary[key].min.value} groups={summary[key].min.groups}/></td>
          <td className="text-center">{summary[key].avg}</td>
          <td className="text-center"><TableOverlay value={summary[key].max.value} groups={summary[key].max.groups}/></td>
          <td className="text-center">{summary[key].max.value - summary[key].min.value}</td>
      </tr>)
      })}       
      </tbody>
    </table>
  )
}

function getStatistics(groups, skill){
  let max = {value: 0, groups: []}
  let min = {value: 1000, groups: []}
  let avg = 0
  groups.forEach(group => {
    // max
    if (group.skills[skill] > max.value){
      max = { value: group.skills[skill], groups: [group.id]}
    } else if (group.skills[skill] === max.value){
      max = {...max, groups: [...max.groups, group.id]}
    }
    // min
    if (group.skills[skill] < min.value){
      min = { value: group.skills[skill], groups: [group.id]}
    } else if (group.skills[skill] === min.value){
      min = {...min, groups: [...min.groups, group.id]}
    }
    avg += group.skills[skill]
  })

  return {
    max,
    min,
    avg: Math.round((avg/groups.length) * 10) / 10
  }

}

function TableOverlay({value, groups}){
  return(
    <OverlayTrigger
      trigger={["hover", "hover"]}
      overlay={
        <Popover className='' placement='start' id='new'>
          <Popover.Body className='p-2'>

              {groups.map(group => {
                return(
                  <p className='m-0' key={group}>Group {group}</p>
                )
              })}

          </Popover.Body>
        </Popover>
      }
    >
      <div className="">{value}</div>  
    </OverlayTrigger>
  )
}