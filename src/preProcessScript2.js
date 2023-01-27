
// import myJson from './csvjson.json' assert {type: 'json'};
import { readFile } from 'fs/promises';
import { writeFileSync } from 'fs';
import { MembersSource_2 } from './MemberSource_2.js';
const json = JSON.parse(
  await readFile(
    new URL('./KeywordsSource.json', import.meta.url)
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
//console.log(json[0]['keywords'])

const startDict = MembersSource_2
const finalDict = {...MembersSource_2}
Object.keys(startDict).forEach((key) => finalDict[key].keywords = json[key].keywords.toLowerCase().split(';'))

let data = JSON.stringify(finalDict);
writeFileSync('MembersSource_3.json', data);



