import React, { Component } from 'react'


import FormField from '../../../utils/Form/FormField'; 
import {Update, generateData ,isFormValid,resetField} from '../../../utils/Form/FormAction'; 

import UserLayout from './../../../HOC/User';
import {populateoptionFileds} from '../../../utils/Form/FormAction';
import {connect} from 'react-redux';
import {getBrands,getWoods, addProduct, clearProduct } from '../../../actions/product_actions';

class AddProduct extends Component {


  state = {
    fromError: false,
    formSuccess: false,
    formdata:{
        name:{
          element: 'input',
          value:'',
          config:{
            label:'Product name',
            name:'name_input',
            type:'text',
            placeholder: 'enter your name'
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        description:{
          element: 'textarea',
          value:'',
          config:{
            label:'Product description',
            name:'description_input',
            type:'text',
            placeholder: 'enter your description'
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        price:{
          element: 'input',
          value:'',
          config:{
            label:'Product price',
            name:'price_input',
            type:'number',
            placeholder: 'enter your name'
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        brand:{
          element: 'select',
          value:'',
          config:{
            label:'Product brand',
            name:'brand_input',
            options:[]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        shipping:{
          element: 'select',
          value:'',
          config:{
            label:'Product shipping',
            name:'shipping_input',
           options:[
             {key:true, value: 'yes'},
             {key:false, value: 'No'}
           ]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        available:{
          element: 'select',
          value:'',
          config:{
            label:'Available in stock',
            name:'available_input',
           options:[
             {key:true, value: 'yes'},
             {key:false, value: 'No'}
           ]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        wood:{
          element: 'select',
          value:'',
          config:{
            label:'Wood material',
            name:'shipping_input',
           options:[
             {key:true, value: 'yes'},
             {key:false, value: 'No'}
           ]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        frets:{
          element: 'select',
          value:'',
          config:{
            label:'Frets',
            name:'frets_input',
           options:[
             {key:22, value: '22'},
             {key:21, value: '21'},
             {key:23, value: '23'},
             {key:24, value: '24'},
             {key:20, value: '20'}
           ]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        },
        publish:{
          element: 'select',
          value:'',
          config:{
            label:'Publish',
            name:'publish_input',
           options:[
             {key:true, value: 'Public'},
             {key:false, value: 'Hidden'}
           ]
          },
          validation:{
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel:true
        }
    }
  }

  updateFields(formData) {
    this.setState({
      formdata: formData
    })
  }

  componentDidMount(){
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(response=>{
      const newFormData = populateoptionFileds(formdata, this.props.products.brands,'brand');
      this.updateFields( newFormData);
    })

    this.props.dispatch(getWoods()).then(response=>{
      const newFormData = populateoptionFileds(formdata, this.props.products.woods,'wood');
      this.updateFields( newFormData);
    })

  }

  updateForm = (element) => {
    const newFormdata = Update(element, this.state.formdata,'products');
    this.setState({formError: false, formdata: newFormdata})
    
}

resetFieldsHnadler=()=>{
  const newFormData = resetField(this.state.formdata); 
  this.setState({formSuccess: true, formdata: newFormData}); 
  setTimeout(()=>{
    this.setState({formSuccess: false}, () =>{
      this.props.dispatch(clearProduct())
    })
  }, 3000 )
}

submitForm =(event) =>{
event.preventDefault(); 

let dataToSubmit = generateData(this.state.formdata, 'products'); 


let   formIsValid = isFormValid(this.state.formdata, 'products'); 

if(formIsValid){

     this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
       if(this.props.products.product.success){
          this.resetFieldsHnadler(); 
       }else {
          this.setState({formError: true})
       }
     })
    console.log(dataToSubmit);
}else {
    this.setState({formError: true})
}

}
  

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
            <form onSubmit={(event) =>this.submitForm(event)}>

              <div>Image</div>
              
              <FormField  id={'name'} formdata = {this.state.formdata.name} change={(element)=>this.updateForm(element)} />
              <FormField  id={'description'} formdata = {this.state.formdata.description} change={(element)=>this.updateForm(element)} />
              <FormField  id={'price'} formdata = {this.state.formdata.price} change={(element)=>this.updateForm(element)} />
            
            <div className="form_devider"></div>

            <FormField  id={'brand'} formdata = {this.state.formdata.brand} change={(element)=>this.updateForm(element)} />
            <FormField  id={'shipping'} formdata = {this.state.formdata.shipping} change={(element)=>this.updateForm(element)} />
            <FormField  id={'available'} formdata = {this.state.formdata.available} change={(element)=>this.updateForm(element)} />
            
            <div className="form_devider"></div>
          
            <FormField  id={'wood'} formdata = {this.state.formdata.wood} change={(element)=>this.updateForm(element)} />
            <FormField  id={'frets'} formdata = {this.state.formdata.frets} change={(element)=>this.updateForm(element)} />

            <FormField  id={'publish'} formdata = {this.state.formdata.publish} change={(element)=>this.updateForm(element)} />
           
            {this.state.formSuccess ? <div className="error_label">Item created</div>:""}
            {this.state.formError ? <div className="error_label">Please check your data</div>:""}
            <button onClick={(event)=> this.submitForm(event)}>Create a product</button>
            </form>
      </div>  
      </UserLayout>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct); 
