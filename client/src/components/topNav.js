import React from 'react'

function topNav() {
    return (
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo">&nbsp;&nbsp;CM</a>
            <ul id="nav-mobile" class=" hide-on-med-and-down" style={{marginLeft:`7%`}}>
                <li><a href="/">Home</a></li>
                <li><a href="/candidates">Candidates</a></li>
            </ul>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="/signout"><i class="material-icons">power_settings_new</i></a></li>
            </ul>
            </div>
        </nav>
    )
}

export default topNav
