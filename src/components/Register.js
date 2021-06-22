import axios from "axios";
import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";


class Register extends Component{

    handleSubmit(event){
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const email = event.target.elements.email.value;
        const mobileNumber = event.target.elements.mobileNumber.value;
        const newUser={
            username:username,
            password:password,
            email:email,
            mobileNumber:mobileNumber
        }
        axios.post("https://secret-tundra-65063.herokuapp.com/api/auth/signin",newUser)
        .then(response=>{
            if(response.status === 200){
                console.log(response.data)
                return <Redirect 
                to={{
                    pathname:"/login"
                }} 
                />
            }
        })

    }


    render() {
        return <div>
            <NavBar/>
            <form class="w-25 p-3 mx-auto ">
                <h3>New User? Sign Up</h3>
                <div className="form-group pt-2">
                    <input type="username" className="form-control" name="username" placeholder="Username" required/>
                </div>
                <div className="form-group pt-2">
                    <input type="password" className="form-control" name="password" placeholder="Password" required/>
                </div>
                <div className="form-group pt-2">
                    <input type="email" className="form-control" name="email" placeholder="Email" required/>
                </div>
                <div className="form-group pt-2 pb-2    ">
                    <input type="tel"  pattern="^\d{10}$" required className="form-control" name="mobileNumber" placeholder="Mobile Number" title="Please enter 10 digit number only"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    }
}

export default Register;