import * as d3 from "d3";
export default function Overview({userModel}){

  const noGroups = (
    <p className="m-0">Before you can see the group overview, you have to create groups first</p>
  )

  function OverviewContent(){
    return (
      <div></div>
    )
  }

  return (
    <div className="d-flex flex-column w-100 h-100 p-4 px-3">
      <div className="w-50 h-100">
        <p className="m-0 fs-4 fw-light border-bottom border-2 mb-2">Overview</p>
        {userModel && userModel.groups.length > 0 
        ? <OverviewContent/>
        : noGroups}
      </div>
    </div>
  )
}