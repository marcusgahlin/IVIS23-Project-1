import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsPerson, BsPersonCircle } from "react-icons/bs";

export default function MemberRow2 ({member, selectedMember}) {
  /*
  const [memberState, setMemberState] = useState(member)

  useEffect(() => {
    console.log('Member group changed: ', member.group)
    setMemberState(member)

  }, [userModel.members[member.id].group])
  */
  function handleSelect(){
    selectedMember.data === member.id 
    ? selectedMember.setData(null)
    : selectedMember.setData(member.id)
    
  }
  return (
    <div 
    className={`d-flex align-items-center gap-2 ps-3 py-2 border rounded px-2 ${member.id === selectedMember.data ? 'bg-primary bg-opacity-10' : ''}`} 
    onClick={()=> handleSelect()} 
    style={{cursor: 'pointer'}}>
      <BsPerson className=''/>
      {/* Group diagram here */}
      <div className='col-4'>{member.name}</div>
      <div className='bg-light rounded border px-1 small'>Group: {member.group ? member.group : '-'}</div>
  </div>
  )
}