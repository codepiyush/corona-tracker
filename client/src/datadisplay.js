import React from 'react'

function DataDisplay({ data }) {
    // console.log(data)
    return (
        <React.Fragment>
            <div className="upper">
                <div className=".md-whiteframe-6dp ">
                    <img src={require("./assets/total.png")} alt="" height="35px" width="35px" style={{ padding: "2.5px" }} />
                    <p>Total Cases</p>
                    <p> <span className="redInc">{data[0].cases.new}</span> {data[0].cases.total}</p>

                </div>
                <div className=".md-whiteframe-6dp ">
                    <img src={require("./assets/healthy.png")} alt="" height="40px" width="40px" />
                    <p>Recovered</p>
                    <p>{data[0].cases.recovered}</p>

                </div>
                <div className="md-whiteframe-6dp ">
                    <img src={require("./assets/death.png")} alt="" height="35px" width="35px" style={{ padding: "2.5px" }} />
                    <p>Deaths</p>
                    <p> <span className="redInc">{data[0].deaths.new}</span> {data[0].deaths.total}</p>
                </div>
            </div>
            <div className="table md-whiteframe-2dp">
                <table>
                    <tr>
                        <th >Country</th>
                        <th >Total Cases</th>
                        <th >Recovered</th>
                        <th >Deaths</th>
                    </tr>
                    {
                        data.map(dat => {
                            return (
                                <tr>
                                    <td style={{ textAlign: "justify", paddingLeft: "15px" }}>{dat.country}</td>
                                    <td>{dat.cases.total}</td>
                                    <td>{dat.cases.recovered}</td>
                                    <td>{dat.deaths.total}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </React.Fragment>
    )
}

export default DataDisplay;