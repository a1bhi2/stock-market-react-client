import React, {Component} from "react";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";

class ManageExchange extends Component{
    constructor() {
        super();
        this.state = {
            exchangeList:[]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.get('https://secret-tundra-65063.herokuapp.com/stockexchange/getall',config)
            .then(response =>{
                if(response.status === 200){
                    // console.log(response.data)
                    let list = response.data
                    this.setState({ exchangeList:list})
                }
            })
    }
    handleClick(){
        this.props.history.push('/createexchange');
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }
    render() {
        return <div>
            {this.props.data.role === "user" && <NavBar handleLogout={this.handleLogout} />}
        {this.props.data.role === "admin" && <AdminNavBar handleLogout={this.handleLogout}/>}
            {/*<button onClick={this.handleClick()}>Click</button>*/}
            <h2 className="pt-3 pb-5">Manage Stock Exchange</h2>
            {this.props.data.role === "admin" &&
            <button className="btn btn-primary bg-primary mb-4" onClick={this.handleClick}>Add new Stock Exchange</button>}
            <table className="table table-hover w-75 mx-auto" >
                <thead>
                <tr className="table-primary" key="header">
                    <th scope="col">#</th>
                    <th scope="col">Stock Exchange</th>
                    <th scope="col">Details</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Contact Address</th>
                </tr>
                </thead>
                <tbody key="body">
                {this.state.exchangeList.map((exchange)=>(
                    <tr key={exchange.id}>
                        <th scope="row" key={exchange.id}>{this.state.exchangeList.indexOf(exchange)+1}</th>
                        <td key={exchange.stockExchange}>{exchange.stockExchange}</td>
                        <td>{exchange.brief}</td>
                        <td key={exchange.remarks}>{exchange.remarks}</td>
                        <td key={exchange.contactAddress}>{exchange.contactAddress}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    }
}

export default ManageExchange