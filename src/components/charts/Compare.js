import React, { Component } from 'react'
import CompareCompany from './CompareCompany';
import CompanyPrice from './CompanyPrice';

class Compare extends Component{
    constructor(){
        super();
        this.state={
            chart:false,
            data: {
                company1:{id:'1',
                companyName:''
            }
            },
            jwt:"",
            role:""
        }
        

    }
    handleCompareCompany=(data)=>{
        this.setState({
            chart:true
        })
        console.log(data)
        this.setState({
            data:data
        })
        


    }   
    componentDidMount=()=>{
        console.log(this.props.data)
        this.setState({
            jwt:this.props.data.jwt,
            role:this.props.data.role
        })
    }
    handleLogout=()=>{
        this.props.handleLogout()
        this.props.history.push("/")
    }
    render(){
        return <div>
            
            {!this.state.chart &&
            <CompareCompany handleCompare={this.handleCompareCompany} auth={this.props.data} handleLogout={this.handleLogout}/>}
            
            {this.state.chart &&
            <CompanyPrice data={this.state.data} auth={this.state} handleLogout={this.handleLogout} />}
        </div>
    }
}
export default Compare 