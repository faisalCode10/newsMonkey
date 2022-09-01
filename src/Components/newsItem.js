import React, { Component } from "react";

export class newsItem extends Component {
  render() {
    let { title, description, imageurl, newsUrl, author, date, source } = this.props;
    return (
      <div className="container my-3">
        <div className="card">
          <img
            src={
              !imageurl
                ? "https://image.cnbcfm.com/api/v1/image/107101232-NYSE-Trading-Floor-OB-Photo-220809-CC-PRESS-5.jpg?v=1660063639&w=1920&h=1080"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left : "90%", zIndex :"1"}} >
                {source}
                
              </span>
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                by {!author ? "unkown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default newsItem;
