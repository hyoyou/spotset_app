import Artist from './Artist';

export default class Setlist {
  static fromJson = (json = {}) => {
    let setlist = new Setlist();
    setlist.setId(json.id);
    setlist.setEventDate(json.eventDate);
    setlist.setArtist(json.artist);
    setlist.setVenue(json.venue);
    setlist.setSets(json.sets);
    
    return setlist;
  }

  toJson = () => {
    return {
      id: this.id(),
      eventDate: this.eventDate(),
      artist: this.artist(),
      venue: this.venue(),
      sets: this.sets()
    };
  }
  
  setId = (id) => {
    this._id = id;
  }

  id = () => {
    return this._id || "";
  }

  setEventDate = (date) => {
    this._eventDate = date;
  }

  eventDate = () => {
    return this._eventDate || "";
  }

  setArtist = (artist) => {
    this._artist = artist;
  }

  artist = () => {
    return this._artist || "";
  }

  setVenue = (venue) => {
    this._venue = venue;
  }

  venue = () => {
    return this._venue || "";
  }  

  setSets = (sets = "") => {
    this._sets = sets;
  }

  sets = () => {
    return this._sets || "";
  }
}