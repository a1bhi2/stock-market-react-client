import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logoimg from "./loginimg.jpg";




class Login extends Component {



    constructor() {
        super();
        this.state = {
            token: ' ',
            status: false,
            correct: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleClick = () => {
        this.setState({
            token: "",
            status: false,
            correct: true
        })
    }
    async handleSubmit(event) {

        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const user = {
            username: username,
            password: password
        }
        console.log("insubmit")


        if (username && password) {
            axios.post('https://secret-tundra-65063.herokuapp.com/api/auth/signin', user)
                .then(response => {

                    if (response.status === 200) {
                        // console.log(response.data)
                        const token = response.data.token;
                        console.log(token);

                        this.setState({
                            token: token
                        });
                        this.props.handleLogin(token)




                    }

                    console.log(response.status)
                    setTimeout(() => { this.props.history.push("/homepage") }, 1000);
                    // this.props.history.push('/homepage')
                }).catch(err => {
                    this.setState({ correct: false })
                })
            this.setState({ status: true })
        }

    }


    render() {

        return <div className="d-flex p-2 align-items-center mh-100">


            {!this.state.status &&
                <div className="card mx-auto w-25">
                    <div className="card-body">
                        <img className="card-img-top w-25 h-25" src={logoimg} />
                        <h5 className="card-title text-primary">Login</h5>
                        <form className="p-3 mx-auto" onSubmit={this.handleSubmit}>
                        <div className="form-group pt-2">
                            <input type="username" name="username" className="form-control" id="username" aria-describedby="emailHelp"
                                placeholder="Username" required />
                        </div>
                        <div className="form-group pt-2 pb-2">
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                required />
                        </div>

                        <button type="submit" className="btn btn-primary bg-primary" >Login </button>
                        &emsp; &emsp;
                        <Link to="/register">  New User? Register</Link>
                        </form>
                    </div>
                </div>}

            {this.state.status && this.state.correct &&
                <div>
                    <div class="spinner-border" role="status">

                        <span class="sr-only"></span>
                    </div>
                    <h3 className="mx-auto text-primary">Logging in , Please wait</h3>
                </div>
            }
            {!this.state.correct &&
                <div>
                    <h4 className="text-danger">Wrong Username or password</h4>
                    <button className="btn mx-auto mt-4 btn-primary" onClick={this.handleClick}>Try again</button>
                </div>}



        </div>
    }
}

export default Login;
