import React, {Component} from "react";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import { Redirect } from "react-router";

class CreateCompany extends Component{
    constructor(){
        super()
        this.state={
            
            exchanges:[],
            exchangeCode1:"",
            exchangeCode2:"",
            exchangeCode3:"",
            exchangeCode4:"",
            selectedExchange1:{},
            selectedExchange2:{},
            selectedExchange3:{},
            selectedExchange4:{},
            exchangeCode:[],
            numberExchange:0,
            sectors:[],
            selectedSector:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)
        this.handleChange4 = this.handleChange4.bind(this)
        this.addExchange = this.addExchange.bind(this)
        this.handleSector=this.handleSector.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        
        const companyName = event.target.elements.companyName.value;
        const ceo = event.target.elements.ceoName.value;
        const boardOfDirectors = event.target.elements.boardOfDirectors.value;
        const turnover = event.target.elements.turnover.value;
        const description = event.target.elements.description.value;
        const ipoDate = event.target.elements.ipoDate.value;
        const sector = this.state.selectedSector;
        
        let exchangeCode=[]
        let selectedExchange=[]
        if(this.state.numberExchange>=1){
            exchangeCode.push(event.target.elements.exchangeCode1.value)
            selectedExchange.push(this.state.selectedExchange1)
        }
        if(this.state.numberExchange>=2){
            exchangeCode.push(event.target.elements.exchangeCode2.value)
            selectedExchange.push(this.state.selectedExchange2)
        }
        if(this.state.numberExchange>=3){
            exchangeCode.push(event.target.elements.exchangeCode3.value)
            selectedExchange.push(this.state.selectedExchange3)
        }
        if(this.state.numberExchange>=4){
            exchangeCode.push(event.target.elements.exchangeCode4.value)
            selectedExchange.push(this.state.selectedExchange4)
        }
        const company ={
            company:{
                companyName:companyName,
                ceo:ceo,
                boardOfDirectors:boardOfDirectors,
                turnover:turnover,
                briefWriteup:description,
                ipoDate:ipoDate,
                listedInStockExchange:selectedExchange,
                sector:sector
            },
            companyStockExchangeCodes:exchangeCode
        }
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.post("https://secret-tundra-65063.herokuapp.com/company/create",company,config)
        .then(response=> {
            if(response.status === 200){
                console.log(response.data)
                this.props.history.push('/managecompany');
            }
            else{
                console.log(response.status)
            }
        })

    }
    handleClick(){
        return <div>
            <input type="text" placeholder="fillme"/>
        </div>
    }
   
