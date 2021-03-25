import { formatTitle } from "../../../src/formatters/title";

describe("formatPlaylistTitle", () => {
  it('returns the title with artist, venue, and event date given a setlist', () => {
    const setlist = {
      artist: "Not a Cat",
      venue: "MSG",
      eventDate: "02-12-2021"
    }

    const result = formatTitle(setlist);

    const expectedResult = `${setlist.artist} at ${setlist.venue} on ${setlist.eventDate}`;

    expect(result).toEqual(expectedResult)
  })
})