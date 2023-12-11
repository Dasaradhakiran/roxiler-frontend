import { Component } from "react"
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts"

import LoaderView from "../LoaderView"

import "./index.css"

class TransactionsPieChart extends Component {
    state = {pieChartMonth: "3", pieChartData: [],pieChartLoading: false}

    componentDidMount() {
        this.getPieChartData()
    }

    changePieChartMonth = async (event) => {
        await this.setState({pieChartMonth: event.target.value})
        await this.getPieChartData()
    }

    getPieChartData = async () => {
      await this.setState({pieChartLoading: true})
      const {pieChartMonth} = this.state
      const response = await fetch(`https://kiran-roxiler-backend.onrender.com/?month=${pieChartMonth}`,)
      const data = await response.json()

      const colorList = ["#752117","#060d40","#c8d645","#7e21c4","#8c411b","#456b0c","#b8233c","#c22ae8","#bf1177","#a7e825"]
      const dataKeys = Object.keys(data.pie_chart)
      let num = 0
      const updatePieList = dataKeys.map(eachData => {
        const newData = {
            name: eachData,
            count: data.pie_chart[eachData],
            color: colorList[num]
        }
        num += 1
        return newData
      })
      await this.setState({pieChartData: updatePieList, pieChartLoading: false})
    }

    render() {
        const{pieChartMonth,pieChartData,pieChartLoading} = this.state

        let displayPieChartMonth = "";

          if (pieChartMonth === "1"){
            displayPieChartMonth = "January"
          }
          else if (pieChartMonth === "2"){
            displayPieChartMonth = "February"
          }
          else if (pieChartMonth === "3"){
            displayPieChartMonth = "March"
          }
          else if (pieChartMonth === "4"){
            displayPieChartMonth = "April"
          }
          else if (pieChartMonth === "5"){
            displayPieChartMonth = "May"
          }
          else if (pieChartMonth === "6"){
            displayPieChartMonth = "June"
          }
          else if (pieChartMonth === "7"){
            displayPieChartMonth = "July"
          }
          else if (pieChartMonth === "8"){
            displayPieChartMonth = "August"
          }
          else if (pieChartMonth === "9"){
            displayPieChartMonth = "September"
          }
          else if (pieChartMonth === "10"){
            displayPieChartMonth = "October"
          }
          else if (pieChartMonth === "11"){
            displayPieChartMonth = "November"
          }
          else if (pieChartMonth === "12"){
            displayPieChartMonth = "December"
          }

        return (
            <div className="pie-chart-cont">
                <div className="pie-chart-top-cont">
                    <h1 className="pie-chart-main-text">Pie Chart Stats - {displayPieChartMonth}</h1>
                    <select className="pie-chart-select-elem" value={pieChartMonth} onChange={this.changePieChartMonth} >
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
                {pieChartLoading ? (
                  <LoaderView />
                ) : (
                  <div>
                      <ResponsiveContainer width="100%" height={330}>
                          <PieChart>
                              <Pie
                              cx="50%"
                              cy="50%"
                              data={pieChartData}
                              startAngle={0}
                              endAngle={360}
                              innerRadius="40%"
                              outerRadius="70%"
                              dataKey="count"
                              >
                              {pieChartData.map(eachData => (
                                  <Cell name={eachData.name} fill={eachData.color} key={eachData.name} />
                              ))}
                              </Pie>
                              <Legend
                              iconType="circle"
                              layout="horizontal"
                              verticalAlign="bottom"
                              align="center"
                              />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>
                )}
            </div>
        )
    }
}

export default TransactionsPieChart