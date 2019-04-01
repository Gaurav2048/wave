import React, { Component } from 'react'

export default class Layout extends Component {
  render() {
    return (
      <div>
        Hader
        <div className="page_container">
          {this.props.children}
        </div>
        Footer
      </div>
    )
  }
}
