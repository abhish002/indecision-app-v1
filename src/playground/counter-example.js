// let Person = {
   
// };

// function getLocation(location){
//     if (location){
//         return <p>Location: {getLocation(Person.location)}</p>;
//     }
// }

// let templateTwo = (
//     <div>
//         <h1>Name: {Person.name ? Person.name : 'Anonymous'}</h1>
//         {(Person.age && Person.age > 18) && <p>Age: {Person.age}</p>}
//         {Person.location ? <p>Location: {getLocation(Person.location)}</p> : null}        
//     </div>
// );

// let count = 0;

// const plusOne = () => {
//     count++;
//     console.log('plus-one');
//     renderCounterApp();
// }

// const minusOne = () => {
//     count--;
//     console.log('minus-one');
//     renderCounterApp();
// }

// const reset = () => {
//     count = 0;
//     console.log('reset');
//     renderCounterApp();
// }

// const renderCounterApp = () => {
//     let templateThree = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={plusOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );
    
//     ReactDOM.render(templateThree, document.getElementById('app'));
// }

// renderCounterApp();

class Counter extends React.Component{    
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        
        this.state = {            
            count: 0
        }
    }

    componentDidMount() {
        try{
            let count = parseInt(localStorage.getItem('count'), 10);
            if(!isNaN(count)){
                this.setState(() => ({ count }));
            }
        }catch(e){
            console.log(e);
        }        
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.count !== this.state.count){
          localStorage.setItem('count', this.state.count);
      }
    }
    

    handleAddOne(){
        console.log('+1');
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };            
        });
    }

    handleMinusOne(){
        console.log('-1');
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };            
        });
    }

    handleReset(){
        console.log('reset');
        this.setState((prevState) => {
            return {
                count: 0
            };            
        });
    }

    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter count={-10}/>, document.getElementById('app'));