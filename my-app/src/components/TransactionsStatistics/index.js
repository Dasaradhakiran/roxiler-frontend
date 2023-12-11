import { Component } from "react"

import LoaderView from "../LoaderView"

import "./index.css"

class TransactionsStatistics extends Component {
    state = {statisticsData: {}, statisticsMonth: "3",statisticsLoading: false}

    componentDidMount() {
        this.getStatistics()
    }

    changeStatisticsMonth = async (event) => {
        await this.setState({statisticsMonth: event.target.value})
        await this.getStatistics()
    }

    getStatistics = async () => {
        await this.setState({statisticsLoading: true})
        const{statisticsMonth} = this.state
        const response = await fetch(`https://kiran-roxiler-backend.onrender.com/?month=${statisticsMonth}`,)
        const data = await response.json()
        await this.setState({statisticsData: data.statistics,statisticsLoading: false})
    }

    render() {
        const{statisticsMonth,statisticsData,statisticsLoading} = this.state
        let displayStatisticsMonth = "";

            if (statisticsMonth === "1"){
               displayStatisticsMonth = "January"
            }
            else if (statisticsMonth === "2"){
               displayStatisticsMonth = "February"
            }
            else if (statisticsMonth === "3"){
              displayStatisticsMonth = "March"
            }
            else if (statisticsMonth === "4"){
                displayStatisticsMonth = "April"
            }
            else if (statisticsMonth === "5"){
                displayStatisticsMonth = "May"
            }
            else if (statisticsMonth === "6"){
                displayStatisticsMonth = "June"
            }
            else if (statisticsMonth === "7"){
                displayStatisticsMonth = "July"
            }
            else if (statisticsMonth === "8"){
                displayStatisticsMonth = "August"
            }
            else if (statisticsMonth === "9"){
                displayStatisticsMonth = "September"
            }
            else if (statisticsMonth === "10"){
                displayStatisticsMonth = "October"
            }
            else if (statisticsMonth === "11"){
                displayStatisticsMonth = "November"
            }
            else if (statisticsMonth === "12"){
                displayStatisticsMonth = "December"
            }

        return(
            <div className="statistics-cont">
                <div className="statistics-top-cont">
                <h1 className="statistics-head">Statistics - {displayStatisticsMonth} </h1>
                <select className="statistics-select-elem" value={statisticsMonth} onChange={this.changeStatisticsMonth} >
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3" >March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                { statisticsLoading ? (
                    <LoaderView />
                ):(
                    <div className="statistics-bottom-cont">
                        <div className="statistics-text-cont">
                            <p className="statistics-text">Total sale</p>
                            <p className="statistics-sub-text">{statisticsData.total_sale}</p>
                        </div>
                        <div className="statistics-text-cont">
                            <p className="statistics-text">Total sold item</p>
                            <p className="statistics-sub-text">{statisticsData.total_sold_item}</p>
                        </div>
                        <div className="statistics-text-cont">
                            <p className="statistics-text">Total not sold item</p>
                            <p className="statistics-sub-text">{statisticsData.total_not_sold_item}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}

export default TransactionsStatistics