import React from 'react';

export default class AddOption extends React.Component{
    state = {
        error: undefined
    }

    handleAdd = (e) => {
        e.preventDefault();
        
        const option = e.target.elements.option.value.trim();        
        const error = this.props.handleAddOptions(option);
        
        if(!error){
            e.target.elements.option.value = '';
        }
        
        this.setState(() => ({ error }));
    };

    render(){
        return (
            <div>
            {
                this.state.error && <p className="add-option-error">{this.state.error}</p>
            }
                <form className="add-option" onSubmit={this.handleAdd}>
                    <input 
                        className={ this.state.error ? "add-option__input add-option__input-error" : "add-option__input" } 
                        type='text' name='option'
                    >
                    </input>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}