import { CloseButton } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function GroupCard ({group, userModel, deleteGroup, setTabIndex}){

  return (
    <div className="card position-relative d-flex align-items-center py-2">
      <CloseButton className="position-absolute top-0 end-0 m-1" onClick={()=> deleteGroup()}/>
      {/* Group diagram here */}
      <div className="p-5 m-4 mx-4 rounded-circle bg-secondary" onClick={setTabIndex}></div>
      Group {group.id}
    </div>
  )
}