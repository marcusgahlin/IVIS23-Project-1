function sortOperator (entries, key, desc = true) {
  const arr = [...entries]
  
  if (key === 'name') {
    if (desc) {
      arr.sort((a,b) => NameSorter(b,a))
    } else {
      arr.sort((a,b) => NameSorter(a,b))
    }
  } else {
    if (desc) {
      arr.sort((a, b) => b.skills[key] > a.skills[key])
    } else {
      arr.sort((a, b) => a.skills[key] > b.skills[key])
    }
  }
  return arr
}

function NameSorter(a, b){
  if (a.name < b.name) return -1
  else if (a.name > b.name) return 1
  else return 0
}

export default sortOperator