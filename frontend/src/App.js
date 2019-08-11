import React from 'react';
import ReactDOM from 'react-dom';
import AddContact from './addContact';
import ContactList from './contactList';
import {Container,Row,Col,Form, Button} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';

function App() {
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
  );
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
    <Button type="submit" size="lg" variant="primary" className="add-button" title="Add New Contact">
      <FaPlus/></Button>
    </Form>
    
  )}
}

export  default App;
