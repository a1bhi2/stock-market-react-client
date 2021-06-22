import React, { Component } from 'react'
import AdminNavBar from './AdminNavBar';
import NavBar from './NavBar';
import { Redirect } from 'react-router';

class Homepage extends Component{
    constructor(props){
        super(props)
        console.log(this.props)
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }
    render(){
        return <div>
            {!(this.props.data.role ==="user" || this.props.data.role==="admin") && <Redirect to="/"/>} 
            {this.props.data.role === "user" && <NavBar handleLogout={this.handleLogout} />}
        {this.props.data.role === "admin" && <AdminNavBar handleLogout={this.handleLogout}/>}
        </div>
    }
}

export default Homepage;