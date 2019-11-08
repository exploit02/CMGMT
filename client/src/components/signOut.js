import React, { Component } from 'react'
import  { notification }  from '../utils/notification';
import {UserService} from './../services/userService';
import session from '../utils/sessionStore'


export class signOut extends Component {
    componentDidMount(){

         const logout = UserService.logout()
         session.email = null;
         session.name = null;
         session.isLoggedIn = false;
         localStorage.removeItem('session');
         this.props.history.push("/");
         notification.createNotification(201,"Logged out Successfully")
      }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default signOut
