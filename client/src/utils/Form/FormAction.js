

export const Validate = (element, formData =[]) =>{

    let error = [true, ''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value); 
        const message = `${!valid? 'Must be a valid email' : ''}`; 
        error = !valid ? [valid, message] : error; 
    }

    if(element.validation.required){
            const valid = element.value.trim() !== ''; 
            const message = `${!valid? 'This field is required' : ''}`; 
            error = !valid ? [valid, message] : error; 
    }

    return error; 

}


export const Update = (element, formdata, fromName) =>{
    const newFormData = {
        ...formdata
    }

    const newElement = {
        ...newFormData[element.id]
    }

    newElement.value = element.event.target.value; 

    if(element.blur){
        let validData = Validate(newElement, formdata)
        newElement.valid = validData[0]; 
        newElement.validationMessage= validData[1];

    }

    newElement.touched = element.blur; 
    newFormData[element.id] = newElement; 

    return newFormData; 
     

}