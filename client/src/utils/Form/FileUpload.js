import React, { Component } from 'react'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Dropzone from 'react-dropzone'; 

 class FileUpload extends Component {

    constructor(){
       super(); 
        this.state ={
                uploadedFiles:[],
                uploading: false,

        }
    }

    drop = (files) =>{
        this.setState({uploading: true})
        let formdata = new FormData(); 
        const config ={
          header: {'Content-Type':'multipart/form-data'}
        }

        formdata.append("file", files[0]);
        axios.post('/api/users/uploadImage', formdata, config)
          .then(response => {
            console.log(response.data);
            
            this.setState({uploading: false,  uploadedFiles:[
                ...this.state.uploadedFiles,
                response.data
            ] }, ()=>{
              this.props.imageHandler(this.state.uploadedFiles)
            })
          }, (e)=>{
            console.log(e);
            
          })
    }
    static getDerivedStateFromProps(props, state){
      if(props.reset){
        return state = {
          uploadedFiles:[]
        }
      }
      return null;
    }
    onRemove =(id)=>{
        axios.get(`/api/users/removeImage?public_id=${id}`).then(response=>{
          let images = this.state.uploadedFiles.filter(item =>{
            return item.public_id !==id;
          });
          this.setState({uploadedFiles:images},()=>{
            this.props.imageHandler(images)
          })
        })

        
    }

    showUploadedImages(){
        this.state.uploadedFiles.map(item=>(
          <div className="dropzone_box" key ={item.public_id} onClick={()=>{this.onRemove(item.public_id)}}>
                  <div className="wrap" style={{background: `url(${item.url}) no-repeat`}}> 

                  </div>

          </div>
        ))
    }

  render() {
    return (
      <div>

             
                <div className="dropzone clear">
                <Dropzone onDrop={e => this.drop(e)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone> 

                </div>
         
<div className="wrap">
                {
  this.showUploadedImages()
}</div>
{
  this.state.uploading ?   <div  className="dropzone_box" style={{textAlign:'center', paddingTop:'60px'}}> <CircularProgress style={{color:'#00bcd4'}} thickness={7} />  </div>  : null
}
      </div>
    )
  }
}

export default FileUpload; 
