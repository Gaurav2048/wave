import React, { Component } from 'react'
import FormField from '../../utils/Form/FormField'; 
import {Update, generateData ,isFormValid} from '../../utils/Form/FormAction'; 
import {connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { registerUser} from '../../actions/user_action';


class Register extends Component {
    state ={
        formError: false, 
        formSuccess: false,
        formdata: {
            name:{
                element: 'input',
                value:'',
                config:{
                    name:'name_input',
                    type:"text",
                    placeholder:'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false, 
                validationMessage: ''
            },
            lastname:{
                element: 'input',
                value:'',
                config:{
                    name:'last_name_input',
                    type:"text",
                    placeholder:'Enter your last_name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false, 
                validationMessage: ''
            },
            password:{
                element: 'input',
                value:'',
                config:{
                    name:'password_input',
                    type:"text",
                    placeholder:'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false, 
                validationMessage: ''
            },
            email:{
                element: 'input',
                value:'',
                config:{
                    name:'email_input',
                    type:"email",
                    placeholder:'Enter your email'
                },
                validation: {
                    required: true, 
                    email:true
                },
                valid: false,
                touched: false, 
                validationMessage: ''
            },
            cnfirmPassword:{
                element: 'input',
                value:'',
                config:{
                    name:'cnfirmPassword_input',
                    type:"text",
                    placeholder:'Enter your cnfirmPassword'
                },
                validation: {
                    required: true,
                    confirm:'password'
                },
                valid: false,
                touched: false, 
                validationMessage: ''
            },
        }
    }

    updateForm = (element) => {
        const newFormdata = Update(element, this.state.formdata,'register');
            this.setState({formError: false, formdata: newFormdata})
    }

    submitForm =(event) =>{
        event.preventDefault(); 

        let dataToSubmit = generateData(this.state.formdata, 'register'); 
       

        let   formIsValid = isFormValid(this.state.formData, 'register'); 

        if(formIsValid){

            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                if(response.payload.success){
                        this.setState({formError: false, formSuccess: true}); 
                        setTimeout(()=>{
                                this.props.history.push("/register_login"); 
                        }, 3000); 
                }else {
                    this.setState({formError: true})
                }
            }).catch(e=>{
                this.setState({formError: true})
            })
            
            console.log(dataToSubmit);
        }else {
            this.setState({formError: true})
        }

    }


  render() {
    return (
      <div className="page_wrapper" >
            <div className="container">
                    <div className="register_login_container">
                            <div className="left">
                                        <form onSubmit={(event) => this.submitForm(event)}>
                                                <h2>Personal Information</h2>
                                                <div className="form_block_two">
                                                    <div className="block">
                                                    <FormField  id={'name'}  formdata = {this.state.formdata.name} change ={(element) => this.updateForm(element)}/>
                                                    </div>

                                                    <div className="block">
                                                    <FormField  id={'lastname'}  formdata = {this.state.formdata.lastname} change ={(element) => this.updateForm(element)}/>
                                                    </div>
                                                </div>

                                                <div>
                                                <FormField  id={'email'}  formdata = {this.state.formdata.email} change ={(element) => this.updateForm(element)}/>
                                                </div>  

                                                <h2>VERIFY PASSWORD</h2>
                                                <div className="form_block_two">
                                                <div className="block">
                                                    <FormField  id={'password'}  formdata = {this.state.formdata.password} change ={(element) => this.updateForm(element)}/>
                                                    </div>

                                                    <div className="block">
                                                    <FormField  id={'cnfirmPassword'}  formdata = {this.state.formdata.cnfirmPassword} change ={(element) => this.updateForm(element)}/>
                                                    </div>
                                                </div>

                                                <button onClick={(event)=> this.submitForm(event)}>REGISTER</button>
                                        </form> 
                            </div>
                    </div>
            </div>
            <Dialog open = {this.state.formSuccess}>
                <div className="dialog_alert">
                        <div>Congratulations !!</div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, iste!</p>
                      </div>
            </Dialog>
      </div>
    )
  }
}


export default   connect()(Register); 