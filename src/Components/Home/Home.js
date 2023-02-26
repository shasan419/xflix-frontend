import React, { Component } from "react";
import "./home.css";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import { endpoint } from "../../Config/config";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isUploadFormVisible: false,
      searchText: null,
      selectedVideo: null,
      sortBy: "releaseDate",
      videoList: [],
      allVideoList: [],
      selectedGenres: ["all"],
      allGenres: [
        { label: "All", value: "all" },
        { label: "Education", value: "Education" },
        { label: "Sports", value: "Sports" },
        { label: "Comedy", value: "Comedy" },
        { label: "Lifestyle", value: "Lifestyle" },
      ],
      allContentRatings: [
        { label: "Anyone", value: "Anyone" },
        { label: "7+", value: "7plus" },
        { label: "12+", value: "12+" },
        { label: "16+", value: "16+" },
        { label: "18+", value: "18+" },
      ],
      selectedContentRatings: [],

    };
  }

  componentDidMount() { }

  handleUploadButton = () => {
    this.setState({ isUploadFormVisible: true });
  };
  handleCancel = () => {
    this.setState({ isUploadFormVisible: false });
  };
  setSelectedVideo = (value) => {
    this.setState({ selectedVideo: value });
  };
  handleSearchInput = (evt) => {
    this.setState({ searchText: evt.target.value });
  };

  performAPICall = async () => {
    let response;
    let URL = `${endpoint}`;


    if (this.state.searchText?.length > 0) {
      URL += `?title=${this.state.searchText}`;
      URL += `&sortBy=${this.state.sortBy}`
    }
    else {
      URL += `?sortBy=${this.state.sortBy}`
    }

    response = await fetch(
      URL
    );
    if (!response.ok) {
      return;
    }
    response = await response.json();

    this.setState({ allVideoList: response.videos });

    let filteredVideos = await this.getFilteredVideosByGenre(
      response.videos,
      this.state.selectedGenres
    );
    this.setState({ videoList: filteredVideos });
    return filteredVideos;
  };

  handleGenreChange = async (genre) => {
    this.setState({ selectedContentRatings: [] })
    let selectedGenres = this.state.selectedGenres;
    let uniqueFilters = new Set(selectedGenres);
    selectedGenres = [...uniqueFilters];

    if (genre.value === "all") {
      if (selectedGenres.includes(genre.value)) {
      } else {
        selectedGenres = ["all"];
      }
    } else {
      if (this.state.selectedGenres.includes(genre.value)) {
        selectedGenres = selectedGenres.filter(
          (elem) => elem !== "all" && elem !== genre.value
        );
      } else {
        selectedGenres = selectedGenres.filter((elem) => elem !== "all");
        selectedGenres.push(genre.value);
      }
    }
    uniqueFilters = new Set(selectedGenres);
    selectedGenres = [...uniqueFilters];
    if (selectedGenres.length == 0) {
      selectedGenres.push("all");
    }
    this.setState({ selectedGenres }, async () => {
      let filteredVideos = await this.getFilteredVideosByGenre(
        this.state.allVideoList,
        this.state.selectedGenres
      );
      this.setState({ videoList: filteredVideos });
    });
  };

  handleContentRatingChange = async (contentRating) => {
    this.setState({ selectedGenres: ["all"] })

    let selectedContentRatings = this.state.selectedContentRatings;
    let uniqueFilters = new Set(selectedContentRatings);
    selectedContentRatings = [...uniqueFilters];


    if (this.state.selectedContentRatings.includes(contentRating.value)) {
      selectedContentRatings = selectedContentRatings.filter(
        (elem) => elem !== contentRating.value
      );
    } else {
      selectedContentRatings.push(contentRating.value);
    }


    uniqueFilters = new Set(selectedContentRatings);
    selectedContentRatings = [...uniqueFilters];
    this.setState({ selectedContentRatings }, async () => {
      let filteredVideos = await this.getFilteredVideosByContentRating(
        this.state.allVideoList,
        this.state.selectedContentRatings
      );
      if (selectedContentRatings.length == 0) { filteredVideos = this.state.allVideoList }

      this.setState({ videoList: filteredVideos });
    });
  };

  getFilteredVideosByGenre = (videos, genres) => {
    let filteredVideos = [];

    genres.map((genre) => {
      if (genre === "all") {
        filteredVideos = videos;
        return filteredVideos;
      }
      filteredVideos = [
        ...filteredVideos,
        ...videos.filter((video) => video.genre == genre),
      ];
    });
    return filteredVideos;
  };

  getFilteredVideosByContentRating = (videos, contentRatings) => {
    let filteredVideos = [];

    contentRatings.map((contentRating) => {
      if (contentRatings === "anyone") {
        filteredVideos = videos;
        return filteredVideos;
      }
      filteredVideos = [
        ...filteredVideos,
        ...videos.filter((video) => video.contentRating == contentRating),
      ];
    });
    return filteredVideos;
  };


  setSortBy = (e) => {
    this.setState({ sortBy: e.target.value }, () => { this.performAPICall() })

  }

  render() {
    return (
      <div>
        <Header
          handleSearchInput={this.handleSearchInput}
          searchText={this.state.searchText}
          handleUploadButton={this.handleUploadButton}
          handleCancel={this.handleCancel}
          isSearchVisible={true}
          isUploadVisible={true}
          isUploadFormVisible={this.state.isUploadFormVisible}
          refresh={this.performAPICall}
          genres={this.state.allGenres}
        ></Header>
        <Dashboard
          handleGenreChange={this.handleGenreChange}
          selectedGenres={this.state.selectedGenres}
          genres={this.state.allGenres}

          handleContentRatingChange={this.handleContentRatingChange}
          selectedContentRatings={this.state.selectedContentRatings}
          contentRatings={this.state.allContentRatings}


          searchText={this.state.searchText}
          videoList={this.state.videoList}
          fetchVideos={this.performAPICall}
          sortBy={this.setSortBy}
        />
      </div>
    );
  }
}
