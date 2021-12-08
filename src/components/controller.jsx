import React from 'react';
class Controller extends React.Component {
    state={
        guessingWord: ''
    }
    render() { 
        return (
        <div>
            <div>
                <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    value={this.state.guessingWord} name='guessingWord' placeholder='Enter the word' onKeyPress={(event) => {if (event.key === "Enter") {this.submitWord()}}} onChange={ this.onChangeForOthers }/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4' onClick={this.submitWord}>Submit</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4' onClick={this.clearWord}>Clear</button>
            </div>
            <label> { this.state.guessingWord }</label>
        </div>);
    }

    
    submitWord = ()=>{
        let guessingWord = this.state.guessingWord;
        if(!guessingWord){ return; }
        localStorage.removeItem('guessingWord');
        localStorage.setItem('guessingWord', guessingWord);
        alert('saved');
        this.setState({ guessingWord });
    }

    onChangeForOthers = (e) => {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    clearWord = () => {
        let guessingWord = '';
        localStorage.removeItem('guessingWord');
        this.setState({ guessingWord })
    }

}
 
export default Controller;