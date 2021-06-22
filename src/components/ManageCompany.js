import React, {Component} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";

class ManageCompany extends Component{
    constructor(props) {
        super(props);
        this.state = {
            companyList:[],
            status:true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount=() =>{
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.get('https://secret-tundra-65063.herokuapp.com/company/getall',config)
            .then(response =>{
                if(response.status === 200){
                    // console.log(response.data)
                    let list = response.data
                    this.setState({ companyList:list,
                    status:true})
                    console.log(list)
                }
            })
    }
    handleClick(){
        this.props.history.push('/createcompany');
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }
    handleDelete=(e)=>{
        console.log(e)
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.post("https://secret-tundra-65063.herokuapp.com/company/delete",e,config)
        .then(response=>{
            axios.get('https://secret-tundra-65063.herokuapp.com/company/getall',config)
            .then(response =>{
                if(response.status === 200){
                    // console.log(response.data)
                    let list = response.data
                    this.setState({ companyList:list,
                    status:true})
                    console.log(list)
                }
            })
        }).catch(err=>{
            axios.get('https://secret-tundra-65063.herokuapp.com/company/getall',config)
            .then(response =>{
                if(response.status === 200){
                    // console.log(response.data)
                    let list = response.data
                    this.setState({ companyList:list,
                    status:true})
                    console.log(list)
                }
            })
        })
    }

    render() {
        return <div>
            {this.props.data.role === "user" && <NavBar handleLogout={this.handleLogout} />}
        {this.props.data.role === "admin" && <AdminNavBar handleLogout={this.handleLogout}/>}
            {/*<button onClick={this.handleClick()}>Click</button>*/}
            <h2 className="pt-3 pb-5">Manage Company</h2>
            {this.props.data.role === "admin" && <button className="btn btn-primary bg-primary mb-4" onClick={this.handleClick}>Add new Company</button>}
            <table className="table table-hover w-75 mx-auto" >
                <thead>
                <tr className="table-primary" key="header">
                    <th scope="col">#</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Stock Exchanges</th>
                    <th scope="col">Sector</th>
                    <th scope="col">Details</th>
                    {this.props.data.role === "admin" && <th scope="col">Action</th>}
                </tr>
                </thead>
                <tbody key="body">
                {this.state.companyList.map((company)=>(
                    <tr key={company.id}>
                        <th scope="row" key={company.id}>{this.state.companyList.indexOf(company)+1}</th>
                        <td key={company.companyName}>{company.companyName}</td>
                        <td>{company.listedInStockExchange.map((stockExchange)=>(<span key={stockExchange.id}>{stockExchange.stockExchange} </span>))}</td>
                        {company.sector!=null &&
                        <td key={company.sector.sectorName}>{company.sector.sectorName}</td>}
                        <td key={company.briefWriteup}>{company.briefWriteup}</td>
                        {this.props.data.role === "admin" &&
                        <td><button className="btn btn-danger" value={company} onClick={()=>this.handleDelete(company)}>Delete</button></td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    }
}

export default ManageCompany;