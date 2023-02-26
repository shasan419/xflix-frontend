import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header.js";
import Dashboard from "./Dashboard.js";
import { Button, Row, Col } from "antd";
import Iframe from 'react-iframe';
import { config } from "../App";
import "./Video.css";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.allVideos = [];
    this.state = {
      loading: false,
      likeon:true,
      unlikeon:false,
      filteredVideos: [],
      videoData : []
    };
  }


  getDashboard = (data) => {
    return (
      <Col key={data._id}>
        <Dashboard data={data} allData = {this.allVideos}/>
      </Col>
    );
  };

  componentDidMount = async() => {
    const res = this.props.location.state
    this.allVideos = [...res];
    // const data = 
    // this.videoData = this.props.location.linkurl

    this.setState({
      filteredVideos: [...this.allVideos],
      // videoData: this.props.location.linkurl
    });
    let id = this.props.match.params.videoId
    const resp = await fetch(config.endpoint + "/videos/"+id)
    .then((res) => res.json())
    .catch((error) => console.log(error));  
    if(resp){
      this.setState({
        videoData: resp
      });
      await fetch(config.endpoint + "/videos/"+id+"/views")
      .then((res) => res)
      .catch((error) => console.log(error)); 

    } 
  }

  like = async(val) => {
    let id = this.props.match.params.videoId
    const resp = await fetch(config.endpoint + "/videos/"+id+"/votes", {
      method:'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
          "vote": "upVote",
          "change": val 
      })
    })
    .then((res) => res)
    .catch((error) => console.log(error)); 
    if(resp.ok){
      if(val === "decrease"){
        this.setState({
          likeon:false
        })
      }else{
        this.setState({
          likeon:true
        })
      }
      this.componentDidMount();
    }
  }

  unlike = async(val) => {
    let id = this.props.match.params.videoId
    const resp = await fetch(config.endpoint + "/videos/"+id+"/votes", {
      method:'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        "vote": "downVote",
        "change": val 
      })
    })
    .then((res) => res)
    .catch((error) => console.log(error));
    if(resp.ok){
      if(val === "decrease"){
        this.setState({
          unlikeon:false
        })
      }else{
        this.setState({
          unlikeon:true
        })
      }
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div>
          <Header history={this.props.history} />
          {this.state.videoData.length !== 0 ? (
            <>
          <div className="main">
          <div className="iframe-parent">
          <Iframe url={`https://www.${this.state.videoData.videoLink}`} width="100%" height="100%" allow="fullscreen" className="iframe" /> 
          </div> 
          </div>
          <div className="jack">
          <h2 className="title">
              {this.state.videoData.title}
          </h2>
          <span className="rating-date">{this.state.videoData.contentRating} <img src="dot.svg" alt=""/> {this.props.location.date}</span>
          </div>
          <div className="monster">
          <div className="button">
          {this.state.likeon ? (<Button id="upvote" onClick={this.like.bind(this,"decrease")}><img src="updark.svg" alt="" />{this.state.videoData.votes.upVotes}</Button>
          ):<Button id="upvote" onClick={this.like.bind(this,"increase")}><img src="updark.svg" alt="" />{this.state.videoData.votes.upVotes}</Button>}
          {this.state.unlikeon ? ( <Button id="downvote" onClick={this.unlike.bind(this,"decrease")}><img src="downdark.svg" alt=""/>{this.state.videoData.votes.downVotes}</Button>
          ):<Button id="downvote" onClick={this.unlike.bind(this,"increase")}><img src="downdark.svg" alt=""/>{this.state.videoData.votes.downVotes}</Button>}
          </div>
          </div>
          <div className="Line"></div></>
          ) : <div className="loading-text">Loading video...</div>}
          <Row>
          <Col>
            {/* <div className="container "> */}
            <Row className="second-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify={"center"}>
              {this.allVideos.length !== 0 ? (
                this.state.filteredVideos.map((data) => this.getDashboard(data))
              ) : this.state.loading ? (
                <div className="loading-text">Loading videos...</div>
              ) : (
                <div className="loading-text">No videos to load</div>
              )}
            </Row>
            {/* </div> */}
          </Col>
        </Row>

      </div>
    );
  }

}

export default withRouter(Video);
