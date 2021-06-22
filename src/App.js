import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import Register from "./components/Register";
import Login from "./components/Login";
import CreateCompany from "./components/CreateCompany";
import ManageCompany from "./components/ManageCompany";
import ManageExchange from "./components/ManageExchange";
import CreateExchange from "./components/CreateExchange";
import { Component, React } from 'react';
import ExcelUpload from './components/ExcelUpload';
import CompanyPrice from './components/charts/CompanyPrice';
import Compare from './components/charts/Compare';
import ManageIpo from './components/ManageIpo';
import NavBar from './components/NavBar';
import AdminNavBar from './components/AdminNavBar';
import Homepage from './components/Homepage';
import CreateIpo from './components/CreateIpo'
import axios from 'axios';





class App extends Component {

  constructor() {
    super()
    this.state = {
      jwt: '',
      role: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  // setState({
  //   hello:"hello"
  // });
  temp = () => {

  }
  async handleLogin(token) {
    this.setState({
      jwt: token
    })
    const config = {
      headers: { Authorization: `Bearer ${this.state.jwt}` }
    }


    axios.get("https://secret-tundra-65063.herokuapp.com/api/test/admin", config)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ role: "admin" })
          console.log(this.state.role)

        }
      })
    axios.get("https://secret-tundra-65063.herokuapp.com/api/test/user", config)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ role: "user" })
        }
      })


    console.log("recieved token is " + this.state.jwt)

  }
  handleLogout = () => {
    this.setState({
      jwt: "",
      role: ""
    })

  }
  componentDidMount = () => {

    const config = {
      headers: { Authorization: `Bearer ${this.state.jwt}` }
    }
    if (!this.state.jwt === "") {
      axios.get("https://secret-tundra-65063.herokuapp.com1/api/test/admin", config)
        .then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            this.setState({ role: "admin" })
          }
        })
      
        axios.get("https://secret-tundra-65063.herokuapp.com/api/test/user", config)
          .then((response) => {
            if (response.status === 200) {
              this.setState({ role: "user" })
            }

          })
      


    }
  }
  render() {

    return (
      <Router>



        <div className="App bg-light w-100 h-100">
          <Switch>
            <Route path="/homepage" render={(props) => (
              <Homepage {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
            <Route path="/createExchange" render={(props) => (
              <CreateExchange {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />

            <Route path="/manageExchange" render={(props) => (
              <ManageExchange {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
            <Route path="/createCompany" render={(props) => (
              <CreateCompany {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
            <Route path="/manageCompany" render={(props) => (
              <ManageCompany {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />

            <Route path="/" render={(props) => (
              <Login {...props} handleLogin={this.handleLogin} />
            )} exact />

            <Route path="/register" component={Register} exact />
            <Route path="/excelupload" render={(props) => (
              <ExcelUpload {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />

            {/* <Route path="/compareCompany" component={CompareCompany} exact/> */}
            <Route path="/compare" render={(props) => (
              <Compare {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
            <Route path="/ipo" render={(props) => (
              <ManageIpo {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
            <Route path="/addipo" render={(props) => (
              <CreateIpo {...props} data={this.state} handleLogout={this.handleLogout} />
            )} exact />
          </Switch>
        </div>

      </Router>
    );
  }

}

export default App;
