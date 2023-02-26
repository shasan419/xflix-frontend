import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Dashboard.css";

export default function Dashboard(props) {

  Date.getFormattedDateDiff = function(date1, date2) {
    var b = moment(date1),
        a = moment(date2),
        intervals = ['years','months','weeks','days','hours','minutes','seconds'],
        out = [];
  
    for(var i=0; i<intervals.length; i++){
        var diff = a.diff(b, intervals[i]);
        b.add(diff, intervals[i]);
        if(diff !== 0){
          out.push(diff + ' ' + intervals[i] + ' ago');
          break;
        }
    }
    if(out === []){
      out.push('just now');
    }
    return out;
  };
  
  var today   = new Date(),
      releaseDate = new Date(props.data.releaseDate);
  props.data.date =  Date.getFormattedDateDiff(releaseDate, today);
  const fun = {
    pathname:"/"+props.data._id,
    state: props.allData,
    // title:props.data.title,
    // linkurl:props.data.videoLink,
    // rating:props.data.contentRating,
    date:props.data.date,
    // upVote:props.data.votes.upVotes,
    // downVote:props.data.votes.downVotes
  };

  return (
    <Link to={fun} className={"video-tile-link"} >
          <div className='video-tile'>
          <div className='image-container'>
            <img src={props.data.previewImage} alt="thumbnail"/>
          </div>
    
          <div className='video-info'>
        <div className='semi-bold show-max-two-lines'>{props.data.title}</div>
            <div className='video-preview-metadata-container'>
              <div><span>{props.data.date}</span></div>
            
            </div>
          </div>
        </div>
        </Link>
  );

 
  // contentRating: "12+"
  // genre: "Movies"
  // previewImage: "https://i.ytimg.com/vi/nx2-4l4s4Nw/mqdefault.jpg"
  // releaseDate: "18 Jan 2021"
  // title: "Consumed by the Apocalypse"
  // videoLink: "youtube.com/embed/nx2-4l4s4Nw"
  // viewCount: 83

}
