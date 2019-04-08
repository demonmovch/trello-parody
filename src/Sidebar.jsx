import React, { Component } from 'react';

export default class Sidebar extends Component{

	handleSidebarRef = (node) => {
		this.props.onRef(node);
	}

  render(){
  	let {showSidebar, onClick} = this.props;

		return (	
    	<aside 
    		className={showSidebar ? " visible" : ""}
    		ref={this.handleSidebarRef}
    	>
      <button
        className="btn btn_yellow"
        onClick={onClick}
      >
        Close
      </button>
    	</aside> 
		) 	
  }
}