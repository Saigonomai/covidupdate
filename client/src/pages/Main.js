import React, { Component } from "react";
import API from "../utils/API";
import "./Main.css"
import { socket } from "../components/Nav";
import Maps from "./Maps";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gloStatsTable: [],
            statsData: [],
            gloStatsTableCN: [],
            query: ""
        };
    }

    componentDidMount(){
        this.getGloStats();
        socket.on("new_data", this.getGloStats);
        if (window.location.href.includes("#Maps")) {
            this.mapsDiv.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentWillUnmount() {
        socket.off("new_data");
    }

    componentDidUpdate() {
        if (window.location.href.includes("#Maps")) {
            this.mapsDiv.scrollIntoView({ behavior: "smooth" });
        }
    }

    handleChange =  (e) => {
        this.setState({ query: e.target.value });
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
                let tablecn = [];
                tablecn.push(<tr><td><h2>国家</h2></td><td><h2>区域</h2></td><td><h2>确诊病例</h2></td><td><h2>死亡</h2></td><td><h2>治愈</h2></td></tr>)
                for (let i = 0; i < res.data.length; i++) {
                    let childrencn = [];
                childrencn.push(<td className="entry">{res.data[i].countrycn}</td>)
                childrencn.push(<td className="entry">{res.data[i].regioncn}</td>)
                childrencn.push(<td className="entry">{res.data[i].cases}</td>)
                childrencn.push(<td className="entry">{res.data[i].deaths}</td>)
                childrencn.push(<td className="entry">{res.data[i].recovered}</td>)
                tablecn.push(<tr>{childrencn}</tr>)
                }
                this.setState({gloStatsTableCN: tablecn});
                this.setState({statsData: res.data});
            })
            .catch(err => console.log(err));
    };

    filterResults = () => {
        let table = [];
        table.push(<tr><td><h2>Country</h2></td><td><h2>Region</h2></td><td><h2>Cases</h2></td><td><h2>Deaths</h2></td><td><h2>Recovered</h2></td></tr>)
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

    filterResultsCN = () => {
        let table = [];
        table.push(<tr><td><h2>国家</h2></td><td><h2>区域</h2></td><td><h2>确诊病例</h2></td><td><h2>死亡</h2></td><td><h2>治愈</h2></td></tr>)
        console.log(this.state.statsData);
        for (let i = 0; i < this.state.statsData.length; i++) {
            console.log(this.state.statsData[i]);
            console.log(this.state.statsData[i].countrycn)
            let children = [];
            if ((this.state.statsData[i].countrycn.includes(this.state.query))
            || (this.state.statsData[i].regioncn.includes(this.state.query))){
                children.push(<td className="entry">{this.state.statsData[i].countrycn}</td>)
                children.push(<td className="entry">{this.state.statsData[i].regioncn}</td>)
                children.push(<td className="entry">{this.state.statsData[i].cases}</td>)
                children.push(<td className="entry">{this.state.statsData[i].deaths}</td>)
                children.push(<td className="entry">{this.state.statsData[i].recovered}</td>)
                table.push(<tr>{children}</tr>)
            }
        }
        this.setState({gloStatsTableCN: table});

        
    }


    render() {
        return (
            <div>
                {this.props.language == "en" ? (
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
                        <div id="Maps" ref={(el) => { this.mapsDiv = el; }}>
                            <Maps
                            language={this.props.language}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="gloStats">
                            <h2>Covid-19全球统计</h2>
                            <div className="search">
                                <input type="text" onChange={ this.handleChange } />
                                <input
                                type="button"
                                value="过滤统计"
                                onClick={ this.filterResultsCN }
                                />
                            </div>
                            <table className="gloStatsTable">
                                {this.state.gloStatsTableCN}
                            </table>
                        </div>
                        <div id="Maps" ref={(el) => { this.mapsDiv = el; }}>
                            <Maps
                            language={this.props.language}
                            />
                        </div>
                    </div>

                )}
            </div>
        );
    }
}

export default Main;
