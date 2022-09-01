import React, { Component } from "react";
import NewsItem from "./newsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capatalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capatalize( this.props.category)} - NewsMonkey` ;
  }
  async upDateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9306c46676245b1aa5b94305b66ed82&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // this.setState(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  componentDidMount = async () => {
    this.upDateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.upDateNews();
  };

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.upDateNews();
  };

  render() {
    return (
      <div className="container my-3 text-center">
        <h1 style={{ margin: "30px" }}>Newsmonkey - top  {this.props.category} headlines</h1>
        {/* this.state.loading && => mean that if state of loading is true call <Spinner/> */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
