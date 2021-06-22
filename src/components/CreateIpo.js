import React, { Component } from "react";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class CreateExchange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: {},
            companies: [],
            exchanges: [],
            stockExchange: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        event.preventDefault();
        const token = this.props.data.jwt;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        let company = this.state.company
        let stockExchange = this.state.stockExchange
        let price = event.target.elements.price.value;
        let datetime = event.target.elements.date.value;
        let share = event.target.elements.shares.value;
        let remarks = event.target.elements.remarks.value;
        let ipo = {
            companyName: company.companyName,
            stockExchange: stockExchange,
            pricePerShare: price,
            totalNumberOfShares: share,
            openDateTime: datetime,
            remarks: remarks
        }
        console.log(ipo)
        axios.post("https://secret-tundra-65063.herokuapp.com/ipo/create", ipo, config)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.status + response.statusText)
                    console.log(response.data)
                    this.props.history.push('/ipo');

                }
                else {
                    console.log(response.status + response.statusText)
                }
            })
    }
    handleCompany = (e) => {
        e.preventDefault()
        this.setState({
            company: e.target.value
        })
    }
    handleExchange = (e) => {
        e.preventDefault()
        this.setState({
            stockExchange: e.target.value
        })
    }
    handleLogout = () => {
        this.props.handleLogout()
        this.props.history.push("/")
    }
    componentDidMount = () => {
        const token = this.props.data.jwt;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios.get("https://secret-tundra-65063.herokuapp.com/stockexchange/getall",config)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        exchanges: response.data
                    })
                }
            })
        axios.get("https://secret-tundra-65063.herokuapp.com/company/getall",config)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        companies: response.data
                    })
                }
            })
    }


    render() {

        return <div>

            {this.props.data.role != "admin" && <Redirect to="/homepage" />}
            {this.props.data.role === "admin" && <AdminNavBar handleLogout={this.handleLogout} />}
            {this.props.data.role === "admin" && <h3 className="text-primary pt-5">Create IPO Listing</h3>}
            <form className="w-50 p-3 mx-auto" onSubmit={this.handleSubmit}>

                
                <FormControl className="pb-2 w-50">
                <InputLabel id="company">Company</InputLabel>
                    <Select value={this.state.company} labelId="company" onChange={this.handleCompany}>
                        {this.state.companies.map((company) => (
                            <MenuItem value={company}>{company.companyName}</MenuItem>
                        ))}
                    </Select>
                </FormControl >
                <br/>
                <FormControl className="pb-2 w-50">
                <InputLabel id="exchange">Stock Exchange</InputLabel>
                    <Select value={this.state.stockExchange} labelId="exchange" onChange={this.handleExchange}>
                        {this.state.exchanges.map((exchange) => (
                            <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="form-group form-floating pt-2 pb-2">
                    <input type="number" step="any" name="price" className="form-control" id="remarks"
                        placeholder="Price per share"
                        required />
                    <label htmlFor="price">Price Per Share</label>
                </div>
                <div className="form-group form-floating pt-2 pb-2">
                    <input type="number" name="shares" className="form-control" id="shares"
                        placeholder="Total number of share"
                        required />
                    <label htmlFor="share">Total number of share</label>
                </div>

                <div className="form-group form-floating pt-2">
                    <input type="datetime-local" name="date" className="form-control" id="date"
                        placeholder="Date"
                        required />
                    <label htmlFor="date">Date Time</label>
                </div>

                <div className="form-group form-floating pt-2 pb-2">
                    <input type="text" name="remarks" className="form-control" id="remarks"
                        placeholder="Remarks"
                        required />
                    <label htmlFor="remarks">Remarks</label>
                </div>
                <button type="submit" className="btn btn-primary bg-primary ">Create</button>
            </form>

        </div>
    }
}
export default CreateExchange