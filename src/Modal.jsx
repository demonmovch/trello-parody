import React, { Component } from 'react';
import {createPortal} from 'react-dom';

export default class Modal extends Component{

	handleModalRef = (node) => {
		this.props.handleModalRef(node);
	}

	render(){
		let modal = <div 
									className="modal-overlay" 
									onClick={(event) => this.props.onOverlayClick(event)}
								>
									<div className="modal" ref={this.handleModalRef}>
										<h6>
											{this.props.title}
										</h6>
										<button 
											className="modal__close"
											onClick={this.props.modalClose}
										>
											&times;
										</button>
									</div>
								</div>;
		return createPortal(modal,	document.getElementById('modal'));
	}
}