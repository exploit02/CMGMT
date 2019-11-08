import React, { Component } from 'react'
import {CandidateService} from '../services/candidateService'
import TopNav from './topNav'
import M from 'materialize-css'

export class candidateDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            candidateData : {},
            modalData : {}
        }
    }

    async componentDidMount(){
        const candidateData = await CandidateService.selectedCandidate(this.props.location.state.Id)
        this.setState({
            candidateData
        })
        M.AutoInit()
    }

    modalHandler = (event) =>{
        console.log(event.target.dataset)
        var versionData = this.state.candidateData.versions.filter((val)=>{ 
            if(event.target.dataset.id == val._id){
                return val;
            }
        })

        this.setState({
            modalData : versionData
        })
    }
    
    render() {
        const versions =  this.state.candidateData.versions !== undefined ? this.state.candidateData.versions : []
        const modalData = this.state.modalData[0] !== undefined ? this.state.modalData[0] : {}
        console.log(modalData)
        return (
            <div>
                <TopNav/>
                <div className="container">
                    <div class="col s12 m12">
                        <div class="card ">
                            <div class="card-content">
                            <span class="card-title" style={{textAlign:'center'}}>Details Of : {this.state.candidateData.name}</span><br/><br/>
                            <h5>Personal Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Aadhar Number : </label><span className="details_data">{this.state.candidateData.aadhar_no}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Name : </label><span className="details_data">{this.state.candidateData.name}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Phone Number : </label><span className="details_data">{this.state.candidateData.phone_number}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">DOB : </label><span className="details_data">{this.state.candidateData.dob}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Alternate Phone Number : </label><span className="details_data">{this.state.candidateData.alternate_phone_number}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Email : </label><span className="details_data">{this.state.candidateData.email}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Gender : </label><span className="details_data">{this.state.candidateData.gender}</span>
                                </div>
                            </div>
                            <br/>
                            <h5>Personal Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Address Line 1 : </label><span className="details_data">{this.state.candidateData.address_1}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Address Line 2 : </label><span className="details_data">{this.state.candidateData.address_2}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">City : </label><span className="details_data">{this.state.candidateData.city}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">District : </label><span className="details_data">{this.state.candidateData.district}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">State : </label><span className="details_data">{this.state.candidateData.state}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Country : </label><span className="details_data">{this.state.candidateData.country}</span>
                                </div>
                            </div>
                            <br/>
                            <h5>Other Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Source : </label><span className="details_data">{this.state.candidateData.source}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Source Type : </label><span className="details_data">{this.state.candidateData.source_type}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Employment Status : </label><span className="details_data">{this.state.candidateData.employment_status}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Occupation : </label><span className="details_data">{this.state.candidateData.occupation}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Current Annual Income : </label><span className="details_data">{this.state.candidateData.annual_income}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Educational Qualification : </label><span className="details_data">{this.state.candidateData.educational_qualification}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Number of Successfull Enterprises : </label><span className="details_data">{this.state.candidateData.successful_enterprises}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Number of Failed Enterprises : </label><span className="details_data">{this.state.candidateData.failed_enterprises}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Has Bank Account : </label><span className="details_data">{this.state.candidateData.bank_account ? `Yes` : `No`}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Has A Credit History : </label><span className="details_data">{this.state.candidateData.credit_history ? `Yes` : `No`}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Needs Training : </label><span className="details_data">{this.state.candidateData.needs_training ? `Yes` : `No`}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Status : </label><span className="details_data">{this.state.candidateData.status}</span>
                                </div>
                            </div>
                            <br/>
                            <h5> History</h5>
                            <div className="row">
                                <div className="col s12 m12">
                                    <table>
                                    <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>Status</th>
                                        <th>Modified Date</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            versions.map((slice, index)=>{
                                                return(
                                                    <tr key={slice._id}>
                                                       <td>{index+1}</td>
                                                        <td>{slice.status}</td>
                                                        <td>{new Date(slice.updatedAt).getDate() + '/' + (new Date(slice.updatedAt).getMonth()+1) + '/' + new Date(slice.updatedAt).getFullYear()}</td>
                                                        <td><button data-target="modal1" data-id={slice._id} class="btn modal-trigger" onClick={this.modalHandler}>View</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr/><br/>
                            <div id="modal1" class="modal ">
                                <div class="modal-content">
                                <h4>Candidate's History Details</h4>
                                <h5>Personal Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Aadhar Number : </label><span className="details_data">{modalData.aadhar_no}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Name : </label><span className="details_data">{modalData.name}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Phone Number : </label><span className="details_data">{modalData.phone_number}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">DOB : </label><span className="details_data">{this.state.candidateData.dob}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Alternate Phone Number : </label><span className="details_data">{this.state.candidateData.alternate_phone_number}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Email : </label><span className="details_data">{this.state.candidateData.email}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Gender : </label><span className="details_data">{this.state.candidateData.gender}</span>
                                </div>
                            </div>
                            <br/>
                            <h5>Personal Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Address Line 1 : </label><span className="details_data">{this.state.candidateData.address_1}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Address Line 2 : </label><span className="details_data">{this.state.candidateData.address_2}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">City : </label><span className="details_data">{this.state.candidateData.city}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">District : </label><span className="details_data">{this.state.candidateData.district}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">State : </label><span className="details_data">{this.state.candidateData.state}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Country : </label><span className="details_data">{this.state.candidateData.country}</span>
                                </div>
                            </div>
                            <br/>
                            <h5>Other Details</h5>
                            <hr/><br/>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Source : </label><span className="details_data">{this.state.candidateData.source}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Source Type : </label><span className="details_data">{this.state.candidateData.source_type}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Employment Status : </label><span className="details_data">{this.state.candidateData.employment_status}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Occupation : </label><span className="details_data">{this.state.candidateData.occupation}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Current Annual Income : </label><span className="details_data">{this.state.candidateData.annual_income}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Educational Qualification : </label><span className="details_data">{this.state.candidateData.educational_qualification}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Number of Successfull Enterprises : </label><span className="details_data">{this.state.candidateData.successful_enterprises}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Number of Failed Enterprises : </label><span className="details_data">{this.state.candidateData.failed_enterprises}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Has Bank Account : </label><span className="details_data">{this.state.candidateData.bank_account ? `Yes` : `No`}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Has A Credit History : </label><span className="details_data">{this.state.candidateData.credit_history ? `Yes` : `No`}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 m6">
                                    <label className="details_label">Needs Training : </label><span className="details_data">{this.state.candidateData.needs_training ? `Yes` : `No`}</span>
                                </div>
                                <div className="col s6 m6">
                                    <label className="details_label">Status : </label><span className="details_data">{this.state.candidateData.status}</span>
                                </div>
                            </div>
                            <br/>
                                </div>
                                <div class="modal-footer">
                                <a href="#!" class="modal-close waves-effect waves-green btn-flat">OK</a>
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

export default candidateDetails
