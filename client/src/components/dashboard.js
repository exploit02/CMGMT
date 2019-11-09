import React, { Component } from 'react'
import TopNav from './topNav'
import {CandidateService} from '../services/candidateService'
import M from 'materialize-css'
import CanvasJSReact from '../canvasjs/canvasjs.react' 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            toDate: '',
            fromDate: '',
            state:'',
            city:'',
            countByGender:{
                'Male': 0,
                'Female': 0
            },
            countByAgeGroup:{
                'Under 10': 0,
                '10Yrs - 25Yrs': 0,
                '25Yrs - 40Yrs': 0,
                '40Yrs - 55Yrs': 0,
                '55Yrs - 70Yrs': 0,
                '70Yrs - 85Yrs': 0,
                'Over 85': 0
            },
            countByStatus:{
                'Interested in exploring': 0,
                'Undergoing Training': 0,
                'Training Complete': 0,
                'Stream identified': 0,
                'Resume submitted': 0,
                'Resume sent for processing': 0,
                'Resume declined': 0,
                'Resume accepted': 0,
                'Due diligence': 0,
                'Background check': 0,
                'Job offer received': 0,
                'No longer interested': 0,
                'Deceased': 0
            }
        }
    }

    componentDidMount = async function() {
        M.AutoInit()
        var context = this;
        var elems = document.querySelectorAll(".datepicker");
        M.Datepicker.init(elems, {
            defaultDate: new Date(),
            container: "body",
            onClose: () => {
                context.setState({ 
                    fromDate: context.refs.from.value,
                    toDate: context.refs.to.value
                });
            },
            autoClose: true,
            showClearBtn:true
        });


        let dashboardDataByGender = await CandidateService.candidateCountByGender(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        let dashboardDataByStatus = await CandidateService.candidateCountByStatus(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        let dashboardDataByAgegroup = await CandidateService.candidateCountByAgegroup(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        
        let CountByGender = {}
        let CountByAgeGroup = {}
        let CountByStatus = {}
        
        dashboardDataByGender.map((slice)=>{
            CountByGender[slice._id] = slice.count
        })

        dashboardDataByAgegroup.map((slice)=>{
            CountByAgeGroup[slice.ageGroup] = slice.personCount
        })

        dashboardDataByStatus.map((slice)=>{
            CountByStatus[slice._id] = slice.count
        })

        this.setState(prevState =>({
            countByGender:{
                ...prevState.countByGender,
                ...CountByGender
            },
            countByAgeGroup:{
                ...prevState.countByAgeGroup,
                ...CountByAgeGroup
            },
            countByStatus:{
                ...prevState.countByAgeGroup,
                ...CountByStatus
            }

        }))
    }

    inputHandler = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    filterHandler = async()=>{
        let dashboardDataByGender = await CandidateService.candidateCountByGender(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        let dashboardDataByStatus = await CandidateService.candidateCountByStatus(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        let dashboardDataByAgegroup = await CandidateService.candidateCountByAgegroup(this.state.toDate, this.state.fromDate, this.state.state, this.state.city);
        
        let genderCountObject = {
            "Male": 0,
            "Female": 0
        }

        let statusCountObject = {
            'Interested in exploring': 0,
            'Undergoing Training': 0,
            'Training Complete': 0,
            'Stream identified': 0,
            'Resume submitted': 0,
            'Resume sent for processing': 0,
            'Resume declined': 0,
            'Resume accepted': 0,
            'Due diligence': 0,
            'Background check': 0,
            'Job offer received': 0,
            'No longer interested': 0,
            'Deceased': 0
        }

        let ageGroupCountObject = {
            'Under 10Yrs': 0,
            '10Yrs - 25Yrs': 0,
            '25Yrs - 40Yrs': 0,
            '40Yrs - 55Yrs': 0,
            '55Yrs - 70Yrs': 0,
            '70Yrs - 85Yrs': 0,
            'Over 85Yrs': 0
        }
       
        dashboardDataByGender.map((slice)=>{
            genderCountObject[slice._id] = slice.count
        })

        dashboardDataByStatus.map((slice)=>{
            statusCountObject[slice._id] = slice.count
        })

        dashboardDataByAgegroup.map((slice)=>{
            ageGroupCountObject[slice.ageGroup] = slice.personCount
        })

        this.setState({
            countByGender: genderCountObject,
            countByAgeGroup: ageGroupCountObject,
            countByStatus: statusCountObject
        })
      }
    
    render() {
        const optionsByGender = {
			title: {
				text: "Candiadte Count By Gender"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "Male",  y: this.state.countByGender.Male },
					{ label: "Female", y: this.state.countByGender.Female  }
				]
			}
			]
        }
        
        const optionsByAge = {
			title: {
				text: "Candiadte Count By Age"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "Under 10Yrs",  y: this.state.countByAgeGroup["Under 10Yrs"]  },
                    { label: "10Yrs - 25Yrs", y: this.state.countByAgeGroup["10Yrs - 25Yrs"]  },
                    { label: "25Yrs - 40Yrs",  y: this.state.countByAgeGroup["25Yrs - 40Yrs"]  },
					{ label: "40Yrs - 55Yrs", y: this.state.countByAgeGroup["40Yrs - 55Yrs"]  },
                    { label: "55Yrs - 70Yrs", y: this.state.countByAgeGroup["55Yrs - 70Yrs"]  },
                    { label: "70Yrs - 85Yrs",  y: this.state.countByAgeGroup["70Yrs - 85Yrs"]  },
					{ label: "Over 85Yrs", y: this.state.countByAgeGroup["Over 85Yrs"]  }
				]
			}
			]
        }
        
        const optionsByStatus = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Candidate Count By Status"
			},
			axisX: {
				title: "Status",
				reversed: true,
			},
			axisY: {
				title: "Candidate Count",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ label: 'Interested in exploring', y: this.state.countByStatus["Interested in exploring"]},
					{ label: 'Undergoing Training', y: this.state.countByStatus["Undergoing Training"]},
					{ label: 'Training Complete', y: this.state.countByStatus["Training Complete"]},
					{ label: 'Stream identified', y: this.state.countByStatus["Stream identified"] },
					{ label: 'Resume submitted', y: this.state.countByStatus["Resume submitted"] },
					{ label: 'Resume sent for processing', y: this.state.countByStatus["Resume sent for processing"]},
                    { label: 'Resume declined', y: this.state.countByStatus["Resume declined"] },
					{ label: 'Resume accepted', y: this.state.countByStatus["Resume accepted"]},
					{ label: 'Due diligence', y: this.state.countByStatus["Due diligence"] },
					{ label: 'Background check', y: this.state.countByStatus["Background check"] },
					{ label: 'Job offer received', y: this.state.countByStatus["Job offer received"] },
                    { label: 'No longer interested', y: this.state.countByStatus["No longer interested"] },
                    { label: 'Deceased', y: this.state.countByStatus["Deceased"] }
				]
            }]
            
		}
        return (
            <div>
                <TopNav/>
                <div className="container-fluid">
                    <div className="col s12 m12">
                        <div className="card ">
                            <div className="card-content">
                                <div className="row">
                                    <div className="input-field col s3 m3">
                                        <input type="text" id="from_date" className="datepicker" ref="from"/> 
                                        <label htmlFor="from_date">From</label>
                                    </div>
                                    <div className="input-field col s3 m3">
                                        <input type="text" id="to_date" className="datepicker" ref="to"/>
                                        <label htmlFor="to_date">To</label>
                                    </div>
                                    <div className="input-field col s3 m3">
                                        <input id="state" type="text" className="validate" name="state" value={this.state.state} onChange={this.inputHandler}/>
                                        <label htmlFor="state">State</label>
                                    </div>
                                    <div className="input-field col s3 m3">
                                        <input id="city" type="text" className="validate" name="city" value={this.state.city}  onChange={this.inputHandler}/>
                                        <label htmlFor="city">City</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <a className="btn waves-light red lighten-2 filter" onClick={this.filterHandler}>Filter</a>
                                </div>
                                <div className="row">
                                    <div className="col s6 m6">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <CanvasJSChart options = {optionsByGender}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s6 m6">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <CanvasJSChart options = {optionsByAge}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <CanvasJSChart options = {optionsByStatus}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default dashboard
