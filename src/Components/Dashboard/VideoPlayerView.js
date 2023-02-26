import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Explore from "./Explore";
import "./dashboard.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { withRouter, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { endpoint } from "../../Config/config";

class VideoPlayerView extends Component {
  state = {
    currentVideoList: [],
    selectedVideo: null,
    loading: false,
    video: null,
  };

  async componentDidMount() {
    await this.addView(this.props.match.params.id);
    await this.getVideoData(this.props.match.params.id);

    this.getAllVideos();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      window.scrollTo(0, 0);
      await this.addView(this.props.match.params.id);
      await this.getVideoData(this.props.match.params.id);
      this.getAllVideos();
    }
  }

  async addView(videoId) {
    await fetch(`${endpoint}/${videoId}/views`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
  }
 
  getAllVideos = async () => {
    let response;
    response = await fetch(
      `${endpoint}${this.props.searchText && this.props.searchText !== ""
        ? `?title=${this.props.searchText}`
        : ""
      }`
    );
    if (!response.ok) {
      return;
    }
    response = await response.json();

    this.setState({ currentVideoList: response.videos });
  };

  getVideoData = async (id) => {
    let response;

    response = await fetch(`${endpoint}/${id}`);
    if (!response.ok) {
      this.props.history.push("/");
      return;
    }
    response = await response.json();
    this.setState({ video: response });
  };
  handleVoteChange = (id, vote, change) => {
    let reqObj = {
      vote,
      change,
    };
    this.changeVote(id, reqObj);
  };

  changeVote = async (videoId, reqObj) => {
    let response;
    response = await fetch(`${endpoint}/${videoId}/votes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(reqObj),
    });
    if (response.ok) {
      this.getVideoData(this.props.match.params.id);
    }
  };

  render() {
    return (
      <>
        <Header
          isUploadVisible={false}
          isSearchVisible={false}
          refresh={this.fetchData}
        ></Header>
        <Grid container>
          {this.state.video ? (
            <Grid item xs={12}>
              {" "}
              <div className="container">
                <div className="iframe-parent">
                  <iframe
                    src={`https://${this.state.video.videoLink}`}
                    className="iframe-main"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                  ></iframe>
                </div>
              </div>
              <div className="container ">
                <div className="video-bar ">
                  <div>
                    <p className="playing-title">{this.state.video.title}</p>
                    <div className={"line"}>
                      <span className={"tag views-tag"} >
                        {this.state.video.viewCount}
                      </span>
                      <div className={"dot"}></div>
                      <span className={"tag content-rating-tag"}>
                        {this.state.video.contentRating}
                      </span>
                      <div className={"dot"}></div>
                      <span className={"tag release-date-tag"}>
                        {this.state.video.releaseDate}
                      </span>
                    </div>
                  </div>

                  <div className="vote-container">
                    <span
                      className="vote-pill upvote-pill"
                      onClick={() =>
                        this.handleVoteChange(
                          this.state.video.id,
                          "upVote",
                          "increase"
                        )
                      }
                    >
                      <ThumbUpIcon className="thumb-icon" />{" "}
                      <span>{this.state.video.votes.upVotes}</span>
                    </span>
                    <span
                      className="vote-pill downvote-pill"
                      onClick={() =>
                        this.handleVoteChange(
                          this.state.video.id,
                          "downVote",
                          "increase"
                        )
                      }
                    >
                      <ThumbDownIcon className="thumb-icon" />{" "}
                      <span>{this.state.video.votes.downVotes}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
          ) : (
              <div>Loading...</div>
            )}
          <Grid item xs={12}>
            <Explore videoList={this.state.currentVideoList} />
          </Grid>
          {/* <Dashboard
            // searchText={this.state.searchText}
            ref={this.Dashboard}
            // handleSelectVideo={this.setSelectedVideo}
            // selectedVideo={this.state.selectedVideo}
          /> */}
        </Grid>
      </>
    );
  }
}

export default withRouter(VideoPlayerView);
