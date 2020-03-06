import React, { Component } from "react";
import API from "../utils/API";
import "./News.css"
import { List, ListItem } from "../components/List";


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
        news: []
        };
    }

    getNews = () => {
        API.getNews()
        .then(res => {
            this.setState({ news: res.data})
        })
        .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getNews();
        console.log(this.props.language)
    }

    render() {
        return (
            <div className="newsBox">
                {this.props.language == "en" ? (
                    <h2>Latest News</h2>
                ) : (
                    <h2>最新消息</h2>
                )}
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
