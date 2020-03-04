import React, { Component } from "react";
import API from "../utils/API";
import "./Main.css"
import { socket } from "../components/Nav";
import Maps from "./Maps";


class Main extends Component {
    state = {
        gloStatsTable: [],
        statsData: [],
        query: ""
    };

    componentDidMount(){
    this.getGloStats();
    socket.on("new_data", this.getGloStats);
    }

    componentWillUnmount() {
        socket.off("new_data");
    }

    handleChange =  (e) => {
        this.setState({ query: e.target.value });
        console.log(this.state.query);
    }
    
    getGloStats = () => {
        API.getStats()
            .then(res => {
                let table = [];
            table.push(<tr><td><h2>Country</h2></td><td><h2>Region</h2></td><td><h2>Cases</h2></td><td><h2>Deaths</h2></td><td><h2>Recovered</h2></td></tr>)
                for (let i = 0; i < res.data.length; i++) {
                    let children = [];
                children.push(<td className="entry">{res.data[i].country}</td>)
                children.push(<td className="entry">{res.data[i].region}</td>)
                children.push(<td className="entry">{res.data[i].cases}</td>)
                children.push(<td className="entry">{res.data[i].deaths}</td>)
                children.push(<td className="entry">{res.data[i].recovered}</td>)
                table.push(<tr>{children}</tr>)
                }
                this.setState({gloStatsTable: table});
                this.setState({statsData: res.data});
            })
            .catch(err => console.log(err));
    };

    filterResults = () => {
        let table = [];
        for (let i = 0; i < this.state.statsData.length; i++) {
            let children = [];
            if ((this.state.statsData[i].country.toLowerCase().includes(this.state.query.toLowerCase()))
            || (this.state.statsData[i].region.toLowerCase().includes(this.state.query.toLowerCase()))){
                children.push(<td className="entry">{this.state.statsData[i].country}</td>)
                children.push(<td className="entry">{this.state.statsData[i].region}</td>)
                children.push(<td className="entry">{this.state.statsData[i].cases}</td>)
                children.push(<td className="entry">{this.state.statsData[i].deaths}</td>)
                children.push(<td className="entry">{this.state.statsData[i].recovered}</td>)
                table.push(<tr>{children}</tr>)
            }
        }
        this.setState({gloStatsTable: table});

        
    }

    render() {
        return (
            <div>
            <div className="gloStats">
            <h2>Covid-19 Global Statistics</h2>
            <div className="search">
            <input type="text" onChange={ this.handleChange } />
            <input
            type="button"
            value="Filter Statistics"
            onClick={ this.filterResults }
            />
            </div>
            <table className="gloStatsTable">
                {this.state.gloStatsTable}
            </table>
            </div>
            <div id="Maps">
            <Maps/>
            </div>
            </div>
        );
    }
}

export default Main;
