import React from 'react';
import axios from 'axios';
import {Card,Form,Button} from 'react-bootstrap';
import {FaCheck,FaTimes,FaUpload} from 'react-icons/fa'

class EditContact extends React.Component {
    render() {
    return (
        <Card style={{ width: '450px' , height: 'auto',borderRadius:'6px'}} id="editCardId">
        <Card.Body>
                <EditCardForm name={this.props.name} phno={this.props.phno} email={this.props.email} image={this.props.image}/>
        </Card.Body>
    </Card>
    )}
};

class EditCardForm extends React.Component {
    constructor(props){
        super(props);
        this.state={fileToUpdate:null,filePreview:null,
            fields:{name:this.props.name,phno:this.props.phno,email:this.props.email},
            errors:{name:"",phno:"",email:""}
        };
        this.handleCancel=this.handleCancel.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.updateImage=this.updateImage.bind(this);
        this.handleChange=this.handleChange.bind(this);
    };
    /*componentDidMount()
    {
        const {name,phno,email}=this.props;
        document.getElementById("name").value=name;
        document.getElementById("phno").value=phno;
        document.getElementById("email").value=email;
    } */
    handleChange(event){
        let fields=this.state.fields;
        const nameReg=/^[A-Za-z ]{1,25}$/;
        const phnoReg=/^[0-9]{1,10}$/;
        if(event.target.name==="name")
        {
            if(event.target.value==='' || nameReg.test(event.target.value))
            {
                fields[event.target.name]=event.target.value;
            }
        }
        if(event.target.name==="phno")
        {
            if(event.target.value==='' || phnoReg.test(event.target.value))
            {
                fields[event.target.name]=event.target.value;
            }
        }
        if(event.target.name==="email")
        {
            fields[event.target.name]=event.target.value;
        }
        
        this.setState({fields});
        event.preventDefault();
    };

    handleCancel(event){
        event.preventDefault();
        //document.getElementById("editCardId").style.display="none";
       window.location.replace("/");
        //ReactDOM.render(<App/>,document.getElementById('root'));
    };

    handleSave(event){
        event.preventDefault();
        //console.log("Display value:",this.props)
        if(this.validateEditContactForm())
        {
            console.log("Original Values:",this.props);
            console.log("Edited Values:",this.state.fields,this.state.fileToUpdate);
            let fields=this.state.fields;
            const fd=new FormData();
            fd.append("file",this.state.fileToUpdate);
            fd.append("name",fields["name"]);
            fd.append("phno",fields["phno"]);
            fd.append("email",fields["email"]);
            fd.append("previousName",this.props.name);
            fd.append("previousPhno",this.props.phno);
            fd.append("previousEmail",this.props.email);
            fd.append("previousImage",this.props.image);
            //console.log("update picture:",fd.get("file"));
            axios.post('http://localhost:7000/updateContact',fd,{})
            .then((res)=>{
                if(res.data.success)
                {
                    alert("Contact updated successfully");
                    window.location.replace("/");
                }
                else{
                    alert("Contact update failed");
                    window.location.replace("/");
                }
            })
        }
    };

    validateEditContactForm(){
        let fields=this.state.fields;
        let errors={};
        let formIsValid=true;
        if(!fields["name"])
        {
            formIsValid=false;
            errors["name"]="Please provide contact name";
        }
        if(!fields["phno"])
        {
            formIsValid=false;
            errors["phno"]="Please provide contact number";
        }
        if(typeof fields["phno"]!=="undefined")
        {
            if(!/^[0-9]{10}$/.test(fields["phno"]))
            {
                formIsValid=false;
                errors["phno"]="Please provide valid contact number";
                //fields["phno"]="";
            }
        }
        /*if(typeof fields["email"]!=="undefined")
        {
            if(!fields["email"].match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/))
            {
                formIsValid=false;
                errors["email"]="Please provide valid email id or leave it empty";
                //fields["email"]="";
            }
        }*/
        this.setState({errors});
        return formIsValid;
    };

    updateImage(event){
        this.setState({fileToUpdate:event.target.files[0]},()=>{
            console.log("File to update:",this.state.fileToUpdate);
        })
        this.setState({filePreview:URL.createObjectURL(event.target.files[0])},()=>{
            console.log("File to update preview:",this.state.filePreview);
            document.getElementById("image").src=this.state.filePreview;
        })
    };

    render(){
    return (
        <Form onSubmit={this.handleSave} onReset={this.handleCancel} noValidate encType="multipart/form-data" autoComplete="off">
            <Form.Group>
        <Card >
            <Card.Img variant="top" id="image" src= {this.props.image || "user1.png"} className="avatar-background" alt="default image" title="Display Picture"/>
        </Card>
        </Form.Group>
       {/* <Card.ImgOverlay className="align-center text-center"> */}
            <Form.Group>
               <Form.Label className="btn btn-primary btn-block button" htmlFor="update" title="Change Picture"> 
                    <Form.Control id="update" name="update" type="file" accept="image/*" className="d-none" onChange={this.updateImage}/><FaUpload/>&nbsp;Change Picture
                    </Form.Label>
            </Form.Group>
            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter Name" className="styled-control" value={this.state.fields.name}  onChange={this.handleChange} title="Contact Name" maxLength="25"/>
            <Form.Label className="error-label">{this.state.errors.name}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phno" placeholder="Enter Phone No" className="styled-control" value={this.state.fields.phno} onChange={this.handleChange} maxLength="10" title="Contact Number"/>
            <Form.Label className="error-label">{this.state.errors.phno}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" className="styled-control" value={this.state.fields.email} onChange={this.handleChange} title="Contact Email ID"/>
            <Form.Label className="error-label">{this.state.errors.email}</Form.Label>
        </Form.Group>
        <Button variant="primary" className="button" type="reset" style={{float:'left'}} title="Cancel Changes"><FaTimes></FaTimes>&nbsp;Cancel</Button> 
        <Button variant="primary" className="button" type="submit" style={{float:'right'}} title="Save Changes"><FaCheck></FaCheck>&nbsp;Save</Button> 
        
    </Form>
    )}
};

export default EditContact;