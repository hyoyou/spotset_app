import React from "react";

export const SearchInstructions = () => {
  return (
    <>
      <div id="instructions">
        <p>
          {"Search for your favorite artist and performance from "}
          <a
            id="setlist-link"
            href="https://www.setlist.fm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Setlist.fm
          </a>
        </p>
        <p>
          Find the Setlist ID from the URL of your chosen performance like below
          and enter in the field above
        </p>
        <img
          src="https://spotset.s3.amazonaws.com/Screen+Shot+2019-07-18+at+12.54.38+AM.png"
          alt="location of setlist id"
        />
      </div>
    </>
  );
};

export default SearchInstructions;
