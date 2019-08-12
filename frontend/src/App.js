import React from 'react';
import ReactDOM from 'react-dom';
import AddContact from './addContact';
import ContactList from './contactList';
import {Container,Row,Col,Form, Button} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';
import { resolve } from 'q';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={loading:true}
  };

  componentDidMount(){
    callPageLoader().then(()=>{this.setState({loading:false})});
  };

  render(){
    const {loading}=this.state;
    if(loading){
      return null;
    }
  return (
  <Container fluid>
    <Row>
      <Col md={5} lg={5} xl={5}>
        <ContactList></ContactList>
  </Col> 
      <Col md={{span:7}} lg={{span:5,offset:2}} xl={{span:5,offset:2}}  id="target"><AddButton/>
      </Col>
      </Row>      
  </Container>
  )};
};

function callPageLoader(){
  return new Promise((resolve) => setTimeout(() => resolve(), 250));
}

class AddButton extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    ReactDOM.render(<AddContact/>,document.getElementById('target'));
    //document.getElementById("addBtn").style.display="none";
    event.preventDefault();
  }
  render(){
  return (
      <Form onSubmit={this.handleSubmit} id="addBtn">
    <Button type="submit" size="lg" variant="light" className="add-button" title="Add New Contact">
      <FaPlus/></Button>
    </Form>
    
  )}
};

export  default App;
