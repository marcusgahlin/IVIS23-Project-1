import { axisLabels } from "./utils/axisLabels";

export class GroupModel {
  constructor(groupID) {
      this.id = groupID; // int
      this.members = [] // holds member ojbects
      this.skills = {
        visualization: 0,
        statistics: 0,
        mathematics: 0,
        artistic: 0,
        computer: 0,
        programming: 0,
        graphics_programming: 0,
        interaction_programming: 0,
        ux_evaluation: 0,
        communication: 0,
        collaboration: 0,
        git: 0
      },
      this.group_skills = {
        math: 0,
        programming: 0,
        design_process: 0,
        art: 0,
        collaborative: 0
      }
      this.average_skill = 0
      this.keywords = {}
      this.data = []
      this.observers = [];  
  }

  addMember(memberObj){
    this.members = [...this.members, memberObj]
    this.updateGroupSkills()
    this.updateGroupKeywords();
    this.notifyObservers();
  }

  deleteMember(memberID){
    this.members = this.members.filter((member) => member.id != memberID)
    this.updateGroupSkills();
    this.updateGroupKeywords();
    this.notifyObservers();
  }

  updateGroupKeywords(){
    const keywords = {}
    this.members.forEach((member) => {
      member.keywords.forEach((word) => {
        if (word in keywords) {
          keywords[word] = { value: keywords[word].value + 1, members: [...keywords[word].members, member.name] }
        } else {
          keywords[word] = { value: 1, members: [member.name] }
        }
      })
    })
    this.keywords = keywords
  }

  updateGroupSkills(){
    // Calculates mean of each skill for all group members
    Object.keys(this.group_skills).forEach(skill => {
      const sum_skill = this.members.reduce((acc, member) => acc += member[skill])
      this.group_skills[skill] = sum_skill / this.members.length
    })
    // update data array
    this.data = [
      {axis: 'Math', value: this.group_skills.math},
      {axis: 'Arts and design', value: this.group_skills.art},
      {axis: 'Programming', value: this.group_skills.programming},
      {axis: 'Collabortaion', value: this.group_skills.collaborative}
    ]
    
    Object.keys(this.skills).forEach(skill => {
      this.skills[skill] = this.members.reduce((acc, member) => acc += member.skills[skill], 0)
    })
    this.average_skill = Math.round((Object.keys(this.skills).reduce((acc, key) => acc += this.skills[key], 0) / Object.keys(this.skills).length) * 10) /10
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  notifyObservers() {
    this.observers.forEach(cb => {
        try { cb(); } catch (err) { console.log(err) }
    });
  }
}