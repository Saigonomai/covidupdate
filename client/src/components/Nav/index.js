import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import API from "../../utils/API"
import { NavHashLink } from 'react-router-hash-link';
import socketIOClient from "socket.io-client";
import "./Nav.css"

var socket;
class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            canStatsTable: [],
            canStatsTableCN: [],
            language: this.props.language
        };
        
        socket = socketIOClient();
    }

componentDidMount(){
    this.getCanStats();
    socket.on("new_data", this.getCanStats);
}

componentWillUnmount() {
    socket.off("new_data");
}

updateStats = () => {
    socket.emit("update_data");
}

getCanStats = () => {
    API.getCanStats()
        .then(res => {
            let table = [];
            table.push(<tr><td>Region</td><td>Cases</td><td>Deaths</td><td>Recovered</td></tr>)
            let totalCases = 0;
            let totalDeaths = 0;
            let totalRecoveries = 0;
            for (let i = 0; i < res.data.length; i++) {
                let children = [];
                children.push(<td>{res.data[i].region}</td>)
                children.push(<td>{res.data[i].cases}</td>)
                children.push(<td>{res.data[i].deaths}</td>)
                children.push(<td>{res.data[i].recovered}</td>)
                table.push(<tr>{children}</tr>)
                totalCases += res.data[i].cases;
                totalDeaths += res.data[i].deaths;
                totalRecoveries += res.data[i].recovered;
            }
            table.push(<tr><td>Total</td><td>{totalCases}</td><td>{totalDeaths}</td><td>{totalRecoveries}</td></tr>)
            this.setState({canStatsTable: table})

            let tablecn = [];
            tablecn.push(<tr><td><h2>区域</h2></td><td><h2>确诊病例</h2></td><td><h2>死亡</h2></td><td><h2>治愈</h2></td></tr>)
            for (let i = 0; i < res.data.length; i++) {
                let childrencn = [];
                childrencn.push(<td>{res.data[i].regioncn}</td>)
                childrencn.push(<td>{res.data[i].cases}</td>)
                childrencn.push(<td>{res.data[i].deaths}</td>)
                childrencn.push(<td>{res.data[i].recovered}</td>)
                tablecn.push(<tr>{childrencn}</tr>)
            }
            tablecn.push(<tr><td>总计</td><td>{totalCases}</td><td>{totalDeaths}</td><td>{totalRecoveries}</td></tr>)
            this.setState({canStatsTableCN: tablecn});
        })
        .catch(err => console.log(err));
};

    render(){
        return (
            <div>
                {this.props.language == "en" ? (
                <nav  className="Navbar">
                    <h1 className="Brand">
                    Covid-19 Statistics Tracker
                    </h1>
                    <ul className="NavClass">
                        <li>
                            <NavLink exact to="/">
                            Global Statistics
                            </NavLink>
                        </li>
                        <li>
                            <NavHashLink
                            to="/#Maps"
                            scroll={el => el.scrollIntoView({ behavior: 'smooth'})}
                            >
                            Canadian Interactive Map
                            </NavHashLink>
                        </li>
                        <li>
                            <NavLink exact to="/news">
                            Latest News
                            </NavLink>
                        </li>
                    </ul>
        
                    <button className="refresh" onClick={this.updateStats}>Update Statistics</button>
                    <button className="refresh" onClick={this.props.translate}>Change Language/改变语言(EN/CN)</button>
                    <p className="tooltip">Note: Database gets updated after 9PM EST everyday.</p>
        
                    <div className="canStats">
                        <h2>Covid-19 Canadian Statistics</h2>
                        <table className="canStatsTable">
                            {this.state.canStatsTable}
                        </table>
                    </div>
        
                </nav>
                ) : (
                <nav  className="Navbar">
                    <h1 className="Brand">
                    Covid-19统计跟踪
                    </h1>
                    <ul className="NavClass">
                        <li>
                            <NavLink exact to="/">                    >
                            全球统计
                            </NavLink>
                        </li>
                        <li>
                            <NavHashLink
                            to="/#Maps"
                            scroll={el => el.scrollIntoView({ behavior: 'smooth'})}
                            >
                            加拿大互动地图
                            </NavHashLink>
                        </li>
                        <li>
                            <NavLink exact to="/news">
                            最新消息
                            </NavLink>
                        </li>
                    </ul>
        
                    <button className="refresh" onClick={this.updateStats}>更新统计</button>
                    <button className="refresh" onClick={this.props.translate}>Change Language/改变语言(EN/CN)</button>
                    <p className="tooltip">注意：数据库每天在美国东部标准时间晚上9点之后更新</p>
        
                    <div className="canStats">
                        <h2>Covid-19加拿大统计</h2>
                        <table className="canStatsTable">
                            {this.state.canStatsTableCN}
                        </table>
                    </div>
        
                </nav>
                )}
            </div>

        );
    }
}

export { Nav, socket};
