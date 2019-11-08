import React, { Component } from 'react'
import {UserService} from './../services/userService';
import  { notification }  from '../utils/notification';
import session from '../utils/sessionStore'

export class signIn extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           email: '',
           password: ''
        }
    }
      
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    
      
     handleSubmitForm = async (event) => {
        event.preventDefault();
    
        if(this.state.email && this.state.password){
            const res = await UserService.login(this.state)
            console.log(res)
            if(res.status == 201){
    
              this.setState({
                email: '' ,
                password: '' 
              });
    
              const sessionData = {
                email: res.data.user.email,
                name: res.data.user.firstName,
                isLoggedIn: true
              }
              localStorage.setItem('session', JSON.stringify(sessionData));
    
              global.session.email = res.data.user.email;
              global.session.name = res.data.user.firstName;
              global.session.isLoggedIn = true;
    
              this.props.history.push("/");
              notification.createNotification(res.status,"Logged in Successfully")
            }else{
              notification.createNotification(res.status, res.message)
            }
    
        }else{
            notification.createNotification(400,"Did you miss filling some field.")
        }
    
     }
    
    componentDidMount(){
        if(session.isLoggedIn){
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col l4 s4 m4 xs4" style={{float: "right"}}>
                        <div className="card signIn_card darken-1">
                            <div className="card-content">
                            <span className="card-title" style={{textAlign : `center`}}>Sign In</span>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="text" className="validate" onChange={this.handleChange} value={this.state.email}/>
                                    <label htmlFor="email">Email</label>
                                    <span className="helper-text" style={{color:'red'}}></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" className="validate" onChange={this.handleChange} value={this.state.password}/>
                                    <label htmlFor="password">Password</label>
                                    <span className="helper-text" style={{color:'red'}}></span>
                                </div>
                            </div>
                            </div>
                            <div className="row" style={{textAlign : `center`}}>
                                <a className=" btn blue" style={{marginBottom : `5%`}} onClick={this.handleSubmitForm}>Sign In</a>
                            </div>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default signIn
