import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function MemberCard ({member, userModel, group}) {
  const [memberState, setMemberState] = useState(member)

  useEffect(() => {
    console.log('Member group changed: ', member.group)
    setMemberState(member)

  }, [userModel.members[member.id].group])
  

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
    className={`card position-relative d-flex align-items-center py-2 ${memberState.group === group.id ? 'border-primary' : memberState.group ? 'opacity-50' : ''}`} 
    onClick={()=> handleSelect()} 
    style={{cursor: `${memberState.group && memberState !== group.id ? 'default': 'pointer'}`}}>
      {memberState.group === group.id && <BsCheckCircleFill className="position-absolute top-0 end-0 m-1 text-success"/>}
      {/* Group diagram here */}
      <div className="p-5 m-4 mx-4 rounded-circle bg-secondary"></div>
      {memberState.name}
  </div>
  )
}