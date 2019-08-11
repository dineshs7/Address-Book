import React from 'react';
import ReactDOM from 'react-dom';
import {Card,Button,Form} from 'react-bootstrap';
import {FaPen,FaTimes} from 'react-icons/fa';
import EditContact from './editContact';

class ViewContact extends React.Component {
    render() {
    return (
    <Card style={{ width: '450px' , height: 'auto',borderRadius:'6px'}} id="viewCardId">
        <Card.Body>
                <ViewCardForm phno={this.props.phno} email={this.props.email} name={this.props.name} image={this.props.image}/>
        </Card.Body>
    </Card>
    )}
};

class ViewCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={fileds:{name:this.props.name,phno:this.props.phno,email:this.props.email}};
        this.handleEdit=this.handleEdit.bind(this);
        this.handleEditCancel=this.handleEditCancel.bind(this);
    };

    handleEdit(event){
        ReactDOM.render(<EditContact name={this.state.fileds.name} phno={this.state.fileds.phno} email={this.state.fileds.email} image={this.props.image}/>,
            document.getElementById('target'));
        event.preventDefault();
    };

    handleEditCancel(event){
        window.location.replace("/");
        //ReactDOM.render(<App/>,document.getElementById('root'));
    };

    render(){
    return (
        <Form onSubmit={this.handleEdit} onReset={this.handleEditCancel}>
        <Form.Group>
        <Card>
            <Card.Img variant="top" src={this.props.image} className="avatar-background" alt="default image" title="Display Picture"/>
            <Card.ImgOverlay style={{color:'white'}}><span title="Contact Name">{this.state.fileds.name}</span></Card.ImgOverlay>
        </Card>
        </Form.Group>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control className="styledControl" value={this.state.fileds.name} plaintext="true" readOnly={true} title="Contact Name"/>
            <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control className="styledControl" value={this.state.fileds.phno} plaintext="true" readOnly={true} title="Contact Number"/>
            <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control className="styledControl" value={this.state.fileds.email} plaintext="true" readOnly={true} title="Contact Email ID"/>
            <Form.Label></Form.Label>
        </Form.Group>
        <Button variant="primary" type="reset" style={{float:'left'}} title="Close"><FaTimes></FaTimes>&nbsp;Cancel</Button>
        <Button variant="primary" type="submit" style={{float:'right'}} title="Edit Contact"><FaPen></FaPen>&nbsp;Edit</Button>
    </Form>  
    );}
}

export default ViewContact;