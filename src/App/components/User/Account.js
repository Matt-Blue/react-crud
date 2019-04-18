import React, {Component} from 'react'
import firebase from '../../Firebase'

class Account extends Component{
    render(){
        var user = firebase.auth().currentUser;
        if (user) {
            return(
                <div>
                    Account Page<br/>
                    id - {this.props.userId}<br/>
                    username - {this.props.userName}<br/>
                    email - {this.props.userEmail}<br/>
                </div>
            )
        } else {
            return <div>You are not logged in!</div>
        }
        
    }
}

export default Account