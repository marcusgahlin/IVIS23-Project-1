export class GroupModel {
  constructor(groupID) {
      this.id = groupID; // int
      this.members = [] // holds member ojbects
      this.group_skills = {
        math: 0,
        programming: 0,
        design_process: 0,
        art: 0,
        collaborative: 0
      }
      this.data = []
      this.observers = [];  
  }

  addMember(memberObj){
    this.members = [...this.members, memberObj]
    this.updateGroupSkills()
    this.notifyObservers();
  }

  deleteMember(memberID){
    this.members = this.members.filter((member) => member.id != memberID)
    this.updateGroupSkills();
    this.notifyObservers();
  }

  getKeyWords(){}

  updateGroupSkills(){
    // Calculates mean of each skill for all group members
    Object.keys(this.group_skills).forEach(skill => {
      const sum_skill = this.members.reduce((acc, member) => {acc += member[skill]})
      this.group_skills[skill] = sum_skill / this.members.length
    })
    // update data array
    this.data = [
      {axis: 'Math', value: this.group_skills.math},
      {axis: 'Arts and design', value: this.group_skills.art},
      {axis: 'Programming', value: this.group_skills.programming},
      {axis: 'Collabortaion', value: this.group_skills.collaborative}
    ]
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