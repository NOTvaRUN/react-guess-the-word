import React from 'react';
class Main extends React.Component {
    state = {
        guessingWord : '',
        template: '',
        answer: '',
        exposedWords : [],
        setWords: [],
        iknowAnswer: '',
        guesses: 0,
        correctGuesses: 0,
        wrongGuesses: 0,
        guessesAre: []
    }
    render() { 
        return (<div>
            <div>
                { this.state.template }
            </div>
            <div>
                <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

                value={this.state.answer} name='answer' placeholder='guess letter' onKeyPress={(event) => {if (event.key === "Enter") {this.submitLetter()}}} onChange={ this.onChange }/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={this.submitLetter}>Submit</button>
            </div>
            <div>
                <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

                value={this.state.iknowAnswer} name='iknowAnswer' placeholder='submit answer' onKeyPress={(event) => {if (event.key === "Enter") {this.submitAnswer()}}} onChange={ this.onChangeForOthers }/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={this.submitAnswer}>Submit</button>
            </div>
            <div>
                <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

                value={this.state.guessingWord} name='guessingWord' placeholder='Enter the word' onKeyPress={(event) => {if (event.key === "Enter") {this.submitWord()}}} onChange={ this.onChangeForOthers }/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={this.submitWord}>Submit</button>
            </div>
            <div>
                <label>Total Guesses</label>
               <h1>{this.state.guesses}</h1>
               <label>{this.state.guessesAre.map(e=>{
                   return <span key={Math.random()}>{e}</span>
               })}</label>
            </div>
            <div>
                <label>Correct Guesses</label>
               <h1>{this.state.correctGuesses}</h1>
            </div>
            <div>
                <label>Wrong Guesses</label>
               <h1>{this.state.wrongGuesses}</h1>
            </div>
        </div>
        
        
        );
    }

    componentDidMount(){
      
    }
    submitWord = ()=>{
        let guesses = 0;
        let correctGuesses = 0;
        let wrongGuesses = 0;

        let setWords = this.state.guessingWord.split('');
        let exposedWords = new Array(setWords.length);
        exposedWords.fill(' ');

        let i = 0;
        for(let i = 0; i < setWords.length; i++){
            if(setWords[i] === ' '){
                setWords[i] = 'space';
                exposedWords[i] = 'space';
            }
        }

        const template = setWords.map(e => {
            if(e === ' ' || e === 'space'){
                return <div key={i++} className='inline-block w-8'></div>
            } else {
                return <div key={i++} className='inline-block bg-gray-300 w-8'>_</div>
            }
        })
        this.setState({ template, setWords, exposedWords , guesses, correctGuesses, wrongGuesses});
    }

    submitLetter = () => {
        let guesses = this.state.guesses;
        let guessesAre = this.state.guessesAre;
        guessesAre.push(this.state.answer);
        console.log(guessesAre)
        guesses++;
        this.calci();
        this.updateDom();

        let answer = '';
        this.setState({answer, guesses, guessesAre})
    }

    onChange = (e) => {
        var obj = {};
        let value = e.target.value;

        if (value.length <= 1) {
            obj[e.target.name] = e.target.value;
            this.setState(obj);
        }
    }

    onChangeForOthers = (e) => {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    calci = (e) =>{
        let currentWord = this.state.answer.toLowerCase();
        let setWords = this.state.setWords;
        let exposedWords = this.state.exposedWords;
        let right;
        for(let i = 0; i < exposedWords.length; i++){
            if(setWords[i].toLowerCase() === currentWord){
                exposedWords[i] = setWords[i];
                right = true;
            }
        }
        let correctGuesses = this.state.correctGuesses;
        let wrongGuesses = this.state.wrongGuesses;
        if(right){
            correctGuesses++
        } else {
            wrongGuesses++
        };

        this.setState({currentWord, setWords, exposedWords, correctGuesses, wrongGuesses})
    }

    updateDom = ()=>{
        let exposedWords = this.state.exposedWords;
        let i = 0;

        const template = exposedWords.map(e => {
            if(e === 'space'){
                return <div key={i++} className='inline-block w-8'></div>
            } else if(e === ' '){
                return <div key={i++} className='inline-block bg-gray-300 w-8'>_</div>
            } else {
                return <div key={i++} className='inline-block bg-gray-300 w-8'>{e}</div>
            }
        })
        this.setState({ template });
    }

    submitAnswer = ()=>{
        if(this.state.iknowAnswer.replace(' ', '').toLowerCase() === this.state.guessingWord.replace(' ', '').toLowerCase()){
            console.log('hooray you got it.');
        } else {
            alert('wrong answer');
        }
    }







}
 
export default Main;