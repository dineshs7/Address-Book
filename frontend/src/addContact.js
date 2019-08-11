import React from 'react';
import axios from 'axios';
import {Card,Form,Button} from 'react-bootstrap';
import {FaCheck,FaTimes,FaUpload} from 'react-icons/fa'

function AddContact() {
    return (
    <div>
        <Card style={{ width: '450px' , height: 'auto',borderRadius:'6px'}} id="addCardId">
            <Card>
                <Card.Body>
                    <AddCardForm/>
                </Card.Body>
            </Card>
        </Card>
    </div>
    )
};

class AddCardForm extends React.Component {
    constructor(props){
        super(props);
        this.state={fields:{name:"",phno:"",email:""},errors:{name:"",phno:"",email:""},filePreview:null,fileToUpload:null};
        this.handleCancelAddContact=this.handleCancelAddContact.bind(this);
        this.handleSaveAddContact=this.handleSaveAddContact.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.uploadImage=this.uploadImage.bind(this)
    };

    handleCancelAddContact(event){
       // document.getElementById("addCardId").style.display="none";
       // document.getElementById("addBtn").style.display="block";
        //alert("clicked addcontact cancel");
        event.preventDefault();
        window.location.replace("/");
        //ReactDOM.render(<App/>,document.getElementById('root'));
    };

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
            if(event.target.value==='' || typeof event.target.value==='undefined')
            {
                fields[event.target.name]="";
            }
            else{
                fields[event.target.name]=event.target.value;
            }
            
        }
        
        this.setState({fields});
        event.preventDefault();
    };

    handleSaveAddContact(event){
        if(this.validateAddContactForm())
        {
            let fields=this.state.fields;
            const formData=new FormData();
            formData.append("file",this.state.fileToUpload);
            formData.append("name",fields["name"].toLowerCase().split(' ').map((s)=>s.charAt(0).toUpperCase()+s.substring(1)).join(' '));
            formData.append("phno",fields["phno"]);
            formData.append("email",fields["email"]);
            console.log("all fields:",this.state.fields,this.state.fileToUpload,formData.get("file"));
            /*axios.post('http://localhost:7000/api/addContact',{
                name:fields["name"],
                phno:fields["phno"],
                email:fields["email"],
                image:this.state.fileToUpload
            }); */

            axios.post('http://localhost:7000/addContact',formData,{
            }).then((res)=>{
                console.log(res.data);
                if(res.data.success)
                {
                    alert("Contact saved successfully");
                    window.location.replace("/");
                }
                else{
                    alert("You already have a contact with that name/phone number");
                    window.location.replace("/");
                }
            });
            //let fields={};
            fields["name"]="";
            fields["phno"]="";
            fields["email"]="";
            this.setState({fields:fields});
        }
        event.preventDefault();
    };

    validateAddContactForm(){
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
                fields["phno"]="";
            }
        }
        /*if(typeof fields["email"]!=="undefined")
        {
            if(!fields["email"].match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/))
            {
                formIsValid=false;
                errors["email"]="Please provide valid email id or leave it empty";
                fields["email"]="";
            }
        }*/
        this.setState({errors});
        return formIsValid;
    };

    uploadImage(event){
        this.setState({filePreview:URL.createObjectURL(event.target.files[0])},()=>
        {
            console.log("Selected File:",this.state.filePreview);
        });
        this.setState({fileToUpload:event.target.files[0]},()=>{
            console.log("File to upload:",this.state.fileToUpload);
        })
        /*let file=event.target.files[0];
        var reader= new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            this.setState({base64:reader.result},()=>{
                console.log("base64 image:",this.state.base64);
            });
        }*/
       /* axios.post('http://localhost:7000/api/uploadPhoto',formData,{}); */
        event.preventDefault();
    };

    render(){
    return (
    <Form onSubmit={this.handleSaveAddContact} onReset={this.handleCancelAddContact} noValidate encType="multipart/form-data" autoComplete="off">
        <Form.Group>
        <Card>
            <Card.Img variant="top" src={this.state.filePreview || "user.png"} className="avatar-background" alt="default image" title="Display Picture"/>
        </Card>
        </Form.Group>
       {/* <Card.ImgOverlay className="align-center text-center"> */}
        <Form.Group>
            <Form.Label className="btn btn-primary btn-block" htmlFor="upload" title="Choose Picture"> 
                <input id="upload" name="file" type="file" accept="image/*" className="d-none" onChange={this.uploadImage}/><FaUpload/>&nbsp;Choose Picture
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" className="styledControl" value={this.state.fields.name} id="name" name="name" onChange={this.handleChange} maxLength="25" title="Contact Name"/>
            <Form.Label className="error-label">{this.state.errors.name}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone Number" className="styledControl" value={this.state.fields.phno} id="phno" name="phno" onChange={this.handleChange} maxLength="10" title="Contact Number"/>
            <Form.Label className="error-label">{this.state.errors.phno}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" className="styledControl" value={this.state.fields.email} id="email" name="email" onChange={this.handleChange} title="Contact Email ID"/>
            <Form.Label className="error-label">{this.state.errors.email}</Form.Label>
        </Form.Group>
       <Button variant="primary" type="reset" style={{float:'left'}} title="Cancel Save"><FaTimes></FaTimes>&nbsp;Cancel</Button>
        <Button variant="primary" type="submit" style={{float:'right'}} title="Save Contact"><FaCheck></FaCheck>&nbsp;Save</Button> 
    </Form>
    )}
}

export default AddContact;
