import React, { Component } from 'react'
import FormValidator from '../utils/validator'
import aadharValidator from 'aadhaar-validator'
import TopNav from './topNav'
import M from 'materialize-css'
import {CandidateService} from '../services/candidateService'
import  { notification }  from '../utils/notification';

const source = [
    { value: 'Event', label: 'Event', name:'source' },
    { value: 'Roadshow', label: 'Roadshow', name:'source' },
    { value: 'Referral', label: 'Referral', name:'source' },
    { value: 'Word Of Mouth', label: 'Word Of Mouth', name:'source' },
    { value: 'Press', label: 'Press', name:'source' }
  ];

  const sourceTypes = [
    { value: 'Inbound', label: 'Inbound', name:'source_type' },
    { value: 'Outbound', label: 'Outbound', name:'source_type' }
  ];

  const employmentStatus = [
    { value: 'Self-employed', label: 'Self-employed', name:'employment_status' },
    { value: 'Unemployed', label: 'Unemployed', name:'employment_status' },
    { value: 'Employed', label: 'Employed', name:'employment_status' },
  ];
  
  const occupation = [
    { value: 'Farmer', label: 'Farmer', name:'occupation' },
    { value: 'Mason', label: 'Mason', name:'occupation'  },
    { value: 'Poultry Farmer', label: 'Poultry Farmer', name:'occupation'  },
    { value: 'Shopkeeper', label: 'Shopkeeper', name:'occupation'  },
    { value: 'Mechanic', label: 'Mechanic', name:'occupation'  },
    { value: 'Teacher', label: 'Teacher', name:'occupation'  },
    { value: 'Housewife', label: 'Housewife', name:'occupation'  }
  ];
  const annualIncome = [
    { value: '<2 lacs/annum', label: '<2 lacs/annum', name:'annual_income' },
    { value: '2-5 lacs/annum', label: '2-5 lacs/annum', name:'annual_income' },
    { value: '5-10 lacs/annum', label: '5-10 lacs/annum', name:'annual_income' },
    { value: '10-20 lacs/annum', label: '10-20 lacs/annum', name:'annual_income' },
    { value: '>20 lacs/annum', label: '>20 lacs/annum', name:'annual_income' }
  ];

const educationalQualification = [
    { value: 'Never went to school', label: 'Never went to school', name:'educational_qualification' },
    { value: '5th pass', label: '5th pass', name:'educational_qualification' },
    { value: '8th pass', label: '8th pass', name:'educational_qualification' },
    { value: '10th pass', label: '10th pass', name:'educational_qualification' },
    { value: '12th pass', label: '12th pass', name:'educational_qualification' },
    { value: 'Diploma', label: 'Diploma', name:'educational_qualification' },
    { value: 'Graduate', label: 'Graduate', name:'educational_qualification' },
    { value: 'Post-graduate', label: 'Post-graduate', name:'educational_qualification' }
  ];
  
  const status = [
    { value: 'Interested in exploring', label: 'Interested in exploring', name:'status' },
    { value: 'Undergoing Training', label: 'Undergoing Training', name:'status' },
    { value: 'Training Complete', label: 'Training Complete', name:'status' },
    { value: 'Stream identified', label: 'Stream identified', name:'status' },
    { value: 'Resume made', label: 'Resume made', name:'status' },
    { value: 'Resume submitted', label: 'Resume submitted', name:'status' },
    { value: 'Resume sent for processing', label: 'Resume sent for processing', name:'status' },
    { value: 'Resume declined', label: 'Resume declined', name:'status' },
    { value: 'Resume accepted', label: 'Resume accepted', name:'status' },
    { value: 'Due diligence', label: 'Due diligence', name:'status' },
    { value: 'Background check', label: 'Background check', name:'status' },
    { value: 'Job offer received', label: 'Job offer received', name:'status' },
    { value: 'No longer interested', label: 'No longer interested', name:'status' },
    { value: 'Deceased', label: 'Deceased', name:'status' }
  ];

