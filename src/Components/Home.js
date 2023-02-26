import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header.js";
import Dashboard from "./Dashboard.js";
import { config } from "../App";
import {  Input, Button, Row, Col } from "antd";
import "./Home.css";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import { Form,Select,DatePicker,Modal} from "antd";
import { mdiSwapVertical } from "@mdi/js";
import Icon from "@mdi/react";
// import UploadModal from "./UploadModal"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      loading: false,
      filteredVideos: [],
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
    // this.allVideos = [];
    // this.sortedVideos = [];
    // this.videoData =[];
    // this.rating = "";
    // this.genre = [];
    // this.sort = "";
    // this.search = "";
    // this.allVideoList = [];
    // this.videoList = [];

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async(values) => {

    const date = moment(values['date']).format("DD MMM YYYY")
    console.log(date)
    this.setState({
      confirmLoading: true,
    });
    const res = await fetch(config.endpoint + "/videos", {
      method:'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
          "videoLink": values['video-link'],
          "title": values['title'],
          "genre": values['genre'],
          "contentRating": values['age'],
          "releaseDate": date.toString(),
          "previewImage":values['thumbnail'] 
      })
      }).then(res => {
        this.setState({
          visible: false,
          confirmLoading: false
        });
        return res.json()})
      .catch(error => console.log(error));
    console.log(res)
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // getData = async () => {
  //   const res = await this.fetchVideos();
  //   if (res) {
      // this.allVideos = [...res.videos];
      // this.videoData = [...res.videos];

      // this.setState({
      //   allVideoList:[...this.res.videos],
      //   filteredVideos: [...this.res.videos],
      // });
      // console.log("allVideos :", this.allVideoList);
      // document.querySelectorAll('#content .active').forEach(function(item) {
      //   item.classList.remove('active');
      // })
      // document.querySelectorAll('#genre .active').forEach(function(item) {
      //   item.classList.remove('active');
      // })
  //   }
  // };

  // fetchVideos = async () => {
  //   const resp = await fetch(config.endpoint + "/videos")
  //     .then((res) => res.json())
  //     .catch((error) => console.log(error));
  //   console.log(resp);
  //   if (!resp) {
  //     return null;
  //   } else {
  //     return resp;
  //   }
  // };

  getDashboard = (data) => {
    return (
      <Col key={data._id}>
        <Dashboard data={data} allData ={this.state.allVideoList} />
      </Col>
    );
  };

  // getFlteredVideos = async () => {
  //   console.log(this.search)
  //   console.log(this.rating)
  //   console.log(this.genre.toString())
  //   if(this.sortedVideos.length !== 0){
  //     console.log("sorted present :", this.sortedVideos)
  //     if(this.search === "" && this.rating === "" && this.genre.length === 0){
  //       this.setState({
  //         filteredVideos: [...this.sortedVideos],
  //       });
  //     }else if(this.search !== "" && this.rating === "" && this.genre.length === 0){
  //       const data =  this.sortedVideos.filter(x=> x.title.toLowerCase().includes(this.search.toLowerCase()));
  //       this.setState({
  //         filteredVideos: [...data],
  //       });
  //     }else if(this.search === "" && this.rating !== "" && this.genre.length === 0){

  //       const data =  this.sortedVideos.filter((x) => x.contentRating === this.rating);
  //       this.setState({
  //         filteredVideos: [...data],
  //       });
  //       console.log(data)
  //     }else if(this.search === "" && this.rating === "" && this.genre.length !== 0){
  //       if(this.genre.length >1){
  //         const data =  this.sortedVideos.filter((x) => {
  //           for(var i=0;i<this.genre.length;i++){
  //             if(x.genre === this.genre[i]){
  //               return x;
  //             }
  //           }
  //         });
  //         console.log(data)
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }else{
  //         const data =  this.sortedVideos.filter(x=> x.genre === this.genre[0]);
  //         console.log(data)
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }
  //     }else if(this.search !== "" && this.rating !== "" && this.genre.length === 0){
        
  //       const data =  this.sortedVideos.filter(x=> x.title.toLowerCase().includes(this.search.toLowerCase()) && x.contentRating === this.rating);
  //       this.setState({
  //         filteredVideos: [...data],
  //       });
  //     }else if(this.search !== "" && this.rating === "" && this.genre.length !== 0){
  //       if(this.genre.length >1){
  //         const data =  this.sortedVideos.filter((x) => {
  //           for(var i=0;i<this.genre.length;i++){
  //             if(x.genre === this.genre[i] && x.title.toLowerCase().includes(this.search.toLowerCase())){
  //               return x;
  //             }
  //           }
  //         });
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }else{
  //         const data =  this.sortedVideos.filter(x=> x.genre === this.genre[0] && x.title.toLowerCase().includes(this.search.toLowerCase()));
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }
  //     }else if(this.search === "" && this.rating !== "" && this.genre.length !== 0){

  //       if(this.genre.length >1){
  //         const data =  this.sortedVideos.filter((x) => {
  //           for(var i=0;i<this.genre.length;i++){
  //             if(x.genre === this.genre[i] && x.contentRating === this.rating){
  //               return x;
  //             }
  //           }
  //         });
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }else{
  //         const data =  this.sortedVideos.filter(x=> x.genre === this.genre[0] && x.contentRating === this.rating);
  //         this.setState({
  //           filteredVideos: [...data],
  //         });
  //       }
  //     }
  //   }else{
  //     if(this.search === "" && this.rating === "" && this.genre.length === 0){
  //       this.getData();
  //     }else if(this.search !== "" && this.rating === "" && this.genre.length === 0){
  //       console.log("fetching/...")
  //       const res = await fetch(config.endpoint + "/videos?title="+this.search)
  //       .then((res) => res.json())
  //       .catch((error) => console.log(error));
  //       console.log("fetching/...")
  //       if (res) {
  //         console.log("fetching/...")
  //         this.allVideos = [...res.videos];
  //         this.setState({
  //           filteredVideos: [...this.allVideos],
  //         });
  //         console.log("get sortedVideos :", this.allVideos);
  //       }
  //     }else if(this.search === "" && this.rating !== "" && this.genre.length === 0){

  //       console.log(this.rating)
  //       const res = await fetch(config.endpoint + `/videos?contentRating=${this.rating}`)
  //       .then((res) => res.json())
  //       .catch((error) => console.log(error));
  //       console.log(res)
  //       if (res) {
  //         this.allVideos = [...res.videos];
  //         this.setState({
  //           filteredVideos: [...this.allVideos],
  //         });
  //         console.log("get sortedVideos :", this.allVideos);
  //       }
  //     }else if(this.search === "" && this.rating === "" && this.genre.length !== 0){
  //         const res = await fetch(config.endpoint + `/videos?genres=${this.genre.toString()}`)
  //         .then((res) => res.json())
  //         .catch((error) => console.log(error));
  //         if (res) {
  //           this.allVideos = [...res.videos];
  //           this.setState({
  //             filteredVideos: [...this.allVideos],
  //           });
  //           console.log("get sortedVideos :", this.allVideos);
  //         }
  //     }else if(this.search !== "" && this.rating !== "" && this.genre.length !== 0){
 
  //         const res = await fetch(config.endpoint + `/videos?title=${this.search}&genres=${this.genre.toString()}&contentRating=${this.rating}%22`)
  //         .then((res) => res.json())
  //         .catch((error) => console.log(error));
  //         if (res) {
  //           this.allVideos = [...res.videos];
  //           this.setState({
  //             filteredVideos: [...this.allVideos],
  //           });
  //           console.log("get sortedVideos :", this.allVideos);
  //         }
  //     }
  //   }
  // };

  // getSorted = async(event) => {
  //   var e = event.target.value;
  //   this.sort = e;
  //   if(e === "viewCount"){
  //     const res = await fetch(config.endpoint + "/videos?sortBy=viewCount")
  //     .then((res) => res.json())
  //     .catch((error) => console.log(error));
  //     if (res) {
  //       this.sortedVideos = [...res.videos];
  //       this.allVideos = [...res.videos];
  //       this.setState({
  //         filteredVideos: [...this.sortedVideos],
  //       });
  //       console.log("sortedVideos :", this.sortedVideos);
  //       document.querySelectorAll('#content .active').forEach(function(item) {
  //         item.classList.remove('active');
  //       })
  //       document.querySelectorAll('#genre .active').forEach(function(item) {
  //         item.classList.remove('active');
  //       })
  //       this.rating = ""
  //       this.genre = []

  //     }
  //   }else{
  //     const res = await fetch(config.endpoint + "/videos")
  //     .then((res) => res.json())
  //     .catch((error) => console.log(error));
  //     if (res) {
  //       this.sortedVideos = [...res.videos];
  //       this.allVideos = [...res.videos];
  //       this.setState({
  //         filteredVideos: [...this.sortedVideos],
  //       });
  //       console.log("sortedVideos :", this.sortedVideos);
  //       document.querySelectorAll('#content .active').forEach(function(item) {
  //         item.classList.remove('active');
  //       })
  //       document.querySelectorAll('#genre .active').forEach(function(item) {
  //         item.classList.remove('active');
  //       })
  //       this.rating = ""
  //       this.genre = []

  //     }
  //   }
  // };

  // sortByRating = (event) => {
  //   if (document.querySelector('#content .active') !== null) {
  //     document.querySelector('#content .active').classList.remove('active');
  //   }
  //   event.target.className += " active";
  //   this.rating = event.target.value;
  //   if(this.rating === "Anyone"){

  //   }else if(this.sortedVideos.length !== 0){
  //     this.rating = this.rating+"+";
  //   }else if(this.sortedVideos.length === 0){
  //     this.rating = this.rating+"%22";
  //   }

  //   this.getFlteredVideos();
  // };

  // sortByGenre = (event) => {
  //   var val = event.target.value;
  //   if(val === ""){
  //     document.querySelectorAll('#genre .active').forEach(function(item) {
  //       item.classList.remove('active');
  //     })
  //     event.target.className += " active";
  //     this.genre = []
  //   }else{
  //     const check = this.genre.includes(val);
  //         if (!check && this.genre.length === 0) {
  //           if (document.querySelector('#genre .active') !== null) {
  //             document.querySelector('#genre .active').classList.remove('active');
  //           }
  //           event.target.className += " active";
  //           this.genre.push(val);
  //         }else if(!check){
  //           event.target.className += " active";
  //           this.genre.push(val);
  //         }else{
  //           event.target.className = 'genre-btn';
  //           for(var i=0;i<this.genre.length;i++){
  //             if(this.genre[i]=== val){
  //               this.genre.splice(i, 1);
  //             }
  //           }
  //           console.log(this.genre)
  //         }
  //   }
  //   this.getFlteredVideos();
  // };

  // debounceSearch = (event) => {
  //   let val = event.target.value;
  //   console.log(val)
  //   const later = () => {
  //     clearTimeout(this.debounceTimeout);
  //     this.searchFunction(val);
  //   };

  //   clearTimeout(this.debounceTimeout);
  //   this.debounceTimeout = setTimeout(later, 300);
    
  // };

  // searchFunction = (text) => {
  //   this.setState({
  //     searchText: text
  //   });
    
  //   // this.getFlteredVideos();  
  // };

  componentDidMount() {
    this.performAPICall();
  }

//   ModalRef = ({showModal}) => {
//     this.showModal = showModal;
//  }
 
//  openModal = () => {
//    this.showModal();
//  }

handleSearchInput = async(evt) => {
  let value = evt.target.value;
  this.setState({ searchText: value });
  let filteredVideos = await this.state.allVideoList.filter((x) => {
    if(x.title.toLowerCase().includes(value.toLowerCase())){
      return x
    }
  })
  if (this.state.searchText.length === 0) { filteredVideos = this.state.allVideoList }

  this.setState({videoList: filteredVideos,})
};

performAPICall = async () => {
  let response;
  let URL = `${config.endpoint}/videos`;


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

  this.setState({allVideoList: response.videos})

  let filteredVideos = await this.getFilteredVideosByGenre(
    response.videos,
    this.state.selectedGenres
  );
  this.setState({videoList: filteredVideos,})
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
  if (selectedGenres.length === 0) {
    selectedGenres.push("all");
  }
  this.setState({ selectedGenres }, async () => {
    let filteredVideos = await this.getFilteredVideosByGenre(
      this.state.allVideoList,
      this.state.selectedGenres
    );
    this.setState({videoList: filteredVideos,})
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
    if (selectedContentRatings.length === 0) { filteredVideos = this.state.allVideoList }

    this.setState({videoList: filteredVideos,})
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
      ...videos.filter((video) => video.genre === genre),
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
      ...videos.filter((video) => video.contentRating === contentRating),
    ];
  });
  return filteredVideos;
};


