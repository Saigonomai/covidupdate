import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import API from "../../utils/API"
import socketIOClient from "socket.io-client";
import "./Nav.css"

var socket;
class Nav extends Component {
    constructor(){
        super();
        this.state = {
            canStatsTable: [],
            endpoint: "http://localhost:3001"
        };
        
        socket = socketIOClient(this.state.endpoint);
    }

componentDidMount(){
    this.getCanStats();
    this.getSocket();
    socket.on("new_data", this.getCanStats);
}

componentWillUnmount() {
    socket.off("new_data");
}

updateStats = () => {
    socket.emit("update_data");
}

getSocket= () => {
    API.getPort()
        .then(res => {
            console.log(res.data);
        })
}

getCanStats = () => {
    API.getCanStats()
        .then(res => {
            let table = []
        table.push(<tr><td>Region</td><td>Cases</td><td>Deaths</td><td>Recovered</td></tr>)
            for (let i = 0; i < res.data.length; i++) {
                let children = []
            children.push(<td>{res.data[i].region}</td>)
            children.push(<td>{res.data[i].cases}</td>)
            children.push(<td>{res.data[i].deaths}</td>)
            children.push(<td>{res.data[i].recovered}</td>)
            table.push(<tr>{children}</tr>)
            }
            this.setState({canStatsTable: table})
        })
        .catch(err => console.log(err));
};

    render(){
        return (
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
                    <NavLink exact to="/maps">
                    Canadian Interactive Map
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/news">
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
