import { useEffect, useMemo, useRef, useState } from "react"
import { Button, Form, InputGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { BsArrowLeft, BsPeople, BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt, BsSortNumericUpAlt } from "react-icons/bs";
import { axisLabels } from "../../utils/axisLabels";
import sortOperator from "../../utils/sortOperator";
import { useResize } from "../../utils/useResize";
import BarPlotGroupWrapper from "../BarPlotGroup/BarPlotWrapper";
import MemberCard from "../MemberCard/MemberCard";
import MemberRow from "../MemberCard/MemberRow";

export default function AddGroupView({group, userModel, allMembers, tabIndex}){
  const [members, setMembers] = useState(group.members)
  // const [height, setHeight] = useState(0)
  // const [width, setWidth] = useState(0)
  const [desc, setDesc] = useState(false)
  const [filterKey, setFilterKey] = useState('name')
  const plotRef = useRef(null)
  const { width, height } = useResize(plotRef)
  /*
  useEffect(()=>{
    console.log('width changed: ', width)
  },[width])
  */

  const [sortedMembers, setSortedMembers] = useState(sortOperator(allMembers, filterKey, desc))
  
  const keywords = {}
  group.members.forEach((member) => {
    member.keywords.forEach((word) => {
      if (word in keywords) {
        keywords[word] = { value: keywords[word].value + 1, members: [...keywords[word].members, member.name] }
      } else {
        keywords[word] = { value: 1, members: [member.name] }
      }
    })
  })
  

  /*
  // We expect data to be prefilled before it reaches our component.
  const sortedMembers = useMemo(() => {
    // console.log(copiedComments)
    // console.log('SORTED:', sortLogic(copiedComments, false))
    console.log('filterKey: ', filterKey)
    return sortOperator(allMembers, filterKey, desc)
  }, [allMembers, desc, filterKey])
  */
  useEffect(()=>{
    const sorted = sortOperator(allMembers, filterKey, desc)
    setSortedMembers(sorted)
  },[allMembers, filterKey, desc])

 
  return (
    <div className='d-flex flex-column h-100 w-100'>
      <div className='d-flex align-items-center gap-2 mb-2'>
        <BsArrowLeft className='fs-4' style={{cursor:'pointer'}} onClick={() => tabIndex.setData(0)}/>
        <p className="m-0 fs-4 fw-light">Group {group.id}</p>
        <div className="d-flex align-items-center justify-content-center gap-2 ms-3 rounded-pill bg-secondary bg-opacity-50 text-white px-2">
          <BsPeople/>
          <p className="m-0 small">{group.members.length}</p>
        </div>
      </div>
    <div className="d-flex w-100 h-100">
    <div className="d-flex flex-column w-50">
      <div className='d-flex align-items-center gap-2'>
        <p className="m-0 fs-5 fw-light">Participants - Click to add or remove from group</p>
        </div>
        <div className="d-flex mb-2">
        <InputGroup>
          <InputGroup.Text id='basic-addon2' className='bg-white'>Sort by:</InputGroup.Text>

          <Form.Select 
          aria-label="Default select example"
          onChange={((e) => setFilterKey(e.target.value))}
          value={filterKey}
          >
            <option value='name'>Name</option>
            {Object.keys(axisLabels).map(labelKey => 
            <option value={labelKey}>{axisLabels[labelKey]}</option> )}
          </Form.Select>

        </InputGroup>
        <Button className='btn-light border' onClick={()=>setDesc(!desc)}>{DescButtonIcon(desc, filterKey)}</Button>
        </div>
        <div className='d-flex flex-column overflow-scroll'>
        
            {/* All group cards */}
            {/*
            {Object.values(MembersSource_2).map((member) => 
            <MemberCard member={member} />)}
            */}
            {/* <MemberCard key={idx} member={member} userModel={userModel} allMembers={allMembers} group={group}/> */}

            {sortedMembers.map((member, idx) => 
                <MemberRow key={idx} member={member} userModel={userModel} allMembers={allMembers} group={group} filterKey={filterKey}/>     
            )}
          </div>
      </div>
      <div className="w-50 h-100" ref={plotRef}>
        <p className="m-0 fs-5 ps-5 fw-light">Added group skills</p>
        <BarPlotGroupWrapper data={group} height={height} width={width}/>
        <div className="ps-5">
          <p className="m-0 fw-light fs-5">Group interests - keywords</p>
          <div className="d-flex flex-wrap gap-2 pt-1">
            {SortKeywords(keywords).map((word) => { return (
              <MemberMatchOverlay keyword={word} keywordVal={keywords[word].value} members={keywords[word].members}/>
            )})}
          {/*{group.members.map(mem => mem.keywords.map(word => {return (<div className='border rounded-pill bg-primary bg-opacity-10 fw-light px-2 text-nowrap'>{word}</div>)}))}*/}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

function MemberMatchOverlay({members, keywordVal, keyword}){
  return(
    <OverlayTrigger
      trigger={["hover", "hover"]}
      overlay={
        <Popover placement='auto' id='popover-contained' style={{ maxWidth: 'min-content' }}>
      <Popover.Body className=''>
        <table>
          {members.map(memb => {
            return (
              <tr>{memb}</tr>
            )
          })}
        </table>
      </Popover.Body>
    </Popover>
      }
    >
      <div className="position-relative">
        {keywordVal > 1 && (<div className="bg-danger p-0 text-white small rounded-circle position-absolute top-0 start-100 translate-middle d-flex align-items-center justify-content-center" style={{height: '1rem', width: '1rem'}}><p className='m-0 small'>{keywordVal}</p></div>)}
        <div className='border rounded-pill bg-primary bg-opacity-10 fw-light px-2 text-nowrap'>
          {keyword}
        </div>
      </div>  
    </OverlayTrigger>
  )
}

export function DescButtonIcon(desc, filterKey){
  if (filterKey === 'name'){
    return !desc ? <BsSortAlphaDown/> : <BsSortAlphaDownAlt/>
  } else {
    return !desc ? <BsSortNumericDownAlt/> : <BsSortNumericDown/>
  }

}

function SortKeywords(keywordsDict){
  function SortHelper(keyA,keyB){
    if (keywordsDict[keyA].value < keywordsDict[keyB].value) return 1
    else if (keywordsDict[keyA].value > keywordsDict[keyB].value) return -1
    else return 0
  }

  return Object.keys(keywordsDict).sort(SortHelper)
}