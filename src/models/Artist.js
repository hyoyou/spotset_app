export default class Artist {
  static fromJson = (json = {}) => {
    let artist = new Artist();
    artist.setName(json.name);

    return artist;
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