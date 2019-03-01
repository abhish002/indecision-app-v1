// let content = null;
// let visibilityText = 'Show Details';

// const visibilityToggle = () => {
//     if(!content){
//         content = <p>some content</p>
//         visibilityText = 'Hide details';
//     }else{
//         content = null;
//         visibilityText = 'Show Details';   
//     }
//     render();
// }

// const render = () => {
//     let template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={visibilityToggle}>{visibilityText}</button>
//             {content}
//         </div>
//     );
    
//     ReactDOM.render(template, document.getElementById('app'));
// }

// render();

class Visibility extends React.Component{
    constructor(props){
        super(props);
        this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
        this.state = {
            visibility: false
        }
    }

    handleVisibilityToggle(){
        this.setState(prevState => {
            return ({
                visibility: !prevState.visibility
            });
        });
    }

    render(){
        return (
            <div>
                <h1>Visibilty Toggle</h1>
                <button onClick={this.handleVisibilityToggle}>{this.state.visibility ? 'Hide Details' : 'Show Details' }</button>
                {
                    this.state.visibility && 
                    <p>Some Content</p>
                }
            </div>
        );
    }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));