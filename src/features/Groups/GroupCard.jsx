import { CloseButton, OverlayTrigger, Popover } from "react-bootstrap";
import { BsBarChartLine, BsBarChartLineFill, BsHeartFill, BsPeople, BsPeopleFill, BsQuestionCircle, BsX } from "react-icons/bs";

export default function GroupCard ({group, userModel, deleteGroup, setTabIndex}){

  return (
    <div className="card position-relative d-flex align-items-center" style={{width: '200px'}}>
      <CloseButton className="position-absolute top-0 end-0 m-1" onClick={()=> deleteGroup()}/>
      {/* Group diagram here */}
      <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary fw-light mt-3" style={{width: '5rem', height: '5rem', cursor: 'pointer'}} onClick={setTabIndex}>
          <p className="m-0 text-white"> Group {group.id}</p>
        </div>
      <div className="w-100 px-4 pb-3 d-flex flex-column gap-2 justify-content-center align-items-start" onClick={setTabIndex} style={{cursor: 'pointer'}}>
        <div className="rounded-pill  d-flex justify-content-center align-items-center gap-1"><BsPeopleFill className='text-secondary'/><p className="small m-0">{group.members.length}</p></div>
        <div className="rounded-pill d-flex justify-content-center align-items-center gap-1"><p className="small m-0 text-secondary">Avg. skill:</p><p className="m-0 small fw-bold">{group.average_skill}</p><AvgSkillOverlayGroupCard/></div>
        <div className="rounded-pill d-flex flex-column justify-content-center align-items-start gap-1">
          <div className="d-flex align-items-center justify-content-center gap-1">
          <p className="small m-0 text-secondary">Shared interests:</p>
          </div>
          <div className='d-flex flex-wrap gap-2 w-100 mt-1'>
          {GetSharedInterests(group.keywords).map((word) => {
            return (<MemberMatchOverlayGroupCard keywordVal={group.keywords[word].value} keyword={word}/>)
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

function GetSharedInterests(keywordsDict){
  const sharedInterests = Object.keys(keywordsDict).filter((key) => keywordsDict[key].value > 1)
  return sharedInterests.length ? sharedInterests : []
}

function MemberMatchOverlayGroupCard({members, keywordVal, keyword}){
  return(
    <OverlayTrigger
      trigger={["hover", "hover"]}
      overlay={
        <Popover className='' placement='auto' id='popover-contained' >
      <Popover.Body className='p-2'>
          <p className='m-0'>{keywordVal} group participants share this interest</p>
      </Popover.Body>
    </Popover>
      }
    >
      <div className="position-relative small">
        {keywordVal > 1 && (<div className="bg-danger p-0 text-white small rounded-circle position-absolute top-0 start-100 translate-middle d-flex align-items-center justify-content-center" style={{height: '1rem', width: '1rem'}}><p className='m-0 small'>{keywordVal}</p></div>)}
        <div className='border rounded-pill bg-primary bg-opacity-10 fw-light px-2 text-nowrap'>
          {keyword}
        </div>
      </div>  
    </OverlayTrigger>
  )
}

function AvgSkillOverlayGroupCard(){
  return(
    <OverlayTrigger
      trigger={["hover", "hover"]}
      overlay={
        <Popover className='' placement='auto' id='new'>
      <Popover.Body className='p-2'>
          <p className='m-0'>The average value of all 12 skill types in the group</p>
      </Popover.Body>
    </Popover>
      }
    >
      <div className="text-secondary d-flex align-items-center"><BsQuestionCircle/></div>  
    </OverlayTrigger>
  )
}