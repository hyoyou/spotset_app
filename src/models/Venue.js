export default class Venue {
  static fromJson = (json = {}) => {
    let venue = new Venue();
    venue.setName(json.name);

    return venue;
  }

  toJson = () => {
    return {
      name: this.name()
    };
  }
  
  setName = (name) => {
    this._name = name;
  }

  name = () => {
    return this._name || "";
  }
}