export class addUpdateCandidate extends Component {
    constructor(props) {
        super(props)
    
        this.validator = new FormValidator([
            // { 
            //     field: 'aadhar_no', 
            //     method: 'isEmpty', 
            //     validWhen: false, 
            //     message: 'Aadhar number is required' 
            // },
            // { 
            //     field: 'aadhar_no', 
            //     method: aadharValidator.isValidNumber, 
            //     validWhen: true, 
            //     message: 'Aadhar number is invalid' 
            // },
            // { 
            //     field: 'aadhar_no', 
            //     method:  CandidateService.checkAadhar, 
            //     validWhen: false, 
            //     message: 'Candidate already registered with this aadhar number' 
            // },
            { 
                field: 'name', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Name is required.' 
            },
            { 
                field: 'phone_number', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Pleave provide a phone number.'
            },
            {
                field: 'phone_number', 
                method: 'matches',
                args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
                validWhen: true, 
                message: 'That is not a valid phone number.'
            },
            { 
                field: 'dob', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Date of birth is required.' 
            },
            { 
                field: 'email', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Email is required.' 
            },
            { 
                field: 'email',
                method: 'isEmail', 
                validWhen: true, 
                message: 'That is not a valid email.'
            },
            { 
                field: 'gender', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Gender is required.' 
            },
            { 
                field: 'address_1', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Address is required.' 
            },
            { 
                field: 'country', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Country is required.' 
            },
            { 
                field: 'state', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'State is required.' 
            },
            { 
                field: 'district', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'District is required.' 
            },
            { 
                field: 'city', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'City is required.' 
            },
            { 
                field: 'source', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Source is required.' 
            },
            { 
                field: 'source_type', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Source type is required.' 
            },
            { 
                field: 'employment_status', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Employment status is required.' 
            },
            { 
                field: 'occupation', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Occupation is required.' 
            },
            { 
                field: 'annual_income', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Annual income is required.' 
            },
            { 
                field: 'educational_qualification', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Educational qualification is required.' 
            },
            { 
                field: 'successful_enterprises', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Number of successfull enterprises is required.' 
            },
            { 
                field: 'failed_enterprises', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Number of failed enterprises is required.' 
            },
            { 
                field: 'status', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Status is required.' 
            }
          ]);

        this.state = {
            aadhar_no:'',
            name: '',
            phone_number:'',
            dob: '',
            alternate_phone_number: '',
            email: '',
            gender: '',
            address_1: '',
            address_2: '',
            city: '',
            district: '',
            state: '',
            country: '',
            source: '',
            source_type: '', 
            employment_status: '', 
            occupation: '',
            annual_income: '', 
            educational_qualification: '',
            successful_enterprises: '',
            failed_enterprises: '',
            status:'',
            bank_account: false,
            credit_history: false,
            needs_training: false,
            validation: this.validator.valid()
        }

        this.submitted = false;
        this.baseState = this.state
    }

