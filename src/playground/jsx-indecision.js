console.log('App.js');

// JSX 
let App = {
    title: 'Indecision App',
    subtitle: 'A test app.',
    options: []
}

const formSubmitHandler = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option){
        App.options.push(option);
        e.target.elements.option.value = '';
    }
    renderApp();
}

const removeAll = () => {
    App.options = [];
    renderApp();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * App.options.length);
    const option = App.options[randomNum];
    alert(option);
}

const renderApp = () => {
    let template = (
        <div>
            <h1>{App.title}</h1>
            {App.subtitle && <p>{App.subtitle}</p>}
            <p>{App.options.length > 0 ? 'Here are your options' : 'No Items to display'}</p>
            <button disabled={App.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeAll}>Remove All</button>
            <form onSubmit={formSubmitHandler}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
            <ol>
            {
                App.options.map(option => <li key={option}>{option}</li>)
            }
            </ol>
        </div>
    );
    
    ReactDOM.render(template, document.getElementById('app'));
}

renderApp();