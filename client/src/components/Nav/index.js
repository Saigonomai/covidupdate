import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import API from "../../utils/API"
import { NavHashLink } from 'react-router-hash-link';
import socketIOClient from "socket.io-client";
import "./Nav.css"

var socket;
class Nav extends Component {
    constructor(){
        super();
        this.state = {
            canStatsTable: [],
            language: "en"
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
            let table = []
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
        })
        .catch(err => console.log(err));
};

translate = () => {
    if (this.state.language == "en") {
        this.setState({language:"cn"});
    } else if (this.state.language == "cn") {
        this.setState({language:"en"});
    } else {
        this.setState({language:"en"});
    }
}

    render(){
        return (
        <nav  className="Navbar">
            <h1 className="Brand">
            Covid-19 Statistics Tracker
            </h1>
            <ul className="NavClass">
                <li>
                    <NavLink
                    exact to={{
                        pathname:"/",
                        language: this.state.language,
                        page:"main"
                    }}
                    >
                        Global Statistics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    exact to={{
                        pathname:"/",
                        language: this.state.language,
                        page:"maps"
                    }}
                    >
                    Canadian Interactive Map
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    exact to={{
                        pathname:"/news",
                        language: this.state.language
                    }}
                    >
                    Latest News
                    </NavLink>
                </li>
            </ul>

            <button className="refresh" onClick={this.updateStats}>Update Statistics</button>
            <p className="tooltip">Note: Database gets updated after 9PM EST everyday.</p>

            <div className="canStats">
                <h2>Covid-19 Canadian Statistics</h2>
                <table className="canStatsTable">
                    {this.state.canStatsTable}
                </table>
            </div>

        </nav>
        );
    }
}

export { Nav, socket};