    async componentDidMount(){
        
        var candidateData =[];
        if(this.props.location.state.Id){
             candidateData = await CandidateService.selectedCandidate(this.props.location.state.Id)
            this.setState({
                _id:candidateData._id,
                aadhar_no: candidateData.aadhar_no,
                name: candidateData.name,
                phone_number: candidateData.phone_number,
                dob: new Date(candidateData.dob),
                alternate_phone_number: candidateData.alternate_phone_number,
                email: candidateData.email,
                gender: candidateData.gender,
                address_1: candidateData.address_1,
                address_2: candidateData.address_2,
                city: candidateData.city,
                district: candidateData.district,
                state: candidateData.state,
                country: candidateData.country,
                source: candidateData.source,
                source_type: candidateData.source_type, 
                employment_status: candidateData.employment_status, 
                occupation: candidateData.occupation,
                annual_income: candidateData.annual_income, 
                educational_qualification: candidateData.educational_qualification,
                successful_enterprises: candidateData.successful_enterprises,
                failed_enterprises: candidateData.failed_enterprises,
                status:candidateData.status,
                bank_account: candidateData.bank_account,
                credit_history: candidateData.credit_history,
                needs_training: candidateData.needs_training,
                sourceDisabled:true,
                aadhar_no_validation: false,
                update:true

            })
        }

        M.AutoInit();
        var context = this;
        var elems = document.querySelectorAll(".datepicker");
        M.Datepicker.init(elems, {
            defaultDate:this.props.location.state.Id ?  new Date(candidateData.dob): new Date(),
            setDefaultDate:this.props.location.state.Id ?  true: false,
            container: "body",
            onSelect: function(date) {
                context.setState({ dob: date });
            },
            autoClose: true
        });
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitHandler = async (event) => {
        const validation = this.validator.validate(this.state);
        
        this.setState({ validation });
        this.submitted = true;
        if(validation){
            const candidateServiceResponse = await CandidateService.addCandidate(this.state);
            if(candidateServiceResponse.status === 201){
                this.props.history.push("/candidates");
                notification.createNotification(candidateServiceResponse.status,"Candidate Created Successfully")
            }else{
                notification.createNotification(500,"Something went wrong")
            }
        }
    }

    updateHandler = async (event)=>{
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        if(validation){
            const candidateServiceResponse = await CandidateService.updateCandidate(this.state)
            if(candidateServiceResponse !== undefined && candidateServiceResponse.status === 200){
                this.props.history.push("/candidates");
                notification.createNotification(candidateServiceResponse.status,"Candidate Updated Successfully")
            }else{
                notification.createNotification(500,"Something Went Wrong")
            }
        }
    }
    
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
        return (
            <div>
                <TopNav/>
                <div className="container">
                    <div className="col s12 m12">
                        <div className="card ">
                            <div className="card-content">
                                <span className="card-title" style={{ textAlign: 'center' }}>Fill Candidate Details</span>
                                <h5>Personal Details</h5>
                                <hr/>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="aadhar_no" name="aadhar_no" type="text" className="validate" onChange={this.inputHandler} value={this.state.aadhar_no}/>
                                        <label htmlFor="aadhar_no" className={this.state.update ? `active`:null}>Aadhar Number</label>
                                        {/* <span className="helper-text" style={{color:'red'}}>{validation.aadhar_no.message}</span> */}
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="name" name="name" type="text" className="validate" onChange={this.inputHandler} value={this.state.name}/>
                                        <label htmlFor="name" className="active" className={this.state.update ? `active`:null}>Name</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.name.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="phone_number" name="phone_number" type="text" className="validate" onChange={this.inputHandler} value={this.state.phone_number}/>
                                        <label htmlFor="phone_number" className={this.state.update ? `active`:null}>Phone Number</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.phone_number.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="name" type="text" className="datepicker validate"></input>
                                        <label htmlFor="name" className={this.state.update ? `active`:null}>DOB</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.dob.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="alternate_phone_number" name="alternate_phone_number" type="text" className="validate" onChange={this.inputHandler} value={this.state.alternate_phone_number}/>
                                        <label htmlFor="alternate_phone_number" className={this.state.update ? `active`:null}>Alternate Phone Number</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="email" name="email" type="text" className="validate" onChange={this.inputHandler} value={this.state.email}/>
                                        <label htmlFor="email" className={this.state.update ? `active`:null}>Email</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.email.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select name="gender" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label >Gender</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.gender.message}</span>
                                    </div>
                                </div>
                                <h5>Address</h5>
                                <hr/>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="address_1" name="address_1" type="text" className="validate" onChange={this.inputHandler} value={this.state.address_1}/>
                                        <label htmlFor="address_1" className={this.state.update ? `active`:null}>Address Line 1</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.address_1.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="address_2" name="address_2" type="text" className="validate" onChange={this.inputHandler} value={this.state.address_2}/>
                                        <label htmlFor="address_2" className={this.state.update ? `active`:null}>Address Line 2</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="country" name="country" type="text" className="validate" onChange={this.inputHandler} value={this.state.country}/>
                                        <label htmlFor="country" className={this.state.update ? `active`:null}>Country</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.country.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="state" name="state" type="text" className="validate" onChange={this.inputHandler} value={this.state.state}/>
                                        <label htmlFor="state" className={this.state.update ? `active`:null}>State</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.state.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="district" name="district" type="text" className="validate" onChange={this.inputHandler} value={this.state.district}/>
                                        <label htmlFor="district" className={this.state.update ? `active`:null}>District</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.district.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="city" name="city" type="text" className="validate" onChange={this.inputHandler} value={this.state.city}/>
                                        <label htmlFor="city" className={this.state.update ? `active`:null}>City</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.city.message}</span>
                                    </div>
                                </div>
                                <h5>Other Details</h5>
                                <hr/>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select name="source" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                source.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.source === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Source</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.source.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <select name="source_type" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                sourceTypes.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.source_type === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Source Type</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.source_type.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select name="employment_status" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                employmentStatus.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.employment_status === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Employment Status</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.employment_status.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <select name="occupation" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                occupation.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.occupation === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Occupation</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.occupation.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select name="annual_income" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                annualIncome.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.annual_income === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Current Annual Income</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.annual_income.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <select name="educational_qualification" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                educationalQualification.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.educational_qualification === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Educational Qualification</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.educational_qualification.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="successful_enterprises" name="successful_enterprises" type="number" className="validate" onChange={this.inputHandler} value={this.state.successful_enterprises}/>
                                        <label htmlFor="successful_enterprises" className={this.state.update ? `active`:null}>Number of successful enterprises</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.successful_enterprises.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="failed_enterprises" name="failed_enterprises" type="number" className="validate" onChange={this.inputHandler} value={this.state.failed_enterprises}/>
                                        <label htmlFor="failed_enterprises" className={this.state.update ? `active`:null}>Number of failed enterprises</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.failed_enterprises.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <select name="status" onChange={this.inputHandler}>
                                            <option value="" disabled selected>Choose Your Option</option>
                                            {
                                                status.map((slice, index)=>{
                                                    return(
                                                        <option key={slice.value} value={slice.value} selected={this.state.status === slice.value ? true : false}>{slice.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Status</label>
                                        <span className="helper-text" style={{color:'red'}}>{validation.status.message}</span>
                                    </div>
                                    <div className="input-field col s6">
                                        <div className="input-field col s6">
                                            <p>Has Bank Account? :</p>
                                        </div>
                                       <div className="input-field col s3">
                                            <p>
                                            <label>
                                                <input name="bank_account" type="radio" onChange={this.inputHandler} value="true"/>
                                                <span>Yes</span>
                                            </label>
                                            </p>
                                       </div>
                                       <div className="input-field col s3">
                                       <p>
                                            <label>
                                                <input name="bank_account" type="radio" onChange={this.inputHandler} value="false"/>
                                                <span>No</span>
                                            </label>
                                        </p>
                                       </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <div className="input-field col s6">
                                            <p>Has a credit history? :</p>
                                        </div>
                                       <div className="input-field col s3">
                                            <p>
                                            <label>
                                                <input name="credit_history" type="radio" onChange={this.inputHandler} value="true"/>
                                                <span>Yes</span>
                                            </label>
                                            </p>
                                       </div>
                                       <div className="input-field col s3">
                                       <p>
                                            <label>
                                                <input name="credit_history" type="radio" onChange={this.inputHandler} value="false"/>
                                                <span>No</span>
                                            </label>
                                        </p>
                                       </div>
                                    </div>
                                    <div className="input-field col s6">
                                        <div className="input-field col s6">
                                            <p>Needs Training? :</p>
                                        </div>
                                       <div className="input-field col s3">
                                            <p>
                                            <label>
                                                <input name="needs_training" type="radio" onChange={this.inputHandler} value="true"/>
                                                <span>Yes</span>
                                            </label>
                                            </p>
                                       </div>
                                       <div className="input-field col s3">
                                       <p>
                                            <label>
                                                <input name="needs_training" type="radio" onChange={this.inputHandler} value="false"/>
                                                <span>No</span>
                                            </label>
                                        </p>
                                       </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action" style={{textAlign:'center'}}>
                                {
                                    this.props.location.state.Id ? 
                                    <a className="waves-effect waves-light btn blue" onClick={this.updateHandler}>Update</a> 
                                    :
                                    <a className="waves-effect waves-light btn blue" onClick={this.submitHandler}>Submit</a>
                                }
                            &emsp;&emsp;
                            <a className="waves-effect waves-light btn" style={{backgroundColor: '#FF6347'}} onClick={()=>{this.setState(this.baseState)}}>Reset</a>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default addUpdateCandidate
