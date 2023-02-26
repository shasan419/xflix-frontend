import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Explore from "./Explore";
import "./dashboard.css";
import GenreList from "../GenreList/GenreList";

export default class Dashboard extends Component {
  componentDidMount() {
    this.fetchVideoFromProps();
  }

  async fetchVideoFromProps() {
    await this.props.fetchVideos();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchText != prevProps.searchText) {
      this.fetchVideoFromProps();
    }
  }

  render() {
    return (
      <div>
        <Grid container>
          <GenreList
            handleGenreChange={this.props.handleGenreChange}
            selectedGenres={this.props.selectedGenres}
            genres={this.props.genres}

            handleContentRatingChange={this.props.handleContentRatingChange}
            selectedContentRatings={this.props.selectedContentRatings}
            contentRatings={this.props.contentRatings}

            sortBy={this.props.sortBy}
          ></GenreList>

          <Grid item xs={12}>
            <Explore videoList={this.props.videoList} parent="Dashboard" />
          </Grid>
        </Grid>
      </div>
    );
  }
}
