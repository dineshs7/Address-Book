import React from 'react';
import ReactDOM from 'react-dom';
import ViewContact from './viewContact';
import {ListGroup,Image,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';


class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state={data:[],items:[],noResult:"",totalContacts:0,noContacts:""};
        this.searchHandler=this.searchHandler.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:7000/contactList')
          .then((res) => {res.data.data.sort(function(a,b){
              return (a.name>b.name)-(a.name<b.name)
          })
              this.setState({ data: res.data.data});
              this.setState({items:this.state.data});
              this.setState({totalContacts:res.data.data.length});
              if(this.state.data.length===0)
              {
                this.setState({noContacts:"No contacts to show"})
              }
          console.log("items:",this.state.items)})
      };
      searchHandler(event){
        var searchResult=this.state.data;
        //console.log("Search Result:",searchResult);
        searchResult=searchResult.filter(function(item){
            return item.name.toLowerCase().search(event.target.value.toLowerCase())!==-1;
        })
        if(searchResult.length===0)
        {
            this.setState({noResult:"No results found"})
        }
        else{
            this.setState({noResult:""})
        }
        this.setState({items:searchResult});
      }
    render() {
    return (
        <div style={{position:'relative'}}>
            <Form.Group as={Row}  id="search">
                <Col md={4}><span>Total: {this.state.totalContacts+" contacts"}</span></Col>
                <Col md={8}>
                    <Form.Control type="text" placeholder="Search Contact" className="styledControl" title="Search Contact" onChange={this.searchHandler}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col md={12} id="scrollable">
                <ListGroup variant="flush">{this.state.items.map((user,index)=>(
                <ListGroup.Item variant="primary" action className="borderless" key={index} onClick={(event)=>
                ReactDOM.render(<ViewContact name={user.name} phno={user.phno} email={user.email} image={user.image.replace('public/','http://localhost:7000/')}/>,document.getElementById('target'))}>
                <Image src={user.image.replace('public/','http://localhost:7000/')} alt="user" style={{borderRadius:'50%',width:'40px',height:'40px'}}></Image>
                <span>{user.name}</span></ListGroup.Item>))}
                </ListGroup>
                <span className="align-center text-center">{this.state.noResult}</span>
                <span className="align-center text-center">{this.state.noContacts}</span>
                </Col>
            </Form.Group>
        </div>
    );
  }
}
export default ContactList