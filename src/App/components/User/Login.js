import React, {Component} from 'react'
import firebase from '../../Firebase'
import FormError from '../Form/FormError'
import { navigate } from '@reach/router';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error_message: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        const tempName = e.target.name
        const tempValue = e.target.value
        this.setState({[tempName]: tempValue})
    }
    handleSubmit(e){
        e.preventDefault()
        var user = {
            email: this.state.email,
            password: this.state.password
        }
        firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(() => {
            navigate('/items')
        }).catch(error => {
            if (error.message !== null){
                this.setState({error_message: error.message})
            }else{this.setState({error_message: null})}
        })
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.state.error_message !== null ? (
                        <FormError message={this.state.error_message} />
                    ) : null}
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                        className="form-control"
                        type="text"
                        required
                    />
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        required
                    />
                    <button className="btn btn-success" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login