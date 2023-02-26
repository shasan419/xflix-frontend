import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./dashboard.css";
import moment from "moment";
import { Link } from "react-router-dom";

export default class Explore extends Component {
  render() {
    return (
      <div className="container">
        <Grid container className="video-grid">
          {this.props.videoList.length > 0 ? (
            this.props.videoList.map((video, idx) => (
              <Grid item xs={12} md={3} style={{ padding: "20px" }} >
                <Link to={"/video/" + video.id} className="video-tile-link">
                  <Grid container className="video-tile">
                    <Grid item xs={12}>
                      <img
                        src={video.previewImage}
                        alt="PREVIEW_IMAGE"
                        className="preview-image"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <p className="video-title">{video.title}</p>
                      <p className="video-sub-title">
                        {moment(video.releaseDate).fromNow()}
                      </p>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
            ))
          ) : (
              <div className="no-videos">
                <p>No videos found.</p>
              </div>
            )}
        </Grid>
      </div>
    );
  }
}