    handleChange1(e){
        e.preventDefault()
        this.setState(
            {
                selectedExchange1:e.target.value
            }
        )
        
    }
    handleChange2(e){
        e.preventDefault()
        this.setState(
            {
                selectedExchange2:e.target.value
            }
        )
        
    }
    handleChange3(e){
        e.preventDefault()
        this.setState(
            {
                selectedExchange3:e.target.value
            }
        )
        
    }
    handleChange4(e){
        e.preventDefault()
        this.setState(
            {
                selectedExchange4:e.target.value
            }
        )
        
    }
    addExchange(e){
        this.setState({
            numberExchange:e.target.value
        })
    }
    handleSector(e){
        e.preventDefault()
        this.setState(
            {
                selectedSector:e.target.value
            }
        )
    }
    componentDidMount(){
        const token = this.props.data.jwt;
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.get("https://secret-tundra-65063.herokuapp.com/stockexchange/getall",config)
        .then(response=>{
            this.setState(state=>({
                exchanges:response.data
            }))
            console.log(this.state.exchanges)
        })
        axios.get("https://secret-tundra-65063.herokuapp.com/sector/getall",config)
        .then(response =>{
            this.setState(state=>({
                sectors :response.data
            }))
            console.log(this.state.sectors)
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
            <h3 className="text-primary pt-5">Create New Company</h3>
            
                    <form className="w-50 p-3 mx-auto" onSubmit={this.handleSubmit}>
                    
                    <div>
                            <div className="form-group form-floating pt-2">
                                <input type="text" name="companyName" className="form-control" id="companyName"
                                       aria-describedby="emailHelp"
                                       placeholder="Company Name" required/>
                                <label for="companyName">Company Name</label>
                            </div>
                            <div className="form-group form-floating pt-2">
                                <input type="text" name="ceoName" className="form-control" id="ceoName"
                                       placeholder="CEO Name"
                                       required/>
                                <label for="ceoName">CEO Name</label>
                            </div>
                            <div className="form-group form-floating pt-2">
                                <input type="text" name="boardOfDirectors" className="form-control" id="boardOfDirectors"
                                       placeholder="Board Members"
                                       required/>
                                <label htmlFor="boardOfDirectors">Board Members</label>
                            </div>
                            <div className="form-group form-floating pt-2">
                                <input type="number" name="turnover" className="form-control" id="turnover"
                                       placeholder="Turnover in Crores"
                                       required/>
                                <label for="turnover">Turnover in Crores</label>
                            </div>
                            <div className="form-group form-floating pt-2">
                                <input type="text" name="description" className="form-control" id="description"
                                       placeholder="Brief Description"
                                       required/>
                                <label for="description">Brief Description</label>
                            </div>
                            <div className="form-group form-floating pt-2 pb-4">
                                <input type="text" onFocus={
                                    (e)=> {
                                        e.currentTarget.type = "date";
                                        e.currentTarget.focus();
                                    }
                                } name="ipoDate" className="form-control" id="ipoDate"
                                       placeholder="IPO Date"
                                       required/>
                                <label for="ipoDate">IPO Date</label>
                            </div>
                             
                            
                            </div>

                        
                        
                            <div>
                                <table className="table table-hover w-75 mx-auto">
                                    <tr>
                                        <td>
                                            Sector
                                        </td>
                                        <td>
                                        <FormControl >
                                
                                <Select value={this.state.selectedSector}  onChange={this.handleSector}>
                                {this.state.sectors.map((sector)=>(
                                    <MenuItem value={sector}>{sector.sectorName}</MenuItem>
                                ))}
                                    
                                
                                </Select>
                                </FormControl>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Number of Stock Exchanges Company listed</td>
                                        <td>
                                        <FormControl >
                                
                                <Select value={this.state.numberExchange}  onChange={this.addExchange}>
                                
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                
                                </Select>
                                </FormControl>
                                        </td>
                                    </tr>
                                    {this.state.numberExchange>=1 && 
                                    <tr>
                                        <td>
                                <FormControl >
                                <InputLabel id="exchange1">Stock Exchange Name</InputLabel>
                                <Select value={this.state.selectedExchange1} labelId="exchange1" onChange={this.handleChange1}>
                                {this.state.exchanges.map((exchange)=>(
                                    <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                </td>
                                <td>
                                <span className="form-group  ">
                                <input type="text" name="exchangeCode1" className="form-control" id="desc"
                                       placeholder="Company Code in Stock Exchange "
                                       required/>
                                
                                </span>
                                </td>
                                </tr>}
                                {this.state.numberExchange>=2 && 
                                    <tr>
                                        <td>
                                <FormControl >
                                <InputLabel id="exchange2">Stock Exchange Name</InputLabel>
                                <Select value={this.state.selectedExchange2} labelId="exchange2" onChange={this.handleChange2}>
                                {this.state.exchanges.map((exchange)=>(
                                    <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                </td>
                                <td>
                                <span className="form-group  ">
                                <input type="text" name="exchangeCode2"className="form-control" id="desc"
                                       placeholder="Company Code in Stock Exchange "
                                       required/>
                                
                                </span>
                                </td>
                                </tr>}
                                {this.state.numberExchange>=3 && 
                                    <tr>
                                        <td>
                                <FormControl >
                                <InputLabel id="exchange3">Stock Exchange Name</InputLabel>
                                <Select value={this.state.selectedExchange3} labelId="exchange3" onChange={this.handleChange3}>
                                {this.state.exchanges.map((exchange)=>(
                                    <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                </td>
                                <td>
                                <span className="form-group  ">
                                <input type="text" name="exchangeCode3" className="form-control" id="desc"
                                       placeholder="Company Code in Stock Exchange "
                                       required/>
                                
                                </span>
                                </td>
                                </tr>}
                                {this.state.numberExchange>=4 && 
                                    <tr>
                                        <td>
                                <FormControl >
                                <InputLabel id="exchange4">Stock Exchange Name</InputLabel>
                                <Select value={this.state.selectedExchange4} labelId="exchange4" onChange={this.handleChange4}>
                                {this.state.exchanges.map((exchange)=>(
                                    <MenuItem value={exchange}>{exchange.stockExchange}</MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                </td>
                                <td>
                                <span className="form-group  ">
                                <input type="text" name="exchangeCode4" className="form-control" id="desc"
                                       placeholder="Company Code in Stock Exchange "
                                       required/>
                                
                                </span>
                                </td>
                                </tr>}
                                <tr>

                                </tr>
                                </table>

                                
                                <button type="submit" className="btn btn-primary bg-primary ">Submit</button>
                                

                                
                            </div>
                        
                        </form>

            
        </div>
    }
}

export default CreateCompany;