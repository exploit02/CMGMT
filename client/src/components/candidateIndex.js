import React, { Component } from 'react'
import TopNav from './topNav'
import {CandidateService} from '../services/candidateService'
import {Link} from 'react-router-dom'


const rowInPage = 5;

export class candidateIndex extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             tableData: [],
             paginationButton: [],
             currentPage: 1
        }

       
    }

    fiterHandler = (event) =>{
        var filterInput = event.target.value;
        var filteredData = this.state.data.filter((slice)=>{
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
            paginationButton.push( <li key={0} className={`${currentPage === 1 ? `disabled` : null}`}><a href="#!"><i className="material-icons" onClick={currentPage > 1 ?()=>this.paginationHandler(currentPage - 1): null}>chevron_left</i></a></li>)
        
        for(let i = 1; i <= pageCount; i++){
            paginationButton.push(<li key={i} className={`waves-effect ${i === currentPage ? `active` : null}`} onClick={()=>this.paginationHandler(i)}><a>{i}</a></li>)
        }

        if(pageCount >= 1)
        paginationButton.push(<li key={pageCount+1} className={`${pageCount === currentPage ? `disabled` : null}`}><a href="#!"><i className="material-icons" onClick={currentPage < pageCount ?()=>this.paginationHandler(currentPage +1): null}>chevron_right</i></a></li>)

        this.setState({
            currentPage : currentPage,
            paginationButton : paginationButton
        })
    }

    async componentDidMount(){
        var candidatesData = await CandidateService.getCandidate()
        this.setState({
            data: candidatesData ,
            tableData : candidatesData
        })
        this.paginationHandler()
    }
    
    render() {

        return (
            <div>
                <TopNav/>
                <div className="container">
                    <div className="col s12 m12">
                        <div className="card ">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s3 m3">
                                        {/* <a className=" waves-light btn blue index_add_new"><i className="material-icons">person_add</i>Add New</a> */}
                                        <Link to={{pathname :`/addcandidate`, state: {Id:''} }}>
                                            <button className=" waves-light btn blue index_add_new"><i className="material-icons">person_add</i>Add New</button>
                                        </Link>
                                    </div>
                                    <div className="col s8 m8">
                                    <input className="search_field" id="last_name" type="text" onChange={this.fiterHandler}/>
                                    <span><i className="material-icons search_icon">search</i></span>
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
                                                return(
                                                    index >= (this.state.currentPage - 1) * rowInPage && index < (this.state.currentPage) * rowInPage ?
                                                    <tr key={slice._id}>
                                                        <td>{slice.name}</td>
                                                        <td>{slice.aadhar_no}</td>
                                                        <td>{slice.phone_number}</td>
                                                        <td>{slice.city}</td>
                                                        <td>{slice.bank_account ? `Yes` : `No`}</td>
                                                        <td>
                                                            {
                                                                <span>
                                                                    <Link to={{pathname :`/updatecandidate`, state: {Id:slice._id} }}>
                                                                        <i className="material-icons">mode_edit</i>
                                                                    </Link>
                                                                    
                                                                    <i className="material-icons">more_vert</i>

                                                                    <Link to={{pathname :`/candidatedetails`, state: {Id:slice._id} }}>
                                                                        <i className="material-icons">person</i>
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
                                <ul className="pagination" style={{textAlign: 'right'}}>
                                    {
                                        this.state.paginationButton
                                    }
                                    {/* <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li> */}
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
