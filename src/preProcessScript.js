
// import myJson from './csvjson.json' assert {type: 'json'};
import { readFile } from 'fs/promises';
import { writeFileSync } from 'fs';
const json = JSON.parse(
  await readFile(
    new URL('./csvjson.json', import.meta.url)
  )
);
/*
const defaultMember = {
  id: 0,
  name:'',
  group: null,
  info: '',
  keywords: '',
  skills: {
    visualization: '',
    statistics: '',
    mathematics: '',
    artistic: '',
    computer: '',
    programming: '',
    graphics_programming: '',
    interaction_programming: '',
    ux_evaluation: '',
    communication: '',
    collaboration: '',
    git: ''
  },
  themes: {
    math: 0,
    programming: 0,
    arts_design: 0,
    collaborative: 0
  }
}
*/ 

/*
mathematics:
- statistics
- mathematics

programming:
- programming
- graphics_programming
- interaction_programming

arts_design:
- ux_evaluation
- artistic
- visualization

collaborative:
- computer_usage
- communication
- collaboration
- git

*/
/*
[//iPhone
  {axis:"Battery Life",value:0.22},
  {axis:"Brand",value:0.28},
  {axis:"Contract Cost",value:0.29},
  {axis:"Design And Quality",value:0.17},
  {axis:"Have Internet Connectivity",value:0.22},
  {axis:"Large Screen",value:0.02},
  {axis:"Price Of Device",value:0.21},
  {axis:"To Be A Smartphone",value:0.50}			
  ]


*/

const mathematics = ['mathematics', 'statistics']
const programming = ['programming', 'graphics_programming', 'interaction_programming']
const arts_design = ['ux_evaluation', 'artistic', 'visualization']
const collaborative = ['computer', 'communication', 'collaboration', 'git']

const finalDict = {}

function getMeanValue(member, keys){
  return Math.round((keys.reduce((acc, key) => acc += member[key] ,0) / keys.length) * 10) / 10
}

json.forEach((member, idx) => {
  finalDict[idx] = {
    id: idx,
    name: member.name,
    group: null,
    info: member.info,
    keywords: '',
    skills: {
      visualization: member.visualization,
      statistics: member.statistics,
      mathematics: member.mathematics,
      artistic: member.artistic,
      computer:  member.computer,
      programming: member.programming,
      graphics_programming: member.graphics_programming,
      interaction_programming: member.interaction_programming,
      ux_evaluation: member.ux_evaluation,
      communication: member.communication,
      collaboration: member.collaboration,
      git: member.git
    },
    data_dict: {
      math: getMeanValue(member, mathematics),
      programming: getMeanValue(member, programming),
      arts_design: getMeanValue(member, arts_design),
      collaborative: getMeanValue(member, collaborative)
    },
    data: [
      { axis: 'Math', value: getMeanValue(member, mathematics) },
      { axis: 'Programming', value: getMeanValue(member, programming) },
      { axis: 'Arts and design', value: getMeanValue(member, arts_design) },
      { axis: 'collaboration', value: getMeanValue(member, collaborative) }
    ]
  }

})

console.log(finalDict)

let data = JSON.stringify(finalDict);
writeFileSync('MembersSource_2.json', data);

