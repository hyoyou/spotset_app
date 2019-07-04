import Song from '../../models/Song';

describe('Song Model', () => {
  describe('fromJson', () => {
    it('sets the song if the incoming json is empty', () => {
      const testSong = Song.fromJson({});

      expect(testSong.name).toBeDefined();
    });

    it('sets the set if the incoming data is valid', () => {
      const testSong = Song.fromJson({
        name: 'SongTitle',
      });

      expect(testSong.name()).toEqual('SongTitle');
    });
  });
});
