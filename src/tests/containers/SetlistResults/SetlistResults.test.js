import { mount } from "enzyme";
import React from "react";
import { SetlistResults } from "../../../containers/SetlistResults";

describe("SetlistResults Component", () => {
  it("displays the setlist from valid passed in props", () => {
    const testProps = {
      id: "testId",
      eventDate: "07-01-2019",
      artist: "artistName",
      venue: "venueName",
      tracks: [
        { name: "Song1", trackUri: "spotify:track:sampleUri1" },
        { name: "Song2", trackUri: "spotify:track:sampleUri2" },
        { name: "Song3", trackUri: "spotify:track:sampleUri3" }
      ]
    };

    const wrapper = mount(<SetlistResults setlist={testProps} />);

    expect(wrapper.find("Track").length).toEqual(3);
  });
});
