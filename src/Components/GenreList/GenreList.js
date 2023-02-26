import React, { Component } from "react";
import { mdiSwapVertical } from "@mdi/js";
import Icon from "@mdi/react";

export default class GenreList extends Component {
  render() {
    return (<>
      <div className="tool-bar">
        {this.props.genres.map((genre, idx) => (
          <div
            onClick={() => this.props.handleGenreChange(genre)}
            className={
              this.props.selectedGenres.includes(genre.value)
                ? "active-toolbar-button genre-btn"
                : "toolbar-button genre-btn"
            }
            id={genre.value}
          >
            {genre.label}
          </div>
        ))}
        <div className={"toolbar-button-sort"}>
          <div>
            <Icon path={mdiSwapVertical} size={1} color="#999" />{" "}
          </div>
          <div style={{ marginRight: "10px" }}> Sort By</div>
          <select onChange={this.props.sortBy} className="sort-select">
            <option value="releaseDate" id="release-date-option" className="select-option">Upload Date</option>
            <option value="viewCount" id="view-count-option" className="select-option">Views</option>
          </select>
        </div>
      </div>
      <div className="tool-bar" style={{ paddingBottom: "20px" }}>
        {this.props.contentRatings.map((contentRating, idx) => (
          <div
            onClick={() => this.props.handleContentRatingChange(contentRating)}
            className={
              this.props.selectedContentRatings.includes(contentRating.value)
                ? "active-toolbar-button content-rating-btn"
                : "toolbar-button content-rating-btn"
            }
            id={contentRating.value}
          >
            {contentRating.label}
          </div>
        ))}

      </div></>
    );
  }
}
