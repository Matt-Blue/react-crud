import React, {Component} from 'react'
import Firebase from '../../Firebase'
import FormError from '../Form/FormError'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_repeat: '',
            error_message: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        const tempName = e.target.name
        const tempValue = e.target.value
        this.setState({[tempName]: tempValue}, () => {
            if(this.state.password !== this.state.password_repeat){
                this.setState({error_message: 'Passwords do not match'})
            }else{ this.setState({error_message: null}) }
        })
    }
    handleSubmit(e){
        e.preventDefault()
        var user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        Firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then(() => {
            this.props.registerUser(user.name)
        }).catch(error => {
            if (error.message !== null){
                this.setState({error_message: error.message})
            }else{this.setState({error_message: null})}
        })
    }
    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.state.error_message !== null ? (
                        <FormError message={this.state.error_message} />
                    ) : null}
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Name"
                        className="form-control"
                        type="text"
                        required
                    />
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
                    <input
                        name="password_repeat"
                        value={this.state.password_repeat}
                        onChange={this.handleChange}
                        placeholder="Repeat Password"
                        className="form-control"
                        type="password"
                        required
                    />
                    <button className="btn btn-success" type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default Register