import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



class Login extends Component {



    constructor() {
        super();
        this.state = {
            token: ' ',
            status: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleClick = () => {
        this.props.history.push('/homepage')
    }
    async handleSubmit(event) {

        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const user = {
            username: username,
            password: password
        }



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
                });
            this.setState({ status: true })
        }

    }


    render() {

        return <div>

          

            {!this.state.status &&
                <form className="w-25 p-3 mx-auto" onSubmit={this.handleSubmit}>
                    <h3 className="text-primary">Sign In</h3>
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
                </form>}
            {this.state.status &&
                <div>
                    <div class="spinner-border" role="status">

                        <span class="sr-only"></span>
                    </div>
                    <h3 className="mx-auto text-primary">Logging in , Please wait</h3>
                </div>
            }




        </div>
    }
}

export default Login;
