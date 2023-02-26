import React, { Component } from "react";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import UploadForm from "../Forms/UploadForm";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Dialog
          onClose={this.props.handleCancel}
          aria-labelledby="simple-dialog-title"
          open={this.props.isUploadFormVisible}
        >
          <Grid container className="dialog">
            <Grid item xs={10}>
              <h3 className="form-header">Upload Video</h3>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="close"
                className={"close-button"}
                onClick={this.props.handleCancel}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <UploadForm
                onClose={this.props.handleCancel}
                refresh={this.props.refresh}
                genres={this.props.genres}
              />
            </Grid>
          </Grid>
        </Dialog>
        <header className="app-header">
          <Link to="/">
            <img src={"xflixlogo.svg"} alt="X Flix" id="logo" />
          </Link>
          {this.props.isSearchVisible && (
            <div className="search-container">
              <input
                type="text"
                id="search-input"
                value={this.props.searchText}
                onChange={this.props.handleSearchInput}
                placeholder="Search"
              />
              <button className="search-button">
                <Icon path={mdiMagnify} className="search-icon"></Icon>
              </button>
            </div>
          )}
          {this.props.isUploadVisible ? (
            <button
              className="primary-button "
              id="upload-btn"
              onClick={this.props.handleUploadButton}
            >
              Upload
            </button>
          ) : (
              <div></div>
            )}
        </header>
      </div>
    );
  }
}
