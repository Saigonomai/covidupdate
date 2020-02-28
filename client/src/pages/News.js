import React, { Component } from "react";
import API from "../utils/API";
import "./News.css"
import { List, ListItem } from "../components/List";


class News extends Component {
    state = {
        news: []
    };

    getNews = () => {
        API.getNews()
          .then(res => {
            this.setState({ news: res.data})
          })
          .catch(err => console.log(err));
      };

    componentDidMount() {
        this.getNews();
    }

    render() {
        return (
            <div className="newsBox">
                <List>
                {this.state.news.map(article => (
                  <ListItem
                  link={article.url}
                  title={article.title}
                  source={article.source.name}
                  author={article.author || "N/A"}
                  description={article.description || "N/A"}/>
                ))}
              </List>
            </div>
        );
    }
}

export default News;
