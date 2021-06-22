import axios from 'axios';
import React, { Component } from 'react'
import AdminNavBar from './AdminNavBar';
import { Redirect } from 'react-router';

class ExcelUpload extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: undefined,
            status:""
            
        }
    }

    handleInputChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        })

    }
    addAnother =()=>{
        this.props.history.push("/excelupload")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const token = this.props.data.jwt;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const data = new FormData()
        data.append("file", this.state.selectedFile)
        axios.post("https://secret-tundra-65063.herokuapp.com/stockprice/excel/upload", data, config)
            .then(response => {
                console.log(response.status)
                console.warn("uploaded")
                this.setState({status:response.status})

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
            <h2 className="pt-4">Excel Upload</h2>
            {this.state.status === '' &&
            <form className="w-50 p-3 mx-auto pt-4" onSubmit={this.handleSubmit}>

                <div className="form-group form-floating pt-2 pb-2">
                    <input type="file" name="excleFile" className="form-control" id="excelFile"
                        aria-describedby="excelFile"
                        placeholder="Upload Excel File" name="file" onChange={this.handleInputChange} required />
                    <label htmlFor="excelFile">Upload Excel File</label>
                </div>


                <button type="submit" className="btn btn-primary bg-primary " onSubmit={this.handleSubmit}>Upload</button>
            </form>}
            {this.state.status === 200 && 
            <div>
            <h4 className="mx-auto text-success pt-4">Upload Successful</h4>
            <form onSubmit={this.addAnother}>
            <button type="submit" className="btn btn-primary bg-primary pt-2" onClick={this.addAnother}>Add another</button>
            </form>
            </div>}
            </div>
           
    }
}
export default ExcelUpload;