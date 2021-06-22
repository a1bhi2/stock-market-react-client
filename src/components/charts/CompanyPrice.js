import React, { Component } from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from 'axios';
import NavBar from '../NavBar'

ReactFC.fcRoot(FusionCharts, charts, FusionTheme);

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts


// Preparing the chart data
// let chartData = [

//   ];

//   // Create a JSON object to store the chart configurations
// const chartConfigs = {
//     type: "line", // The chart type
//     width: "700", // Width of the chart
//     height: "400", // Height of the chart
//     dataFormat: "json", // Data type
//     dataSource: {
//       // Chart Configuration
//       chart: {
//         caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
//         subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
//         xAxisName: "Date",           //Set the x-axis name
//         yAxisName: "Price",  //Set the y-axis name
//         numberPrefix:"Rs. ",
//         theme: "fusion"                 //Set the theme for your chart
//       },
//       // Chart Data - from step 2
//       data: chartData
//     }
//   };
function formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}


class CompanyPrice extends Component {
    constructor(props) {
        super(props)
        this.state = {

            dataSource: {
                // Chart Configuration
                chart: {
                    caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
                    subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
                    xAxisName: "Date",           //Set the x-axis name
                    yAxisName: "Price",  //Set the y-axis name
                    numberPrefix: "Rs. ",
                    theme: "fusion",
                    yAxisMinValue: "0",
                    yAxisMaxValue: ""       //Set the theme for your chart
                },

                // Chart Data - from step 2
                categories: [],
                dataset: []
            },
            requestBody1: {},
            requestBody2: {}
        }


    }

    componentDidMount = () => {
        console.log(this.props)
        const token = this.props.auth.jwt;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        console.log(this.props.data)
        const company1Id = this.props.data.company1.id;
        const stockexchange1 = this.props.data.stockExchange1.stockExchange;
        const company1Name = this.props.data.company1.companyName;
        const company2Id = this.props.data.company2.id;
        const stockexchange2 = this.props.data.stockExchange2.stockExchange;
        const company2Name = this.props.data.company2.companyName;
        const isDouble = this.props.data.isDouble
        let companyCode1 = ""
        let companyCode2 = ""
        let valueArray = []
        let categories = []
        let category = []
        let dataset = []
        let minimumValue = "100000000000000"
        let maxValue = "0"

        axios.get(`https://secret-tundra-65063.herokuapp.com/company/${company1Id}/${stockexchange1}`, config)
            .then(response => {
                console.log(response.data)
                companyCode1 = "" + response.data
            })
            .then(() => {
                console.log(this.props.data.fromDate)
                const requestBody = {
                    companyCode: "" + companyCode1,
                    from: this.props.data.fromDate,
                    to: this.props.data.toDate
                }
                this.setState({ requestBody1: requestBody })
                console.log(requestBody)
            }).then(() => {
                axios.post("https://secret-tundra-65063.herokuapp.com/company/getpricebycode/", this.state.requestBody1, config)
                    .then(response => {
                        const data = response.data;
                        console.log(data)

                        dataset.push({
                            seriesname: company1Name,
                            data: []
                        })
                        data.map((price) => {
                            let date = new Date(price.date)

                            let tempLabel = {
                                label: price.time + formatDate(date),
                            }

                            category.push(tempLabel);
                            dataset[0].data.push({
                                value: price.currentPrice
                            })

                            if (price.currentPrice < minimumValue) {
                                minimumValue = price.currentPrice
                            }
                            if (price.currentPrice > maxValue) {
                                maxValue = price.currentPrice
                            }
                        }
                        )


                    }).then(() => {
                        categories.push({
                            category: category
                        })
                        this.setState({
                            dataSource: {
                                chart: {
                                    caption: "Stock Price",    //Set the chart caption
                                    subCaption: "Company Code ",             //Set the chart subcaption
                                    xAxisName: "Date - Time",           //Set the x-axis name
                                    yAxisName: "Price",  //Set the y-axis name
                                    numberPrefix: "Rs. ",
                                    theme: "fusion",
                                    yAxisMinValue: minimumValue,
                                    yAxisMaxValue: maxValue
                                },
                                categories: categories,
                                dataset: dataset
                            }
                        })
                        console.log(this.state.dataSource)
                    }).then(() => {
                        if (isDouble)
                            axios.get(`https://secret-tundra-65063.herokuapp.com/company/${company2Id}/${stockexchange2}`, config)
                                .then((response) => {
                                    console.log(response.data)
                                    companyCode2 = response.data
                                    const requestBody = {
                                        companyCode: "" + companyCode2,
                                        from: this.props.data.fromDate,
                                        to: this.props.data.toDate
                                    }
                                    this.setState({ requestBody2: requestBody })

                                }).then(() => {
                                    console.log(this.state.requestBody2)
                                    axios.post("https://secret-tundra-65063.herokuapp.com/company/getpricebycode/", this.state.requestBody2, config)
                                        .then(response => {
                                            const data = response.data;
                                            console.log(data)
                                            let dataArray = []

                                            dataset.push({
                                                seriesname: company2Name,
                                                data: []
                                            })
                                            data.map((price) => {
                                                let date = new Date(price.date)

                                                let tempLabel = {
                                                    label: price.time + formatDate(date),
                                                }

                                                dataset[1].data.push({
                                                    value: price.currentPrice
                                                })

                                                if (price.currentPrice < minimumValue) {
                                                    minimumValue = price.currentPrice
                                                }
                                                if (price.currentPrice > maxValue) {
                                                    maxValue = price.currentPrice
                                                }
                                            }
                                            )


                                            console.log(category)

                                        }).then(() => {
                                            categories.push({
                                                category: category
                                            })
                                            this.setState({
                                                dataSource: {
                                                    chart: {
                                                        caption: "Stock Price",    //Set the chart caption
                                                        subCaption: "Company Code ",             //Set the chart subcaption
                                                        xAxisName: "Date - Time",           //Set the x-axis name
                                                        yAxisName: "Price",  //Set the y-axis name
                                                        numberPrefix: "Rs. ",
                                                        theme: "fusion",
                                                        yAxisMinValue: minimumValue,
                                                        yAxisMaxValue: maxValue
                                                    },
                                                    categories: categories,
                                                    dataset: dataset
                                                }
                                            })
                                            console.log(this.state.dataSource)
                                        })
                                })
                    })
            })
    }
    handleData = () => {
        return this.state.dataSource
    }
    handleLogout=()=>{
        this.props.handleLogout()
        
    }

    render() {
        return <div>
            < NavBar handleLogout={this.handleLogout}/>
            <div className="pt-4">
                <ReactFC
                    type="msline"
                    width="700" // Width of the chart
                    height="400" // Height of the chart
                    dataFormat="json"
                    dataSource={this.state.dataSource} />
            </div>
        </div >
    }
}

export default CompanyPrice;