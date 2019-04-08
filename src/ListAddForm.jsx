import React, { Component, Fragment } from 'react';

export default class ListAddForm extends Component{

	state = {
		value: ''
	};

	handleChange = ({target:{value}}) => this.setState({ value });

	handleSave =	() => {
		if(this.state.value.trim().length)
		{
			this.props.saveList((new Date().getTime()), this.state.value);
			this.setState({ value: '' });
		}
	}

  render(){
		return (	
			<li className="list">
				<Fragment>
					<input 
						type="text"
						placeholder="Add a list..."
						className="list__field" 
						onChange={this.handleChange}
						value={this.state.value}
					/>
					<div className="list__buttons">
						<button 
							className="btn btn_green"
							onClick={ this.handleSave	}
						>
							Save
						</button>
					</div>
				</Fragment>
			</li> 
		) 	
  }
}