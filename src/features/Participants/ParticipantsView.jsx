import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { axisLabels } from "../../utils/axisLabels";
import sortOperator from "../../utils/sortOperator";
import { useResize } from "../../utils/useResize";
import { DescButtonIcon } from "../Groups/AddGroupView";
import MemberRow from "../MemberCard/MemberRow";
import PlotWrapper from "../Overview/PlotWrapper";
import BarPlotMemberAvgWrapper from "./BarPlotMemberAvgWrapper";
import MemberRow2 from "./MemberRow2";

export default function ParticipantsView({userModel}){
  const plotRef = useRef(null)
  // const { width, height } = useResize(plotRef)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [desc, setDesc] = useState(false)
  const [filterKey, setFilterKey] = useState('name')

  const [allMembers, setAllMembers] = useState(Object.values(userModel.members))

  useEffect(()=>{
    function Obs(){
      setAllMembers(Object.values(userModel.members))
      };
      userModel.addObserver(Obs);
                      // 1. subscribe
        return function(){ userModel.removeObserver(Obs);}
    },[userModel])


  const [sortedMembers, setSortedMembers] = useState(sortOperator(allMembers, filterKey, desc))
  const [selectedMember, setSelectedMember] = useState(null)
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
    console.log('JAAAA')
    const sorted = sortOperator(Object.values(userModel.members), filterKey, desc)
    console.log(sorted)
    setSortedMembers(sorted)
  },[userModel.members, filterKey, desc])

  function handleReSize(){
    console.log('RESIZE HAPPENED: ', plotRef.current.offsetWidth)
    setWidth(plotRef.current.offsetWidth)
    setHeight(plotRef.current.offsetHeight)
  }
  useEffect(()=> {
    new ResizeObserver(handleReSize).observe(plotRef.current)
  },[])



  return (
    <div className='d-flex flex-column h-100 p-3 pt-4'>
      <p className="m-0 fs-4 fw-light border-bottom border-2">Participants</p>
      <div className="w-100 d-flex h-100">
      <div className="d-flex flex-column w-50">
          <div className='d-flex align-items-center gap-2'>
            <p className="m-0 fs-5 fw-light mt-2"> </p>
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
                {sortedMembers.map((member, idx) => 
                    <MemberRow2 key={idx} member={member} selectedMember={{data: selectedMember, setData: setSelectedMember}}/>     
                )}
              </div>
          </div>
        <div className="w-50 h-100 flex-column overflow-hidden" ref={plotRef}>
          <p className="fs-5 m-0 ps-5 mt-2 fw-light">{selectedMember ? `${userModel.members[selectedMember].name}'s skills compared to the average participant` : `The average participant's skill`}</p>
          <BarPlotMemberAvgWrapper memberAvg={userModel.avg_member} member={selectedMember ? userModel.members[selectedMember] : null} width={width} height={height}/>
          <div className="ps-5 w-100">
            <p className='m-0 px-2 fw-light fs-5'>Interests - Keywords</p>
            <div className='d-flex px-2 flex-wrap gap-1'>
            {selectedMember 
            ? userModel.members[selectedMember].keywords.map((word) => { return (<div className='border rounded-pill bg-primary bg-opacity-10 fw-light px-2 text-nowrap'>{word}</div>)})
            : ''}
            </div>
          </div>
          <div className="px-5 mt-3">
            <p className='m-0 px-2 fw-light fs-5'>Interests - Full</p>
            <div className={`border rounded p-2 overflow-scroll ${selectedMember && !userModel.members[selectedMember].info ? 'text-danger': '' }`}>
              {selectedMember 
              ? userModel.members[selectedMember].info 
              ? userModel.members[selectedMember].info
              : 'Data missing from participant'
              :'-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}