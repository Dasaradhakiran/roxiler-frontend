import { Component } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid
  } from "recharts"

import LoaderView from "../LoaderView";

import "./index.css"

class TransactionsBarChart extends Component {
    state = {barChartMonth: "3", barChartData: [],barChartLoading: false}

    componentDidMount() {
        this.getBarChart()
    }

    changeBarChartMonth = async (event) => {
        await this.setState({barChartMonth: event.target.value})
        await this.getBarChart()
    }

    getBarChart = async () => {
        await this.setState({barChartLoading: true})
        const {barChartMonth} = this.state 
        const response = await fetch(`https://kiran-roxiler-backend.onrender.com/?month=${barChartMonth}`,)
        const data = await response.json()
        const updateBarChartData = [
            {
                group_name: "0-100",
                count: data.bar_chart.below_100,
            },
            {
                group_name: "101-200",
                count: data.bar_chart.between_101_to_200,
            },
            {
                group_name: "201-300",
                count: data.bar_chart.between_201_to_300,
            },
            {
                group_name: "301-400",
                count: data.bar_chart.between_301_to_400,
            },
            {
                group_name: "401-500",
                count: data.bar_chart.between_401_to_500,
            },
            {
                group_name: "501-600",
                count: data.bar_chart.between_501_to_600,
            },
            {
                group_name: "601-700",
                count: data.bar_chart.between_601_to_700,
            },
            {
                group_name: "701-800",
                count: data.bar_chart.between_701_to_800,
            },
            {
                group_name: "801-900",
                count: data.bar_chart.between_801_to_900,
            },
            {
                group_name: "901 above",
                count: data.bar_chart.above_900,
            },
        ]
        await this.setState({barChartData: updateBarChartData,barChartLoading: false})
    }

    render() {
        const {barChartMonth,barChartData,barChartLoading} = this.state

        const DataFormatter = (number) => {
            return number.toString()
          }

          let displayBarChartMonth = "";

          if (barChartMonth === "1"){
            displayBarChartMonth = "January"
          }
          else if (barChartMonth === "2"){
            displayBarChartMonth = "February"
          }
          else if (barChartMonth === "3"){
            displayBarChartMonth = "March"
          }
          else if (barChartMonth === "4"){
            displayBarChartMonth = "April"
          }
          else if (barChartMonth === "5"){
            displayBarChartMonth = "May"
          }
          else if (barChartMonth === "6"){
            displayBarChartMonth = "June"
          }
          else if (barChartMonth === "7"){
            displayBarChartMonth = "July"
          }
          else if (barChartMonth === "8"){
            displayBarChartMonth = "August"
          }
          else if (barChartMonth === "9"){
            displayBarChartMonth = "September"
          }
          else if (barChartMonth === "10"){
            displayBarChartMonth = "October"
          }
          else if (barChartMonth === "11"){
            displayBarChartMonth = "November"
          }
          else if (barChartMonth === "12"){
            displayBarChartMonth = "December"
          }

        return (
            <div className="bar-chart-cont">
                <div className="bar-chart-top-cont">
                    <h1 className="bar-chart-main-text">Bar Chart Stats - {displayBarChartMonth}</h1>
                    <select className="bar-chart-select-elem" value={barChartMonth} onChange={this.changeBarChartMonth} >
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
                {barChartLoading ? (
                  <LoaderView />
                ):(
                  <div>
                      <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                              data={barChartData}
                              margin={{
                              top: 3,
                              }}
                          >
                          <CartesianGrid strokeDasharray="0 0" vertical={false} />
                              <XAxis
                              dataKey="group_name"
                              tick={{
                                  stroke: "gray",
                                  strokeWidth: 0,
                              }}
                              />
                              <YAxis
                              dataKey="count"
                              tickFormatter={DataFormatter}
                              tick={{
                                  stroke: "gray",
                                  strokeWidth: 0,
                              }}
                              />
                              <Bar layout="horizontal" dataKey="count" fill="#42dcff" barSize="10%" />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
                )}
            </div>
        )
    }
}

export default TransactionsBarChart