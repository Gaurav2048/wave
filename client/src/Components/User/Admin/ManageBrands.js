import React, { Component } from 'react'
import FormField from '../../../utils/Form/FormField';
import { Update ,generateData,isFormValid,resetField} from '../../../utils/Form/FormAction';

import { connect } from 'react-redux';
import { getBrands,addBrand } from '../../../actions/product_actions';


class ManageBrands extends Component {

    state = {
        fromError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Brand name',
                    name: 'Brand_input',
                    type: 'text',
                    placeholder: 'enter your Brand'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
    showCategoryItem = () => (
        this.props.products.brands ?
            this.props.products.brands.map(item => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )

    updateForm = (element) => {
        const newFormdata = Update(element, this.state.formdata,'brands');
        this.setState({formError: false, formdata: newFormdata})
        
    }

    componentDidMount() {
        this.props.dispatch(getBrands())
    }


submitForm =(event) =>{
    event.preventDefault(); 
    
    let dataToSubmit = generateData(this.state.formdata, 'brands'); 
    let   formIsValid = isFormValid(this.state.formdata, 'brands'); 
    
    if(formIsValid){     
        this.props.dispatch(addBrand(dataToSubmit, this.props.products.brands)).then( response => {
            if(response.payload.success){
                this.resetFieldsHndler()
            }else{
                this.setState({formError:true})
            }
        } )   
        console.log(dataToSubmit);
    }else {
        this.setState({formError: true})
    }
    
    }

    resetFieldsHndler =()=>{
        const newFormData = resetField(this.state.formdata); 
        this.setState({formSuccess: true, formdata: newFormData}); 
         
    }

    render() {
        return (
            <div className="admin_category_wrapper">

                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItem()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.onSubmit(event)}>
                            <FormField id={'name'} formdata={this.state.formdata.name} change={(element) => this.updateForm(element)} />
                            {this.state.formSuccess ? <div className="error_label">Item created</div> : ""}
                            {this.state.formError ? <div className="error_label">Please check your data</div> : ""}
                            <button onClick={(event) => this.submitForm(event)}>Create a Brand</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands); 
