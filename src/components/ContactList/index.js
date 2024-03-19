import { Component } from "react";

export class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdding: false,
            users: [],
            newUser: {
                firstName: '',
                lastName: '',
                phone: ''
            }
        }
        this.deleteContact = this.deleteContact.bind(this);
        this.showForm = this.showForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((data) => {
                this.setState({users: data})
            });
    }

    deleteContact(id) {
        let newUserList = this.state.users.filter((user) => user.id !== id);
        this.setState({users: newUserList});
    }

    showForm() {
        this.setState({isAdding: !this.state.isAdding});
    }

    handleInputChange(event) {
        const newUser = this.state.newUser;
        newUser[event.target.name] = event.target.value;
        this.setState({newUser: newUser});
    }

    addUser() {
        let users = this.state.users;
        let maxId = users.reduce(function (max, user) {
            return user.id > max ? user.id : max
        }, users[0].id);

        users.push({
            id: ++maxId,
            name: `${this.state.newUser.firstName} ${this.state.newUser.lastName}`,
            phone: this.state.newUser.phone
        });
        this.setState({
            users: users,
            newUser: {
                firstName: '',
                lastName: '',
                phone: ''
        }});
        this.showForm();
    }

    render() {
        return (
            <> 
                <div className={this.state.isAdding ? "App-hidden" : ''}>
                    <table className="App-table">
                        <tbody>
                            {this.state.users.map((user) => {
                                    let[firstName, lastName] = user.name.split(' ');
                                    return (
                                        <tr key={user.id}>
                                            <td className="App-td">{firstName}</td>
                                            <td className="App-td"><div>{lastName}</div></td>
                                            <td className="App-td"><div>{user.phone}</div></td>
                                            <td className="App-td">
                                                <div className="App-div">
                                                    <button onClick={() => this.deleteContact(user.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                } )
                            }

                        </tbody>
                    </table>
                    <div className="App-div">
                        <button onClick={this.showForm}>Add user</button>
                    </div>
                </div>
                <div className={!this.state.isAdding ? "App-hidden" : ''}>
                    <div className="App-div">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
                            name="firstName"
                            value={this.state.newUser.firstName}
                            onChange={this.handleInputChange}
                            placeholder="First Name"
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text"
                            name="lastName"
                            value={this.state.newUser.lastName}
                            onChange={this.handleInputChange}
                            placeholder="Last Name"
                        />

                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text"
                            name="phone"
                            value={this.state.newUser.phone}
                            onChange={this.handleInputChange}
                            placeholder="Phone"
                        />
                        <button className="App-div" onClick={this.addUser}>Add</button>
                        <button className="App-div" onClick={this.showForm}>Cansel</button>
                    </div>

                </div>
            </>
        );
    }
}