import React, {Component} from "react";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { Redirect } from "react-router-dom";

class CreateExchange extends Component{
    constructor(){
        super()
        this.handleSubmit  = this.handleSubmit.bind(this)
    }


    handleSubmit(event){
        event.preventDefault();
        let stockExchange = event.target.elements.exchangeName.value;
        let brief = event.target.elements.description.value;
        let contactAddress = event.target.elements.contactAddress.value;
        let remarks = event.target.elements.remarks.value;
        let exchange ={
            stockExchange:stockExchange,
            brief:brief,
            contactAddress:contactAddress,
            remarks:remarks
        }
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        
        axios.post("https://secret-tundra-65063.herokuapp.com/stockexchange/create",exchange,config)
            .then(response=>{
                if(response.status === 200){
                    console.log(response.status + response.statusText)
                    console.log(response.data)
                    this.props.history.push('/manageexchange');
                    
                }
                else {
                    console.log(response.status + response.statusText)
                }
            })
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }

    
    render() {

        return <div>
            
            {this.props.data.role != "admin" && <Redirect to="/homepage"/>}
        {this.props.data.role === "admin" && <AdminNavBar handleLogout={this.handleLogout}/>}
            {this.props.data.role === "admin"  &&<h3 className="text-primary pt-5">Create New Stock Exchange</h3>}
            <form className="w-50 p-3 mx-auto" onSubmit={this.handleSubmit}>

                <div className="form-group form-floating pt-2">
                    <input type="text" name="exchangeName" className="form-control" id="exchangeName"
                           aria-describedby="exchangeName"
                           placeholder="Stock Exchange Name" required/>
                    <label htmlFor="companyName">Stock Exchange Name</label>
                </div>

                <div className="form-group form-floating pt-2">
                    <input type="text" name="description" className="form-control" id="description"
                           placeholder="Brief Description"
                           required/>
                    <label htmlFor="description">Brief Description</label>
                </div>
                <div className="form-group form-floating pt-2">
                    <input type="text" name="contactAddress" className="form-control" id="contactAddress"
                           placeholder="Contact Address"
                           required/>
                    <label htmlFor="ceoName">Contact Address</label>
                </div>
                <div className="form-group form-floating pt-2 pb-2">
                    <input type="text" name="remarks" className="form-control" id="remarks"
                           placeholder="Remarks"
                           required/>
                    <label htmlFor="remarks">Remarks</label>
                </div>
                <button type="submit"  className="btn btn-primary bg-primary ">Create</button>
            </form>

        </div>
    }
}
export default CreateExchange