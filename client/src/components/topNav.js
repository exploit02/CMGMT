import React from 'react'
import {Link} from 'react-router-dom'

function topNav() {
    return (
        <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">&nbsp;&nbsp;CM</a>
            <ul id="nav-mobile" className=" hide-on-med-and-down" style={{marginLeft:`7%`}}>
            <li><Link to={{pathname :`/`}}>
                        Home
                    </Link>
                </li>
                <li><Link to={{pathname :`/candidates`}}>
                        Candidates
                    </Link>
                </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={{pathname :`/signout`}}>
                        <i className="material-icons">power_settings_new</i>
                    </Link>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default topNav
