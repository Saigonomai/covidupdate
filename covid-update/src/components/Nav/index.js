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
    socket.on("new_data", this.getCanStats);
}

componentWillUnmount() {
    socket.off("new_data");
}

updateStats = () => {
    let date_ob = new Date()
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let day = ("0" + (date_ob.getDate() - 1)).slice(-2);
    let check = month + "-" + day + "-" + year + ".csv"
    socket.emit("update_data", check);
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
                    <NavLink exact to="/">
                    Work in Progress
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/">
                    Still in development
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
