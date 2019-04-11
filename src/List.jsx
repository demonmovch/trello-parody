import React, { Component, Fragment } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class List extends Component{

	state={
		textarea: '',
		rename: '',
		showForm: false,
		showHeadingRename: false,
		cards: []
	}

	handleChange = ({target:{value, name}}) => this.setState({ [name]: value });

	onClose = () => {
		event.preventDefault();
		this.props.onClose(this.props.id)		
	}

	onAdd = () => {this.setState({ showForm: true }); };

	onFormClose = () => this.setState({ showForm: false, textarea: '' });

	handleCardSave = () => {
		if(this.state.textarea.trim().length)
		{
		this.setState({ 
			cards: [
				...this.state.cards, 
				{id: new Date().getTime(), title: this.state.textarea }
			],
			showForm: false
		});
		this.setState({ textarea: '' });	
		}	
	}

	handleTextareaRef = (node) => {
		if(node)
		{
			this.textarea = node;
			this.textarea.focus();
		}
	}

	addButton = () => (
		<button 
			className="btn btn_gray"
			onClick={this.onAdd}
		>
			Add a card...
		</button>
	);

	form = () => (
		<Fragment>
			<textarea 
				className="list__field" 
				name="textarea"
				onChange={this.handleChange}
				value={this.state.textarea}
				ref={this.handleTextareaRef}
			/>
			<div className="list__buttons">
				<button 
					className="btn btn_green"
					onClick={ this.handleCardSave	}
				>
					Save
				</button>
				<a 
					href="#" 
					className="list__form-close"
					onClick={this.onFormClose}
				>
					&times;
				</a>
			</div>
		</Fragment>
	);

  onDragStart = (e, index) => {
  	this.draggedItem = this.state.cards[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  onDragOver = index => {
    const draggedOverItem = this.state.cards[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let cards = this.state.cards.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    cards.splice(index, 0, this.draggedItem);
    this.setState({ cards });
  };

  onDoubleClick = () => {
  	this.setState({showHeadingRename: true});
  }

  onRename = () => {
  	if(this.state.rename.trim().length){
  		this.props.onRename(this.state.rename);
  		this.setState({
  			rename: '',
  			showHeadingRename: false});
  	}
  }

  render(){
 		let {title} = this.props;
 		let {cards, showForm, showHeadingRename} = this.state;
	
		return (	
			<li 
				className="list"
			>
				{!showHeadingRename &&
					<h4 
						onDoubleClick={this.onDoubleClick}
					>
						{title}
					</h4>
				}
				{
					showHeadingRename && 
					<div>
						<input 
							className="list__heading-rename"
							name="rename"
							onChange={this.handleChange}
							value={this.state.rename}
						/>
						<button
							className="btn btn_green"
							onClick={this.onRename}
						>
							Rename
						</button>
					</div>
				}
				<a
					href="#"
					className="list__close"
					onClick={this.onClose}
				>
					&times;
				</a>
				<ul className="cards">
					{ 
						cards.map( (card, idx) => (
						<li 
							key={card.id}
							draggable
							onDragStart={e => this.onDragStart(e, idx)}
							onDragEnd={this.onDragEnd}
							onDragOver={() => this.onDragOver(idx)}
							onDoubleClick={() => this.props.onDoubleClick(card.title)}
						>
							{card.title} 
						</li>
						) ) 
					}
				</ul>
				{showForm ? this.form() : this.addButton()}
			</li> 
		) 	
  }
}