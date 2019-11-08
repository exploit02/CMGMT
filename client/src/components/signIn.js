import React, { Component } from 'react'
import {UserService} from './../services/userService';
import  { notification }  from '../utils/notification';
import session from '../utils/sessionStore'

export class signIn extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           email: null,
           password: null
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
    
            if(res.status == 201){
    
              this.setState({
                email: null ,
                password: null 
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
                    <div className="col s4 m4" style={{float: "right"}}>
                        <div class="card signIn_card darken-1">
                            <div class="card-content">
                            <span class="card-title" style={{textAlign : `center`}}>Sign In</span>
                            <div className="row">
                                <div class="input-field col s12">
                                    <input id="email" name="email" type="text" class="validate" onChange={this.handleChange} value={this.state.email}/>
                                    <label for="email">Email</label>
                                    <span className="helper-text" style={{color:'red'}}></span>
                                </div>
                            </div>
                            <div className="row">
                                <div class="input-field col s12">
                                    <input id="password" name="password" type="password" class="validate" onChange={this.handleChange} value={this.state.password}/>
                                    <label for="password">Password</label>
                                    <span className="helper-text" style={{color:'red'}}></span>
                                </div>
                            </div>
                            </div>
                            <div className="row" style={{textAlign : `center`}}>
                                <a class=" btn blue" style={{marginBottom : `5%`}} onClick={this.handleSubmitForm} textAli>Sign In</a>
                            </div>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default signIn
