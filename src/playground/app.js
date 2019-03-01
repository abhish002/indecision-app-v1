class IndecisionApp extends React.Component{
    constructor(props){
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleMakeDecision = this.handleMakeDecision.bind(this);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options: props.options
        }
    }

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
    

    handleDeleteOptions(){
        this.setState(()=>({ options: [] }));
    }

    handleMakeDecision(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOptions(option){
        console.log(option);
        if(!option){
            return 'Enter a valid value for your options.'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This Item already exists. Enter a valid and unique option.'
        }

        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }

    handleDeleteOption(option){
        console.log(`HDO: ${option}`);        
        this.setState((prevState) => ({ options: prevState.options.filter(value => (value !== option))}));
    }

    render(){
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';        

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handleMakeDecision = {this.handleMakeDecision}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOptions = {this.handleAddOptions}
                />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
           <button disabled={!props.hasOptions} onClick={props.handleMakeDecision}>What should I do?</button>               
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
        {props.options.length === 0 && <p>Start adding your options :)</p>}
            {/* it is more costly to bind this here instead bind when initializing in constructor  */}
            <button onClick={props.handleDeleteOptions}>Delete All</button>               
            {
                props.options.map(option => (
                    <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />)) 
            }                
        </div>
    );
}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAdd(e){
        e.preventDefault();
        
        const option = e.target.elements.option.value.trim();        
        const error = this.props.handleAddOptions(option);
        
        if(!error){
            e.target.elements.option.value = '';
        }
        
        this.setState(() => ({ error }));
    }

    render(){
        return (
            <div>
            {
                this.state.error && <p>{this.state.error}</p>
            }
                <form onSubmit={this.handleAdd}>
                    <input type='text' name='option'></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

const Option = (props)=> {
    return (
        <div>
            <p>Option: {props.optionText}</p>
            <button 
                onClick={
                    () => { props.handleDeleteOption(props.optionText) }
                }
            >
            Delete
            </button>
        </div>
    );
}

IndecisionApp.defaultProps = {
    options: []
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));