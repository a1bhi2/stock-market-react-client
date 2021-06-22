import axios from 'axios';
import React, { Component } from 'react';
import NavBar from '../NavBar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CompanyPrice from './CompanyPrice';

class CompareCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company1: { listedInStockExchange: [] },
            company2: { listedInStockExchange: [] },
            company3: { listedInStockExchange: [] },
            stockExchange1: {},
            stockExchange2: {},
            stockExchange3: {},
            numberOfCompany: 1,
            companyList: [],
            switch2: false,
            switch3: false,
            data:{},
            chart:false
        }
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
       
        event.preventDefault();
        const toDate=event.target.elements.compareToDate.value
        const fromDate = event.target.elements.compareFromDate.value
        if(this.state.switch3){
            this.setState({numberOfCompany:3})
        }
        else if(this.state.switch2){
            this.setState({numberOfCompany:2})
        }
        const data={
            company1:this.state.company1,
            company2:this.state.company2,
            company3:this.state.company3,
            stockExchange1:this.state.stockExchange1,
            stockExchange3:this.state.stockExchange3,
            stockExchange2:this.state.stockExchange2,
            toDate:toDate,
            fromDate:fromDate,   
            isDouble:this.state.switch2
        }
        this.setState({data:data,
        chart:true});
        console.log(data)
        this.props.handleCompare(data)
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }
    handleChange1(e) {
        this.setState({
            company1: e.target.value
        })
    }
    handleChange2 = (e) => {
        this.setState({ company2: e.target.value })
    }
    handleChange3 = (e) => {
        this.setState({ company3: e.target.value })
    }
    handleExchangeChange1 = (e) => {
        this.setState({ stockExchange1: e.target.value })
    }
    handleExchangeChange2 = (e) => {
        this.setState({ stockExchange2: e.target.value })
    }
    handleExchangeChange3 = (e) => {
        this.setState({ stockExchange3: e.target.value })
    }
    changeSwitch2 = () => {
        this.setState({
            switch2: !this.state.switch2
        })
    }
    changeSwitch3 = () => {
        this.setState({
            switch3: !this.state.switch3
        })
    }
    componentDidMount() {
        const token = this.props.auth.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.get("https://secret-tundra-65063.herokuapp.com/company/getall",config)
            .then(response => {
                this.setState({
                    companyList: response.data
                })
            })
    }
    handleLogout=()=>{
        this.props.handleLogout()
        
    }
    render() {
        return <div>
            <NavBar handleLogout={this.handleLogout}/>
            {!this.state.chart &&
            <div>
            <h2 className=" pt-4 pb-2 mx-auto ">Compare Company</h2>
            
                
                <form onSubmit={this.handleSubmit}>
                    <table className="mx-auto">

                        <tr>
                            <td><label for="fromDate" className="m-2">From</label></td>
                            <td><input name="compareFromDate" id="fromDate" type="date" className="m-2" /></td>
                        </tr>
                        <tr>
                            <td><label for="toDate" className="m-2">To</label></td>
                            <td><input name="compareToDate" id="toDate" type="date" className="m-2" /></td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>

                    </table>
                    <button type="submit" className="bottom btn btn-primary bg-primary" >Submit</button>
                </form>

            <div className="card-group pt-5  ">
                <span className="border color-blue rounded-3 border-3 m-2">
                    <div className="card m-1" style={{ width: '19rem' }}>
                        <div className="card-body color-grey">
                            <h5>Select Company</h5>
                            <form>
                                <FormControl className="pb-2 w-50">
                                    <InputLabel id="company1">Name</InputLabel>
                                    <Select value={this.state.company1} labelId="company1" onChange={this.handleChange1}>
                                        {this.state.companyList.map((company) => (
                                            <MenuItem value={company}>{company.companyName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br />
                                <FormControl className="pb-2 w-50">
                                    <InputLabel id="exchange1">Stock Exchange</InputLabel>
                                    <Select value={this.state.stockExchange1} labelId="exchange1" onChange={this.handleExchangeChange1}>
                                        {this.state.company1.listedInStockExchange.map((exchange) => (
                                            <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                
                            </form>
                        </div>
                    </div>
                </span>

                <span className="border color-blue rounded-3 border-3 m-2">
                    <div className="card m-1 " style={{ width: '19rem' }}>
                        {!this.state.switch2 &&
                            <button className="" style={{ height: "11rem" }} onClick={this.changeSwitch2}><h1>+</h1></button>}
                        {this.state.switch2 &&
                            <div className="card-body color-grey">
                                <button className="corner" onClick={this.changeSwitch2}>X</button>
                                <h5>Select Company</h5>
                                <form>
                                    <FormControl className="pb-2 w-50">
                                        <InputLabel id="company2">Name</InputLabel>
                                        <Select value={this.state.company2} labelId="company2" onChange={this.handleChange2}>
                                            {this.state.companyList.map((company) => (
                                                <MenuItem value={company}>{company.companyName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <FormControl className="pb-2 w-50">
                                        <InputLabel id="company2">Stock Exchange</InputLabel>
                                        <Select value={this.state.stockExchange2} labelId="company2" onChange={this.handleExchangeChange2}>
                                            {this.state.company2.listedInStockExchange.map((exchange) => (
                                                <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </form>
                            </div>}
                    </div>
                </span>
                
            </div>
            </div>}
            {this.state.chart && <CompanyPrice/>}
        </div>
    }
}

export default CompareCompany;