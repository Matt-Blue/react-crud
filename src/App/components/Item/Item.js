import React, {Component} from 'react'

class Account extends Component{
    render(){
        return(
            <div className="col-sm item">
                ITEM<br/>
                title: {this.props.title}<br/>
                description: {this.props.description}<br/>
                price: {this.props.price}<br/>
                timestamp: {this.props.timestamp}<br/>
                image: {this.props.image}<br/>
            </div>            
        )    
    }
}

export default Account