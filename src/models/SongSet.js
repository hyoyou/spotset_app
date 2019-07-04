export default class SongSet {
  static fromJson = (json = {}) => {
    let songSet = new SongSet();
    songSet.setSong(json.song);

    return songSet;
  }

  toJson = () => {
    return {
      song: this.song()
    };
  }
  
  setSong = (song) => {
    this._song = song;
  }

  song = () => {
    return this._song || [];
  }
}