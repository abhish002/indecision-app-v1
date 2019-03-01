import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(()=>({ options: [] }));
    };

    handleMakeDecision = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        //alert(option);
        this.setState(() => ({ selectedOption: option }));
    };

    handleOkClick = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    handleAddOptions = (option) => {
        console.log(option);
        if(!option){
            return 'Enter a valid value for your options.'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This Item already exists. Enter a valid and unique option.'
        }

        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    };

    handleDeleteOption = (option) => {
        console.log(`HDO: ${option}`);        
        this.setState((prevState) => ({ options: prevState.options.filter(value => (value !== option))}));
    };

    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
        
            if(options){
                this.setState(() => ({ options: options }));
            }
        }catch(e){
            // Do nothing
        }
                
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.options.length !== this.state.options.length){
          let options = JSON.stringify(this.state.options); 
          localStorage.setItem('options', options);
      }
    }

    render(){
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';        

        return (
            <div>                
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        handleMakeDecision = {this.handleMakeDecision}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions = {this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOptions = {this.handleAddOptions}
                        />
                    </div>
                    
                    <OptionModal 
                        selectedOption = {this.state.selectedOption}
                        handleOkClick = {this.handleOkClick}
                    />
                </div>                
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}