import Sets from '../../models/Sets';
import Song from '../../models/Song';
import SongSet from '../../models/SongSet';

describe('Sets Model', () => {
  describe('fromJson', () => {
    it('sets the sets if the incoming json is empty', () => {
      const testSets = Sets.fromJson({});

      expect(testSets.set).toBeDefined();
    });

    it('sets the artist if the incoming data is valid', () => {
      const testSong = Song.fromJson({
        name: 'SongTitle',
      });

      const testSongSet = SongSet.fromJson({
        song: [testSong],
      });

      const testSets = Sets.fromJson({
        set: [testSongSet],
      });

      expect(testSets.set()).toEqual([testSongSet]);
    });
  });
});
