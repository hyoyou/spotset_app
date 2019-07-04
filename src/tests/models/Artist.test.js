import Artist from '../../models/Artist';

describe("Artist Model", () => {
  describe("fromJson", () => {
    it("sets the artist if the incoming json is empty", () => {
      const testArtist = Artist.fromJson({});

      expect(testArtist.name).toBeDefined();
    })

    it("sets the artist if the incoming data is valid", () => {
      const testArtist = Artist.fromJson({
        name: "artistName"
      });

      expect(testArtist.name()).toEqual("artistName");
    })
  })
})