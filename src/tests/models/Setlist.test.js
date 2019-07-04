import Artist from '../../models/Artist';
import Sets from '../../models/Sets';
import Setlist from '../../models/Setlist';
import Song from '../../models/Song';
import SongSet from '../../models/SongSet';
import Venue from '../../models/Venue';

describe('Setlist Model', () => {
  describe('fromJson', () => {
    it('sets the setlist if the incoming json is empty', () => {
      const testSetlist = Setlist.fromJson({});

      expect(testSetlist.id).toBeDefined();
      expect(testSetlist.eventDate).toBeDefined();
      expect(testSetlist.artist).toBeDefined();
      expect(testSetlist.venue).toBeDefined();
      expect(testSetlist.sets).toBeDefined();
    });

    it('sets the setlist if the incoming data is valid', () => {
      const testArtist = Artist.fromJson({
        name: 'artistName',
      });

      const testVenue = Venue.fromJson({
        name: 'venueName',
      });

      const testSong = Song.fromJson({
        name: 'SongTitle',
      });

      const testSongSet = SongSet.fromJson({
        song: [testSong],
      });

      const testSets = Sets.fromJson({
        set: [testSongSet],
      });

      const testSetlist = Setlist.fromJson({
        id: 'testId',
        eventDate: '01-07-2019',
        artist: testArtist,
        venue: testVenue,
        sets: testSets,
      });

      expect(testSetlist.id()).toEqual('testId');
      expect(testSetlist.eventDate()).toEqual('01-07-2019');
      expect(testSetlist.artist().name()).toEqual('artistName');
      expect(testSetlist.venue().name()).toEqual('venueName');
      expect(testSetlist.sets()).toEqual(testSets);
    });
  });
});
