import React, { Component } from "react";
import API from "../utils/API";
import "./Main.css"
import { socket } from "../components/Nav";


class Main extends Component {
    state = {
        gloStatsTable: [],
        statsData: []
    };

    componentDidMount(){
      this.getGloStats();
      socket.on("new_data", this.getGloStats);
    }

    componentWillUnmount() {
        socket.off("new_data");
    }

  getGloStats = () => {
      API.getStats()
          .then(res => {
              let table = []
          table.push(<tr><td><h2>Country</h2></td><td><h2>Region</h2></td><td><h2>Cases</h2></td><td><h2>Deaths</h2></td><td><h2>Recovered</h2></td></tr>)
              for (let i = 0; i < res.data.length; i++) {
                  let children = []
              children.push(<td className="entry">{res.data[i].country}</td>)
              children.push(<td className="entry">{res.data[i].region}</td>)
              children.push(<td className="entry">{res.data[i].cases}</td>)
              children.push(<td className="entry">{res.data[i].deaths}</td>)
              children.push(<td className="entry">{res.data[i].recovered}</td>)
              table.push(<tr>{children}</tr>)
              }
              this.setState({gloStatsTable: table});
              this.setState({statsData: res.data})
          })
          .catch(err => console.log(err));
  };

  render() {
    return (
        <div className="gloStats">
        <h2>Covid-19 Global Statistics</h2>
        <table className="gloStatsTable">
            {this.state.gloStatsTable}
        </table>
    </div>
    );
  }
}

export default Main;
