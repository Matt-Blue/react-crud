import React, {Component} from 'react'
import firebase from '../../Firebase'
import Item from './Item'
const uuidv4 = require('uuid/v4')

class Items extends Component{
    constructor(props){
        super(props)
        this.state={
            permissions: 'guest',
            title: '',
            description: '',
            price: 0,
            image: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.fileSelect = this.fileSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                if(user.email === 'dev@dev.com'){
                    this.setState({permissions: 'admin'})
                }else{
                    this.setState({permissions: 'user'})
                }
            }
        })
    }
    handleChange(e){
        const tempName = e.target.name
        const tempValue = e.target.value
        this.setState({[tempName]: tempValue})
    }
    fileSelect(e){
        if(e.target.files[0]){
            const image = e.target.files[0]
            this.setState({
                image: image
            })
        }
    }
    handleSubmit(e){
        e.preventDefault()
        // image upload
        const image = this.state.image
        const uuid = uuidv4()
        var uploadTask = firebase.storage().ref().child(`/items/${uuid}`)
        uploadTask.put(image).then((snapshot) => {
            // pass item to parent & clear state
            var item = {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                timestamp: Date.now(),
                image: uuid,
            }
            this.props.addItem(item)
            this.setState({
                title: '',
                description: '',
                price: 0,
                image: null,
            })
        })
    }
    render(){
        if(this.state.permissions === 'admin'){
            return(
                <div>
                    <div className="title">Items Page [admin]</div>
                    <div className="row">
                        <div className="col-sm section">
                            Add Item<br/>
                            <form className="formgroup" onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    max="2500"
                                    className="form-control"
                                    name="price"
                                    placeholder="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={this.fileSelect}
                                    required
                                /><br/>
                                <button 
                                    type="submit"
                                    className="btn btn-success col-sm"
                                    id="addItem"
                                >Add Item</button>
                            </form>
                        </div>
                    </div>
                    <div className="title">Items</div>
                    <div className="row">
                        {
                            this.props.items.map((item, index) => {
                                const image = firebase.storage().ref().child(`/items/${item.image}`)
                                image.getDownloadURL().then((url) => {
                                    this.setState({
                                        image: url
                                    })
                                })
                                // TODO pagination
                                // column={index % 4}
                                return(
                                    <Item
                                        key={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        timestamp={item.timestamp}
                                        image={item.image}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            )
        }else if(this.state.permissions === 'user'){
            return(
                <div>
                    Items Page [user]<br/>
                </div>
            )
        }else{
            return(
                <div>
                    Items Page [logged out]<br/>
                </div>
            )
        }
    }
}

export default Items