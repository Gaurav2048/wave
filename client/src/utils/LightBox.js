import React, { Component } from 'react'
import LightBox from 'react-images';


class ImageLightBox extends Component {

    state = {
        LightBoxisOpen: true,
        currentImage: this.props.pos,
        images:[]
    }

    static DerivedStateFromProps(props,state){
        if(props.images){
                const images =[];
                props.images.forEach(element=>{
                    images.push({src:`${element}`})
                });
                return state = {images}
        }
        return false; 
    }

    closeLightBox = ()=>{
        this.props.onClose()    
    }

    goToPrev(){
        this.setState({
            currentImage: this.state.currentImage-1
        })
    }

    goToNext(){
        this.setState({
            currentImage: this.state.currentImage+1
        })
    }

  render() {
    return (
      <LightBox  currentImage={this.state.currentImage} images={this.state.images} isOpen={this.state.LightBoxisOpen} onClickPrev={()=>this.goToPrev()} onClickNext = {()=>this.goToNext()}  onCLose={()=>this.closeLightBox()} />
    )
  }
}

export default  ImageLightBox; 
