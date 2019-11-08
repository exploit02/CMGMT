import React, { Component } from 'react'
import TopNav from './topNav'
import {CandidateService} from '../services/candidateService'
import {Link} from 'react-router-dom'

const data = [{_id: "5d99177444bbb239944ad83e", aadhar_no: "1221-5343-6464-7872", name: "Srimanta Ghosh", phone_number: "000000000", city: "Bangalore"},
{_id: "5d992aff840562322441633c", aadhar_no: "3233-2132-2312-3123", name: "Rajesh Roy", phone_number: "23123123123", city: "Burdwan"},
{_id: "5d99c8677277dd191429f9be", aadhar_no: "3423-3232-3231-5454", name: "Dikshita Singh", phone_number: "312312211", city: "Bhubaneswar"},
{_id: "5d9a1151968f1d3610f34e09", aadhar_no: "2317-2311-6281-2321", name: "Shruti Hugar", phone_number: "23781236213", city: "Bhubaneswar"},
{_id: "5d9a3da3875fc83e44c71276", aadhar_no: "3223-5858-7372-2092", name: "Sibastin Alley", phone_number: "22222222222", city: "Bhubaneswar"},
{_id: "5d9a3e87875fc83e44c7127c", aadhar_no: "3212-2121-2322", name: "Akshata Pandey", phone_number: "22222222222", city: "Burdwan"},
{_id: "5d9de6873dc0fd3e1417eaf5", aadhar_no: "743875860716", name: "Srimanta Ghosh", phone_number: "8420481056", city: "Bangalore"},
{_id: "5daebcca46946238070ccf55", aadhar_no: "4i3893289238923", name: "Subham Chatterjee", phone_number: "8906758008", city: "BENGALURU"},
{_id: "5dafff487c77db44e46b2ab8", aadhar_no: "234123412346", name: "Sudhir Roy", phone_number: "22222222222", city: "Burdwan"}];

const rowInPage = 5;

export class candidateIndex extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             tableData: data,
             paginationButton: [],
             currentPage: 1
        }

       
    }

    fiterHandler = (event) =>{
        var filterInput = event.target.value;
        var filteredData = data.filter((slice)=>{
            if(slice.name.toLowerCase().includes(filterInput.toLowerCase()) || slice.aadhar_no.toLowerCase().includes(filterInput.toLowerCase()) || slice.phone_number.toLowerCase().includes(filterInput.toLowerCase()) || slice.city.toLowerCase().includes(filterInput.toLowerCase())){
                return slice;
            }
        })
        this.setState({
            tableData : filteredData
        }, () => this.paginationHandler())
       
    }

    paginationHandler = (currentPage = 1) => {
        var pageCount = Math.ceil(this.state.tableData.length / rowInPage)
        var paginationButton = [];
        if(pageCount >= 1)
            paginationButton.push( <li className={`${currentPage === 1 ? `disabled` : null}`}><a href="#!"><i class="material-icons" onClick={currentPage > 1 ?()=>this.paginationHandler(currentPage - 1): null}>chevron_left</i></a></li>)
        
        for(let i = 1; i <= pageCount; i++){
            paginationButton.push(<li className={`waves-effect ${i === currentPage ? `active` : null}`} onClick={()=>this.paginationHandler(i)}><a>{i}</a></li>)
        }

        if(pageCount >= 1)
        paginationButton.push(<li className={`${pageCount === currentPage ? `disabled` : null}`}><a href="#!"><i class="material-icons" onClick={currentPage < pageCount ?()=>this.paginationHandler(currentPage +1): null}>chevron_right</i></a></li>)

        this.setState({
            currentPage : currentPage,
            paginationButton : paginationButton
        })
    }

    async componentDidMount(){
        var candidatesData = await CandidateService.getCandidate()
        console.log(candidatesData)
        this.setState({
            tableData: candidatesData 
        })
        this.paginationHandler()
    }
    
    render() {

        return (
            <div>
                <TopNav/>
                <div className="container">
                    <div class="col s12 m12">
                        <div class="card ">
                            <div class="card-content">
                                <div className="row">
                                    <div className="col s3 m3">
                                        {/* <a class=" waves-light btn blue index_add_new"><i class="material-icons">person_add</i>Add New</a> */}
                                        <Link to={{pathname :`/addcandidate`, state: {Id:''} }}>
                                        <a class=" waves-light btn blue index_add_new"><i class="material-icons">person_add</i>Add New</a>
                                        </Link>
                                    </div>
                                    <div className="col s8 m8">
                                    <input className="search_field" id="last_name" type="text" onChange={this.fiterHandler}/>
                                    <span><i class="material-icons search_icon">search</i></span>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Aadhar Number</th>
                                        <th>Mobile Number</th>
                                        <th>City</th>
                                        <th>Has Bank Account</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.tableData.map((slice, index)=>{
                                                console.log(slice)
                                                return(
                                                    index >= (this.state.currentPage - 1) * rowInPage && index < (this.state.currentPage) * rowInPage ?
                                                    <tr>
                                                        <td>{slice.name}</td>
                                                        <td>{slice.aadhar_no}</td>
                                                        <td>{slice.phone_number}</td>
                                                        <td>{slice.city}</td>
                                                        <td>{slice.bank_account ? `Yes` : `No`}</td>
                                                        <td>
                                                            {
                                                                <span>
                                                                    <Link to={{pathname :`/updatecandidate`, state: {Id:slice._id} }}>
                                                                        <i class="material-icons">mode_edit</i>
                                                                    </Link>
                                                                    
                                                                    <i class="material-icons">more_vert</i>

                                                                    <Link to={{pathname :`/candidatedetails`, state: {Id:slice._id} }}>
                                                                        <i class="material-icons">person</i>
                                                                    </Link>
                                                                </span>
                                                            }
                                                        </td>
                                                    </tr>
                                                    :
                                                    null
                                                )
                                            })
                                        }
                                    
                                    </tbody>
                                </table>
                                <ul class="pagination" style={{textAlign: 'right'}}>
                                    {
                                        this.state.paginationButton
                                    }
                                    {/* <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default candidateIndex
