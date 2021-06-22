import React, {Component} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";

class ManageIpo extends Component{
    constructor() {
        super();
        this.state = {
            ipoList:[]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount=()=> {
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.get('https://secret-tundra-65063.herokuapp.com/ipo/all',config)
            .then(response =>{
                if(response.status === 200){
                    // console.log(response.data)
                    let list = response.data
                    this.setState({ ipoList:list})
                    console.log(list)
                }
            })
    }
    handleClick(){
        this.props.history.push('/addipo');
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
            <h2 className="pt-3 pb-5">Upcoming IPO</h2>
            {this.props.data.role ==="admin" && <button className="btn btn-primary bg-primary mb-4" onClick={this.handleClick}>Add new IPO</button>}
            <table className="table table-hover w-75 mx-auto" >
                <thead>
                <tr className="table-primary" key="header">
                    <th scope="col">#</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Open Date-Time</th>
                    <th scope="col">Price/Share</th>
                    <th scope="col">Stock Exchange</th>
                    <th scope="col">Remarks</th>
                </tr>
                </thead>
                <tbody key="body">
                {this.state.ipoList.map((ipo)=>(
                    <tr key={ipo.id}>
                        <th scope="row" key={ipo.id}>{this.state.ipoList.indexOf(ipo)+1}</th>
                        <td key={ipo.companyName}>{ipo.companyName}</td>
                        <td key={ipo.openDateTime}>{ipo.openDateTime}</td>
                        <td key={ipo.pricePerShare}>{ipo.pricePerShare}</td>
                        <td key={ipo.stockExchange.stockExchange}>{ipo.stockExchange.stockExchange}</td>
                        
                        <td key={ipo.remarks}>{ipo.remarks}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    }
}

export default ManageIpo;