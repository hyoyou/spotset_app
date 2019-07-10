export default class Sets {
  static fromJson = (json = {}) => {
    let sets = new Sets();
    sets.setSet(json.set);

    return sets;
  }

  toJson = () => {
    return {
      set: this.set()
    };
  }
  
  setSet = (set) => {
    this._set = set;
  }

  set = () => {
    return this._set || [];
  }
}