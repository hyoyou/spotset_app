import Venue from '../../models/Venue';

describe('Venue Model', () => {
  describe('fromJson', () => {
    it('sets the Venue if the incoming json is empty', () => {
      const testVenue = Venue.fromJson({});

      expect(testVenue.name).toBeDefined();
    });

    it('sets the Venue if the incoming data is valid', () => {
      const testVenue = Venue.fromJson({
        name: 'VenueName',
      });

      expect(testVenue.name()).toEqual('VenueName');
    });
  });
});
