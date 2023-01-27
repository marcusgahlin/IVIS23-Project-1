export function getAvgMember(members){
  const memberArr = Object.values(members)
  const numMembers = memberArr.length

  const calcAvg = (memberArr, key) => {
    return Math.round((memberArr.reduce((acc, mem)=> acc = acc + mem.skills[key], 0)/numMembers)* 10) / 10
  }

  return {
    skills:{
      visualization: calcAvg(memberArr, 'visualization'),
      statistics: calcAvg(memberArr, 'statistics'),
      mathematics: calcAvg(memberArr, 'mathematics'),
      artistic: calcAvg(memberArr, 'artistic'),
      computer: calcAvg(memberArr, 'computer'),
      programming: calcAvg(memberArr, 'programming'),
      graphics_programming: calcAvg(memberArr, 'graphics_programming'),
      interaction_programming: calcAvg(memberArr, 'interaction_programming'),
      ux_evaluation: calcAvg(memberArr, 'ux_evaluation'),
      communication: calcAvg(memberArr, 'communication'),
      collaboration: calcAvg(memberArr, 'collaboration'),
      git: calcAvg(memberArr, 'git')
    }
  }
}

