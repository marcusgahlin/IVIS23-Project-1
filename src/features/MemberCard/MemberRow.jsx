import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsPerson } from "react-icons/bs";
import { axisLabels } from "../../utils/axisLabels";

export default function MemberRow ({member, userModel, group, filterKey}) {
  /*
  const [memberState, setMemberState] = useState(member)

  useEffect(() => {
    console.log('Member group changed: ', member.group)
    setMemberState(member)

  }, [userModel.members[member.id].group])
  */

  function handleSelect(){
    if (!member.group){
      // Select
      userModel.assignGroup(member.id, group.id)
      group.addMember(userModel.members[member.id])
      // userModel.members[member.id].group = group.id
    } else if (member.group === group.id) {
      // Deselect
      userModel.assignGroup(member.id, null)
      group.deleteMember(member.id)
      //userModel.members[member.id].group = null
    }
    // console.log(userModel.members[member.id])
  }

  return (
    <div 
    className={`d-flex align-items-center py-2 border rounded px-3 gap-1 ${member.group === group.id ? 'bg-primary bg-opacity-10' : member.group ? 'opacity-50' : ''}`} 
    onClick={()=> handleSelect()} 
    style={{cursor: `${member.group && member.group !== group.id ? 'default': 'pointer'}`}}>
      <BsPerson/>
      {/* 
      <BsPerson className={`${member.group === group.id ? 'text-success' : ''}`}/>
      <BsCheckCircleFill className={`m-1 ${member.group === group.id ? 'text-success' : 'invisible'}`}/>
      */}
      {/* Group diagram here */}
      <div className='col-4'>{member.name}</div>
      <div className='bg-light rounded border px-1 small'>Group: {member.group ? member.group : '-'}</div>
      {filterKey !== 'name' && <div className="small ms-5 text-secondary">{axisLabels[filterKey].charAt(0).toUpperCase() + axisLabels[filterKey].slice(1)}: {member.skills[filterKey]}</div>}
  </div>
  )
}