setSortBy = (e) => {
  this.setState({ sortBy: e.target.value }, () => { this.performAPICall();})

}
  render() {
    return (
      <div>
         <Header  history={this.history}      
          search = {

            <Input.Search className={'ant-input-search'} placeholder="Search" 
            onChange={this.handleSearchInput.bind(this)} 
            // onSearch={this.handleSearchInput.bind(this)} 
            enterButton />

          } 
          upload = { 
           <Button type="primary" id="upload-btn" onClick={this.showModal.bind(this)}>
            <img src="upload_24px.svg" className="upload-img" alt="upload_icon"></img><span className="upload-text">Upload</span>
          </Button>
          }  
          />
        {/* <UploadModal ref={this.ModalRef.bind(this)}></UploadModal> */}
        <Modal title="Upload video" visible={this.state.visible} onCancel={this.handleCancel.bind(this)} footer={null}>
      <Form
        name="upload-form"
        method="post"
        onFinish={this.handleOk.bind(this)}
        layout="horizontal"
        size={"large"}
      >
      <Form.Item 
       rules={[
        {
          required: true,
          message: 'Video link is required!',
        },
      ]}
      // rules={[{ required: true, message: `Please enter your name.` }]}
      name="video-link">
        <Input placeholder="Video link"/>
        {/* This link will be used to derive video */}
      </Form.Item>
      <Form.Item  
      rules={[{ required: true, message: `Thumbnail link is required!` }]}
      name="thumbnail">
        <Input placeholder="Thumbnail image link"/>
        {/* This link will be used to preview thumbnail image */}
      </Form.Item>
      <Form.Item  
      rules={[{ required: true,  message: `Title is required!` }]}
      name="title">
        <Input placeholder="Title"/>
        {/* The title will be representative text for video */}
      </Form.Item>
      <Form.Item 
      rules={[{ required: true, message: `Genre is required!` }]}
      name="genre">
        <Select placeholder="Genre">
          <Select.Option value="Education">Education</Select.Option>
          <Select.Option value="Sports">Sports</Select.Option>
          <Select.Option value="Comedy">Comedy</Select.Option>
          <Select.Option value="Lifestyle">Lifestyle</Select.Option>
        </Select>
        {/* Genre will be used to categorize video */}
      </Form.Item>
      <Form.Item 
      rules={[{ required: true, message: `Age group is required!` }]}
      name="age">
        <Select placeholder="Suitable age group for the clip">
          <Select.Option value="Anyone">Any age group</Select.Option>
          <Select.Option value="7+">7+</Select.Option>
          <Select.Option value="12+">12+</Select.Option>
          <Select.Option value="16+">16+</Select.Option>
          <Select.Option value="18+">18+</Select.Option>
        </Select>
        {/* This will be used to filter videos on age group suitability */}
      </Form.Item>
      <Form.Item label="Upload and Publish date" 
      rules={[{ required: true, message: `Upload and Publish date is required!` }]}
      name="date">
        <DatePicker />
        {/* <p>This will be used to filter videos on age group suitability</p> */}
      </Form.Item>
      <Form.Item >
      <Button type="primary" id="upload-btn-submit" htmlType="submit" disabled={false} loading={this.state.confirmLoading}>
          Upload Video
      </Button>
      <Button id="upload-btn-cancel" onClick={this.handleCancel.bind(this)}>
          Cancel
      </Button>
      </Form.Item>
      </Form>
      </Modal>

      <Grid container>
      <div className="tool-bar">
        {this.state.allGenres.map((genre, idx) => (
          <div
            onClick={() => this.handleGenreChange(genre)}
            className={
              this.state.selectedGenres.includes(genre.value)
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
          <select onChange={this.setSortBy} className="sort-select">
            <option value="releaseDate" id="release-date-option" className="select-option">Upload Date</option>
            <option value="viewCount" id="view-count-option" className="select-option">Views</option>
          </select>
        </div>
      </div>
      <div className="tool-bar" style={{ paddingBottom: "20px" }}>
        {this.state.allContentRatings.map((contentRating, idx) => (
          <div
            onClick={() => this.handleContentRatingChange(contentRating)}
            className={
              this.state.selectedContentRatings.includes(contentRating.value)
                ? "active-toolbar-button content-rating-btn"
                : "toolbar-button content-rating-btn"
            }
            id={contentRating.value}
          >
            {contentRating.label}
          </div>
        ))}

      </div>
        </Grid>
        <Row className="main-body">
          <Col>
            <Row className="second-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify={"center"}>
              {this.state.allVideoList.length !== 0 ? (
                this.state.videoList.map((data) => this.getDashboard(data))
              ) : this.state.loading ? (
                <div className="loading-text">Loading videos...</div>
              ) : (
                <div className="loading-text">No videos</div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
