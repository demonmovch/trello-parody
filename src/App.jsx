import React, { Component, Fragment } from 'react';
import List from './List.jsx';
import ListAddForm from './ListAddForm.jsx';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Modal from './Modal.jsx';

export default class App extends Component {
  state = {
  	sidebarVisible: false,
  	modalVisible: false,
  	modalTitle: '',
    lists: JSON.parse(localStorage.getItem('state')) || []
  }

	handleShowSidebar = () => {
		this.setState({ sidebarVisible: !this.state.sidebarVisible });
	}

	handleCloseSidebar = () => {
		this.setState({ sidebarVisible: !this.state.sidebarVisible });		
	}

	onMenuClick = ({target}) => {
		let {sidebarVisible} = this.state;
		if(target !== this.menu && target !== this.btn && sidebarVisible){
			this.handleShowSidebar();
		}
	}

	handleSidebarRef = (node) => {
    this.menu = node;
    if (node) {
      document.addEventListener('click', this.onMenuClick);
    } else {
      document.removeEventListener('click', this.onMenuClick);
    }		
	}

	handleBtnRef = (node) => {
		this.btn = node;
	}

	saveList = (id, title) => {
		this.setState(
			{ lists: [...this.state.lists, {id, title}] } 
		);
	};

	onClose = (id) => {
		this.setState(({lists}) => ({
			lists: lists.filter(list => list.id !== id)
		}));		
	};

  onDragStart = (e, index) => {
  	this.draggedItem = this.state.lists[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  onDragOver = index => {
    const draggedOverItem = this.state.lists[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let lists = this.state.lists.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    lists.splice(index, 0, this.draggedItem);
    this.setState({ lists });
  };

	onRename = (id, value) => {
		let lists = [...this.state.lists];
		lists.forEach((item) => { if(item.id === id) {item.title = value }});
		this.setState({ lists });
	};

	modalClose = () => {
    this.setState({ modalVisible: false });		
	};

	showModal = (title) => {
    this.setState({ modalVisible: true, modalTitle: title });		
	};

	onOverlayClick = (event) => {
		if(!this.modal.contains(event.target))
		{
			this.setState({ modalVisible: false });
		}
	};

	handleModalRef = (node) => {
		if(node){
			this.modal = node;
		}
	};

  render(){
  	let {sidebarVisible, lists, showHeadingRename} = this.state;
  	localStorage.setItem('state', JSON.stringify(this.state.lists));

    return (
      <Fragment>
      	<Header />
      	<section className="board">
      		<div className="board__heading">
      			<h2>
      				Test board
      			</h2>
	      		<button 
	      			className="btn btn_yellow"
	      			onClick={this.handleShowSidebar}
	      			ref={this.handleBtnRef}
	      		>
	      			Show menu
	      		</button>      			
      		</div>
      		<ul className="lists">
          { lists.map( (list, idx) => ( 
          	<List            		
          		key={list.id} 
          		onClose={this.onClose} 
          		id={list.id} 
          		title={list.title} 
          		onRename={this.onRename.bind(this, list.id)}
          		onDoubleClick={this.showModal}
          	/> 
            ) ) }
            <ListAddForm saveList={this.saveList} />
      		</ul>
          <Sidebar 
          	onRef={this.handleSidebarRef} 
          	showSidebar={sidebarVisible}
          	onClick={this.handleCloseSidebar}
          />
      	</section>
      	{
      		this.state.modalVisible &&
      		<Modal 
      			title={this.state.modalTitle}
      			modalClose={this.modalClose}
      			onOverlayClick={this.onOverlayClick}
      			handleModalRef={this.handleModalRef}
      		/>
      	}
      </Fragment>
    );
  }
}