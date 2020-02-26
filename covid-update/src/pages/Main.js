import React, { Component } from "react";
import API from "../utils/API";
import "./Main.css"


class Main extends Component {
    state = {
        canStatsTable: []
    };

    componentDidMount(){
        this.getCanStats();
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

  render() {
    return (
          <div className="canStats">
              <h2>Covid-19 Canadian Statistics</h2>
              <table className="canStatsTable">
                  {this.state.canStatsTable}
              </table>
          </div>
    );
  }
}

export default Main;
