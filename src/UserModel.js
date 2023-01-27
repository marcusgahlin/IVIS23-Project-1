import { GroupModel } from "./GroupModel";

// Tror inte vi behöver denna, räcker nog med ett state
export class UserModel {
  constructor(members={}) {
      this.groups = []
      this.members = members // holds member ojbects
      this.avg_member = {}
      this.group_skills = {
        math: 0,
        programming: 0,
        design_process: 0,
        art: 0,
        collaborative: 0
      }
      this.observers = [];  
  }

  getId(){
    // Checks available id:s among 1,2,3,4,5....
    for (let i = 1; i <= this.groups.length; i++){
      console.log('GROUPS: ', this.groups)
      if (!this.groups.some((group) => group.id === i)) {
        return i
      }
    }
    return this.groups.length + 1
  }

  addGroup(){
    this.groups = [...this.groups, new GroupModel(this.getId())]
    // this.updateGroupSkills()
    this.notifyObservers()
    console.log('ADDED GROUP')
    console.log(this.groups)
  }

  deleteGroup(id){
    // reset all members assigned groups DETTA KAN BLI ERROR
    this.groups.filter(group => group.id === id).members.forEach((member) => member.group = null )
    // delete the group
    this.groups = this.groups.filter((group) => group.id !== id)
    // this.updateGroupSkills()
    this.notifyObservers()
  }

  assignGroup(id, value){
    this.members[id].group = value
    this.notifyObservers()
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