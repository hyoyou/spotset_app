import Song from '../../models/Song';
import SongSet from '../../models/SongSet';

describe('SongSet Model', () => {
  describe('fromJson', () => {
    it('sets the songSet if the incoming json is empty', () => {
      const testSongSet = SongSet.fromJson({});

      expect(testSongSet.song).toBeDefined();
    });

    it('sets the songSet if the incoming data is valid', () => {
      const testSong = Song.fromJson({
        name: 'SongTitle',
      });

      const testSongSet = SongSet.fromJson({
        song: [testSong],
      });

      expect(testSongSet.song()).toEqual([testSong]);
    });
  });
});
