import {Component} from "react"

import LoaderView from "../LoaderView"

import "./index.css"

class TransactionsTable extends Component {
    state = {tableMonth:3,searchName: "", tableData: [], tableLoading: false}

    componentDidMount() {
        this.getTableDetails()
    }

    onChangeMonth = async (event) => {
        await this.setState({tableMonth: event.target.value})
        await this.getTableDetails()
    }

    onChangeSearch = async (event) => {
        await this.setState({searchName: event.target.value})
        await this.getTableDetails()
    }

    getTableDetails = async () => {
        await this.setState({tableLoading: true})
        const {searchName,tableMonth} = this.state
        const response = await fetch(`https://kiran-roxiler-backend.onrender.com/?search=${searchName}&month=${tableMonth}`,)
        const data= await response.json()
        await this.setState({tableData: data.all_transactions, tableLoading: false})
    }
    
    render() {
        const {tableMonth,searchName,tableData,tableLoading} = this.state

        return (
            <div className="table-main-cont">
                <h1 className="table-head">Transaction Dashboard</h1>
                    <div className="table-search-main-cont">
                        <input type="text" 
                                placeholder="Search transaction" 
                                value={searchName} 
                                onChange={this.onChangeSearch}
                                className="table-input-elem"
                                />
                        <select value={tableMonth} onChange={this.onChangeMonth} className="table-select-elem">
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3} >March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                        </select>
                    </div>
                    { tableLoading ? (
                                    <LoaderView />
                                  ) :
                        (<div className="table-temp-cont">
                            <div className="table-cont">
                                <div className="table-head-column">
                                    <p className="table-head-column-small-text">ID</p>
                                    <p className="table-head-column-large-text">Title</p>
                                    <p className="table-head-column-large-text">Description</p>
                                    <p className="table-head-column-small-text">Price</p>
                                    <p className="table-head-column-large-text">Category</p>
                                    <p className="table-head-column-small-text">Sold</p>
                                    <p className="table-head-column-large-text">Image</p>
                                </div>
                                {tableData.map(eachData => (
                                    <div className="table-column" key={eachData.id}>
                                        <p className="table-column-small-text">{eachData.id}</p>
                                        <p className="table-column-large-text">{eachData.title}</p>
                                        <p className="table-column-large-text">{eachData.description}</p>
                                        <p className="table-column-small-text">{eachData.price}</p>
                                        <p className="table-column-large-text">{eachData.category}</p>
                                        <p className="table-column-small-text">{eachData.sold}</p>
                                        <div className="table-column-large-text">
                                            <img src={eachData.image} alt={eachData.title} className="table-image" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default TransactionsTable