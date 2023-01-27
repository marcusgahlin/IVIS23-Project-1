import { FloatingLabel, Form } from "react-bootstrap";
import { MembersSource_2 } from "../../MemberSource_2";
import MemberCard from "../MemberCard/MemberCard";
import { BsPlus } from 'react-icons/bs';
import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import HiddenTabSwitch from "./HiddenTabSwitch";
import AddGroupView from "./AddGroupView";

export default function ({userModel}){
  const [tabIndex, setTabIndex] = useState(0)
  useEffect(()=>{
    console.log(tabIndex)
    console.log(userModel.groups)
  },[tabIndex])

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
    <div className="d-flex flex-grow-1 p-4 h-100">
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
    <div className="d-flex flex-column w-100 h-100">
        <p className="m-0 fs-4 fw-light">Groups</p>
        <div className='d-flex flex-wrap w-100 gap-2'>
        
            {/* All group cards */}
            {/*
            {Object.values(MembersSource_2).map((member) => 
            <MemberCard member={member} />)}
            */}
            {groups.map((group, idx) => 
            <GroupCard key={idx} group={group} deleteGroup={()=> userModel.deleteGroup(group.id)} setTabIndex={()=>tabIndex.setData(idx + 1)}/>)}
            <div className="d-flex align-items-center p-2 text-secondary border rounded bg-white" style={{cursor: 'pointer'}} onClick={() => handleAddGroup()}>
              <BsPlus/>
              <p className="m-0">Add group</p>
            </div>
          </div>
      </div>
  )
}

/* 
        <FloatingLabel controlId="floatingSelect" label="How many groups will you be forming?">
          <Form.Select size='sm' aria-label="Floating label select example">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
        </FloatingLabel>
        */