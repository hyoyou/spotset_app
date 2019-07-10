export default class Song {
  static fromJson = (json = {}) => {
    let song = new Song();
    song.setName(json.name);

    return song;
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