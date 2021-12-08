import React from 'react';
import Confetti from 'react-confetti'

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
        guessesAre: [],
        height: window.innerHeight,
        width: window.innerwidth,
        confetti: false,
        wrongHa: false
    }
    render() { 
        return (<div className='contain-vh'>
            {this.state.confetti ? <Confetti
                width={this.state.width}
                height={this.state.width}
                />: ''}

            <div className='contain'>

                { this.state.template }
                <div className='enter-info'>
                    <div>
                        <div>
                            <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            autoComplete='off'
                                value={this.state.answer} name='answer' placeholder='guess letter &amp; enter' onKeyPress={(event) => {if (event.key === "Enter") {this.submitLetter()}}} onChange={ this.onChange }/>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={this.submitLetter}>Submit</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'  onClick={this.Clear}>Clear</button>
                        </div>
                        <div>
                            <label>{this.state.guessesAre.map(e=>{
                                return <span className='guessed-wordd' key={Math.random()}>{e.toUpperCase()}</span>})}
                            </label>
                        </div>
                    </div>
                    <div>
                        <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        autoComplete='off'
                        value={this.state.iknowAnswer} name='iknowAnswer' placeholder='submit answer &amp; enter' onKeyPress={(event) => {if (event.key === "Enter") {this.submitAnswer()}}} onChange={ this.onChangeForOthers }/>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={this.submitAnswer}>Submit</button>
                    </div>
                </div>
                <div className='guess-info'>
                    <div>
                        <label>Total Guesses</label>
                        <h1>{this.state.guesses}</h1>
                    </div>
                    <div>
                        <label className='bg-green-500'>Correct Guesses</label>
                        <h1 className='text-green-500 bg-black'>{this.state.correctGuesses}</h1>
                    </div>
                    <div>
                        <label className='bg-red-500'>Wrong Guesses</label>
                        <h1 className='text-red-500 bg-black'>{this.state.wrongGuesses}</h1>
                    </div>
                </div>
            </div>
            {this.state.wrongHa ? 
            <div className='wrong-ha-div'>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="249" viewBox="0 0 200 249" fill="none">
                    <rect x="43.6858" y="0.171417" width="268" height="49" transform="rotate(55.1709 43.6858 0.171417)" fill="#FF6060"/>
                    <rect x="0.907955" y="217.518" width="268" height="49" transform="rotate(-53.6244 0.907955 217.518)" fill="#FF6060"/>
                </svg>
            </div>
            : ''
            }
        </div>
        
        
        );
    }

//     <div>
//     <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

//     value={this.state.answer} name='answer' placeholder='guess letter' onKeyPress={(event) => {if (event.key === "Enter") {this.submitLetter()}}} onChange={ this.onChange }/>
//     <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={this.submitLetter}>Submit</button>
// </div>
// <div>
//     <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

//     value={this.state.iknowAnswer} name='iknowAnswer' placeholder='submit answer' onKeyPress={(event) => {if (event.key === "Enter") {this.submitAnswer()}}} onChange={ this.onChangeForOthers }/>
//     <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={this.submitAnswer}>Submit</button>
// </div>
// <div>
//     <input type="text" className='shadow appearance-none border rounded w-26 m-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 

//     value={this.state.guessingWord} name='guessingWord' placeholder='Enter the word' onKeyPress={(event) => {if (event.key === "Enter") {this.submitWord()}}} onChange={ this.onChangeForOthers }/>
//     <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={this.submitWord}>Submit</button>
// </div>
// <div>
//     <label>Total Guesses</label>
//    <h1>{this.state.guesses}</h1>
//    <label>{this.state.guessesAre.map(e=>{
//        return <span key={Math.random()}>{e}</span>
//    })}</label>
// </div>
// <div>
//     <label>Correct Guesses</label>
//    <h1>{this.state.correctGuesses}</h1>
// </div>
// <div>
//     <label>Wrong Guesses</label>
//    <h1>{this.state.wrongGuesses}</h1>
// </div>

    componentDidMount(){
        window.addEventListener('storage', (e) => {
            if(e.newValue){
                const guessingWord = e.newValue;
                this.setState({ guessingWord })
                this.submitWord();
            }
        });
    }

    componentWillUnmount(){
        window.removeEventListener('storage', ()=>{console.log('removed')})
    }

    Clear = ()=>{
        let guessesAre = [];
        this.submitWord();
        this.setState({guessesAre})
    }

    submitWord = ()=>{
        let guesses = 0;
        let correctGuesses = 0;
        let wrongGuesses = 0;

        let setWords = this.state.guessingWord.split('');
        let exposedWords = new Array(setWords.length);
        let guessesAre = [];
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
                return <div key={i++} className='inline-block white-spaces w-8'></div>
            } else {
                return <div key={i++} className='inline-block bg-gray-300 tb-guessed w-8'>
                    {this.returnSVG()}
                </div>
            }
        })
        this.setState({ template, setWords, exposedWords , guesses, correctGuesses, wrongGuesses, guessesAre});
    }

    submitLetter = () => {
        if(this.state.guessesAre.includes(this.state.answer)){
            alert('Already Guessed');
            let answer = '';
            this.setState({answer});
            return;
        }
        let guesses = this.state.guesses;
        let guessesAre = this.state.guessesAre;
        guessesAre.push(this.state.answer);
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
        let confetti = this.state.confetti;
        let wrongHa = this.state.wrongHa;
        if(right){
            confetti = true;
            setTimeout(()=>{
                confetti = false;
                this.setState({confetti})
            }, 5000)
            correctGuesses++
        } else {
            wrongHa = true;
            setTimeout(()=>{
                wrongHa = false;
                this.setState({wrongHa})
            }, 1000)
            wrongGuesses++
        };

        this.setState({currentWord, setWords, exposedWords, correctGuesses, wrongGuesses, confetti, wrongHa})
    }

    updateDom = ()=>{
        let exposedWords = this.state.exposedWords;
        let i = 0;

        const template = exposedWords.map(e => {
            if(e === 'space'){
                return <div key={i++} className='inline-block white-spaces w-8'></div>
            } else if(e === ' '){
                return <div key={i++} className='inline-block bg-gray-300 tb-guessed w-8'>
                        {this.returnSVG()}
                    </div>
            } else {
                return <div key={i++} className='inline-block bg-gray-300 guessed w-8'>
                    <h1 className='guessed-char'>{e.toUpperCase()}</h1>
                    </div>
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


    returnSVG= ()=>{
        return <svg xmlns="http://www.w3.org/2000/svg" width="55" height="70" viewBox="0 0 55 70" fill="none">
        <g filter="url(#filter0_f_102_135)">
        <g filter="url(#filter1_b_102_135)">
        <rect x="1" y="1" width="53" height="67" rx="4" fill="#839EFF"/>
        </g>
        <path d="M14.5 14L16.1839 19.1824H21.6329L17.2245 22.3853L18.9084 27.5676L14.5 24.3647L10.0916 27.5676L11.7755 22.3853L7.36708 19.1824H12.8161L14.5 14Z" fill="#FFF500"/>
        <path d="M14.5 14L16.1839 19.1824H21.6329L17.2245 22.3853L18.9084 27.5676L14.5 24.3647L10.0916 27.5676L11.7755 22.3853L7.36708 19.1824H12.8161L14.5 14Z" fill="#FFF500"/>
        <path d="M14.5 14L16.1839 19.1824H21.6329L17.2245 22.3853L18.9084 27.5676L14.5 24.3647L10.0916 27.5676L11.7755 22.3853L7.36708 19.1824H12.8161L14.5 14Z" fill="#FFF500"/>
        <path d="M4.5 1L6.18386 3.18237H11.6329L7.22454 6.38525L8.90839 11.5676L4.5 8.36475L1 10.5L1.77547 6.38525L1 4L2.81615 3.18237L4.5 1Z" fill="#FFF500"/>
        <path d="M4.5 1L6.18386 3.18237H11.6329L7.22454 6.38525L8.90839 11.5676L4.5 8.36475L1 10.5L1.77547 6.38525L1 4L2.81615 3.18237L4.5 1Z" fill="#FFF500"/>
        <path d="M4.5 1L6.18386 3.18237H11.6329L7.22454 6.38525L8.90839 11.5676L4.5 8.36475L1 10.5L1.77547 6.38525L1 4L2.81615 3.18237L4.5 1Z" fill="#FFF500"/>
        <path d="M50.5 1L52.1839 3.18237L54 3.5L53.2245 6.38525L54 9.5L50.5 8.36475L46.0916 11.5676L47.7755 6.38525L43.3671 3.18237H48.8161L50.5 1Z" fill="#FFF500"/>
        <path d="M50.5 1L52.1839 3.18237L54 3.5L53.2245 6.38525L54 9.5L50.5 8.36475L46.0916 11.5676L47.7755 6.38525L43.3671 3.18237H48.8161L50.5 1Z" fill="#FFF500"/>
        <path d="M50.5 1L52.1839 3.18237L54 3.5L53.2245 6.38525L54 9.5L50.5 8.36475L46.0916 11.5676L47.7755 6.38525L43.3671 3.18237H48.8161L50.5 1Z" fill="#FFF500"/>
        <path d="M27 24L27.6616 25.618L28.7321 27L27 26.7639L25.2679 27L26.3384 25.618L27 24Z" fill="#FFF500"/>
        <path d="M27 24L27.6616 25.618L28.7321 27L27 26.7639L25.2679 27L26.3384 25.618L27 24Z" fill="#FFF500"/>
        <path d="M27 24L27.6616 25.618L28.7321 27L27 26.7639L25.2679 27L26.3384 25.618L27 24Z" fill="#FFF500"/>
        <path d="M27 42L27.6616 43.618L28.7321 45L27 44.7639L25.2679 45L26.3384 43.618L27 42Z" fill="#FFF500"/>
        <path d="M27 42L27.6616 43.618L28.7321 45L27 44.7639L25.2679 45L26.3384 43.618L27 42Z" fill="#FFF500"/>
        <path d="M27 42L27.6616 43.618L28.7321 45L27 44.7639L25.2679 45L26.3384 43.618L27 42Z" fill="#FFF500"/>
        <path d="M38 29L38.6616 30.618L39.7321 32L38 31.7639L36.2679 32L37.3384 30.618L38 29Z" fill="#FFF500"/>
        <path d="M38 29L38.6616 30.618L39.7321 32L38 31.7639L36.2679 32L37.3384 30.618L38 29Z" fill="#FFF500"/>
        <path d="M38 29L38.6616 30.618L39.7321 32L38 31.7639L36.2679 32L37.3384 30.618L38 29Z" fill="#FFF500"/>
        <path d="M7 51L7.66158 52.618L8.73205 54L7 53.7639L5.26795 54L6.33842 52.618L7 51Z" fill="#FFF500"/>
        <path d="M7 51L7.66158 52.618L8.73205 54L7 53.7639L5.26795 54L6.33842 52.618L7 51Z" fill="#FFF500"/>
        <path d="M7 51L7.66158 52.618L8.73205 54L7 53.7639L5.26795 54L6.33842 52.618L7 51Z" fill="#FFF500"/>
        <path d="M48 12L48.6616 13.618L49.7321 15L48 14.7639L46.2679 15L47.3384 13.618L48 12Z" fill="#FFF500"/>
        <path d="M48 12L48.6616 13.618L49.7321 15L48 14.7639L46.2679 15L47.3384 13.618L48 12Z" fill="#FFF500"/>
        <path d="M48 12L48.6616 13.618L49.7321 15L48 14.7639L46.2679 15L47.3384 13.618L48 12Z" fill="#FFF500"/>
        <path d="M36 4L36.6616 5.61803L37.7321 7L36 6.76393L34.2679 7L35.3384 5.61803L36 4Z" fill="#FFF500"/>
        <path d="M36 4L36.6616 5.61803L37.7321 7L36 6.76393L34.2679 7L35.3384 5.61803L36 4Z" fill="#FFF500"/>
        <path d="M36 4L36.6616 5.61803L37.7321 7L36 6.76393L34.2679 7L35.3384 5.61803L36 4Z" fill="#FFF500"/>
        <path d="M5.5 39L5.90514 40.0949L7 40.5L5.90514 40.9051L5.5 42L5.09486 40.9051L4 40.5L5.09486 40.0949L5.5 39Z" fill="#FFF500"/>
        <path d="M5.5 39L5.90514 40.0949L7 40.5L5.90514 40.9051L5.5 42L5.09486 40.9051L4 40.5L5.09486 40.0949L5.5 39Z" fill="#FFF500"/>
        <path d="M5.5 39L5.90514 40.0949L7 40.5L5.90514 40.9051L5.5 42L5.09486 40.9051L4 40.5L5.09486 40.0949L5.5 39Z" fill="#FFF500"/>
        <path d="M49.5 18L49.9051 19.0949L51 19.5L49.9051 19.9051L49.5 21L49.0949 19.9051L48 19.5L49.0949 19.0949L49.5 18Z" fill="#FFF500"/>
        <path d="M49.5 18L49.9051 19.0949L51 19.5L49.9051 19.9051L49.5 21L49.0949 19.9051L48 19.5L49.0949 19.0949L49.5 18Z" fill="#FFF500"/>
        <path d="M49.5 18L49.9051 19.0949L51 19.5L49.9051 19.9051L49.5 21L49.0949 19.9051L48 19.5L49.0949 19.0949L49.5 18Z" fill="#FFF500"/>
        <path d="M50.5 48L50.9051 49.0949L52 49.5L50.9051 49.9051L50.5 51L50.0949 49.9051L49 49.5L50.0949 49.0949L50.5 48Z" fill="#FFF500"/>
        <path d="M50.5 48L50.9051 49.0949L52 49.5L50.9051 49.9051L50.5 51L50.0949 49.9051L49 49.5L50.0949 49.0949L50.5 48Z" fill="#FFF500"/>
        <path d="M50.5 48L50.9051 49.0949L52 49.5L50.9051 49.9051L50.5 51L50.0949 49.9051L49 49.5L50.0949 49.0949L50.5 48Z" fill="#FFF500"/>
        <path d="M22.5 63L22.9051 64.0949L24 64.5L22.9051 64.9051L22.5 66L22.0949 64.9051L21 64.5L22.0949 64.0949L22.5 63Z" fill="#FFF500"/>
        <path d="M22.5 63L22.9051 64.0949L24 64.5L22.9051 64.9051L22.5 66L22.0949 64.9051L21 64.5L22.0949 64.0949L22.5 63Z" fill="#FFF500"/>
        <path d="M22.5 63L22.9051 64.0949L24 64.5L22.9051 64.9051L22.5 66L22.0949 64.9051L21 64.5L22.0949 64.0949L22.5 63Z" fill="#FFF500"/>
        <path d="M42.4551 10.6771C42.6266 10.1492 43.3734 10.1492 43.5449 10.6771V10.6771C43.6216 10.9131 43.8416 11.0729 44.0898 11.0729V11.0729C44.6448 11.0729 44.8756 11.7832 44.4266 12.1094V12.1094C44.2258 12.2553 44.1417 12.5139 44.2184 12.75V12.75C44.39 13.2779 43.7858 13.7168 43.3368 13.3906V13.3906C43.136 13.2447 42.864 13.2447 42.6632 13.3906V13.3906C42.2142 13.7168 41.61 13.2779 41.7816 12.75V12.75C41.8583 12.5139 41.7742 12.2553 41.5734 12.1094V12.1094C41.1244 11.7832 41.3552 11.0729 41.9102 11.0729V11.0729C42.1584 11.0729 42.3784 10.9131 42.4551 10.6771V10.6771Z" fill="#FFF500"/>
        <path d="M42.4551 10.6771C42.6266 10.1492 43.3734 10.1492 43.5449 10.6771V10.6771C43.6216 10.9131 43.8416 11.0729 44.0898 11.0729V11.0729C44.6448 11.0729 44.8756 11.7832 44.4266 12.1094V12.1094C44.2258 12.2553 44.1417 12.5139 44.2184 12.75V12.75C44.39 13.2779 43.7858 13.7168 43.3368 13.3906V13.3906C43.136 13.2447 42.864 13.2447 42.6632 13.3906V13.3906C42.2142 13.7168 41.61 13.2779 41.7816 12.75V12.75C41.8583 12.5139 41.7742 12.2553 41.5734 12.1094V12.1094C41.1244 11.7832 41.3552 11.0729 41.9102 11.0729V11.0729C42.1584 11.0729 42.3784 10.9131 42.4551 10.6771V10.6771Z" fill="#FFF500"/>
        <path d="M42.4551 10.6771C42.6266 10.1492 43.3734 10.1492 43.5449 10.6771V10.6771C43.6216 10.9131 43.8416 11.0729 44.0898 11.0729V11.0729C44.6448 11.0729 44.8756 11.7832 44.4266 12.1094V12.1094C44.2258 12.2553 44.1417 12.5139 44.2184 12.75V12.75C44.39 13.2779 43.7858 13.7168 43.3368 13.3906V13.3906C43.136 13.2447 42.864 13.2447 42.6632 13.3906V13.3906C42.2142 13.7168 41.61 13.2779 41.7816 12.75V12.75C41.8583 12.5139 41.7742 12.2553 41.5734 12.1094V12.1094C41.1244 11.7832 41.3552 11.0729 41.9102 11.0729V11.0729C42.1584 11.0729 42.3784 10.9131 42.4551 10.6771V10.6771Z" fill="#FFF500"/>
        <path d="M47.4551 38.6771C47.6266 38.1492 48.3734 38.1492 48.5449 38.6771V38.6771C48.6216 38.9131 48.8416 39.0729 49.0898 39.0729V39.0729C49.6448 39.0729 49.8756 39.7832 49.4266 40.1094V40.1094C49.2258 40.2553 49.1417 40.5139 49.2184 40.75V40.75C49.39 41.2779 48.7858 41.7168 48.3368 41.3906V41.3906C48.136 41.2447 47.864 41.2447 47.6632 41.3906V41.3906C47.2142 41.7168 46.61 41.2779 46.7816 40.75V40.75C46.8583 40.5139 46.7742 40.2553 46.5734 40.1094V40.1094C46.1244 39.7832 46.3552 39.0729 46.9102 39.0729V39.0729C47.1584 39.0729 47.3784 38.9131 47.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M47.4551 38.6771C47.6266 38.1492 48.3734 38.1492 48.5449 38.6771V38.6771C48.6216 38.9131 48.8416 39.0729 49.0898 39.0729V39.0729C49.6448 39.0729 49.8756 39.7832 49.4266 40.1094V40.1094C49.2258 40.2553 49.1417 40.5139 49.2184 40.75V40.75C49.39 41.2779 48.7858 41.7168 48.3368 41.3906V41.3906C48.136 41.2447 47.864 41.2447 47.6632 41.3906V41.3906C47.2142 41.7168 46.61 41.2779 46.7816 40.75V40.75C46.8583 40.5139 46.7742 40.2553 46.5734 40.1094V40.1094C46.1244 39.7832 46.3552 39.0729 46.9102 39.0729V39.0729C47.1584 39.0729 47.3784 38.9131 47.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M47.4551 38.6771C47.6266 38.1492 48.3734 38.1492 48.5449 38.6771V38.6771C48.6216 38.9131 48.8416 39.0729 49.0898 39.0729V39.0729C49.6448 39.0729 49.8756 39.7832 49.4266 40.1094V40.1094C49.2258 40.2553 49.1417 40.5139 49.2184 40.75V40.75C49.39 41.2779 48.7858 41.7168 48.3368 41.3906V41.3906C48.136 41.2447 47.864 41.2447 47.6632 41.3906V41.3906C47.2142 41.7168 46.61 41.2779 46.7816 40.75V40.75C46.8583 40.5139 46.7742 40.2553 46.5734 40.1094V40.1094C46.1244 39.7832 46.3552 39.0729 46.9102 39.0729V39.0729C47.1584 39.0729 47.3784 38.9131 47.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M14.4551 56.6771C14.6266 56.1492 15.3734 56.1492 15.5449 56.6771V56.6771C15.6216 56.9131 15.8416 57.0729 16.0898 57.0729V57.0729C16.6448 57.0729 16.8756 57.7832 16.4266 58.1094V58.1094C16.2258 58.2553 16.1417 58.5139 16.2184 58.75V58.75C16.39 59.2779 15.7858 59.7168 15.3368 59.3906V59.3906C15.136 59.2447 14.864 59.2447 14.6632 59.3906V59.3906C14.2142 59.7168 13.61 59.2779 13.7816 58.75V58.75C13.8583 58.5139 13.7742 58.2553 13.5734 58.1094V58.1094C13.1244 57.7832 13.3552 57.0729 13.9102 57.0729V57.0729C14.1584 57.0729 14.3784 56.9131 14.4551 56.6771V56.6771Z" fill="#FFF500"/>
        <path d="M14.4551 56.6771C14.6266 56.1492 15.3734 56.1492 15.5449 56.6771V56.6771C15.6216 56.9131 15.8416 57.0729 16.0898 57.0729V57.0729C16.6448 57.0729 16.8756 57.7832 16.4266 58.1094V58.1094C16.2258 58.2553 16.1417 58.5139 16.2184 58.75V58.75C16.39 59.2779 15.7858 59.7168 15.3368 59.3906V59.3906C15.136 59.2447 14.864 59.2447 14.6632 59.3906V59.3906C14.2142 59.7168 13.61 59.2779 13.7816 58.75V58.75C13.8583 58.5139 13.7742 58.2553 13.5734 58.1094V58.1094C13.1244 57.7832 13.3552 57.0729 13.9102 57.0729V57.0729C14.1584 57.0729 14.3784 56.9131 14.4551 56.6771V56.6771Z" fill="#FFF500"/>
        <path d="M14.4551 56.6771C14.6266 56.1492 15.3734 56.1492 15.5449 56.6771V56.6771C15.6216 56.9131 15.8416 57.0729 16.0898 57.0729V57.0729C16.6448 57.0729 16.8756 57.7832 16.4266 58.1094V58.1094C16.2258 58.2553 16.1417 58.5139 16.2184 58.75V58.75C16.39 59.2779 15.7858 59.7168 15.3368 59.3906V59.3906C15.136 59.2447 14.864 59.2447 14.6632 59.3906V59.3906C14.2142 59.7168 13.61 59.2779 13.7816 58.75V58.75C13.8583 58.5139 13.7742 58.2553 13.5734 58.1094V58.1094C13.1244 57.7832 13.3552 57.0729 13.9102 57.0729V57.0729C14.1584 57.0729 14.3784 56.9131 14.4551 56.6771V56.6771Z" fill="#FFF500"/>
        <path d="M12.4551 38.6771C12.6266 38.1492 13.3734 38.1492 13.5449 38.6771V38.6771C13.6216 38.9131 13.8416 39.0729 14.0898 39.0729V39.0729C14.6448 39.0729 14.8756 39.7832 14.4266 40.1094V40.1094C14.2258 40.2553 14.1417 40.5139 14.2184 40.75V40.75C14.39 41.2779 13.7858 41.7168 13.3368 41.3906V41.3906C13.136 41.2447 12.864 41.2447 12.6632 41.3906V41.3906C12.2142 41.7168 11.61 41.2779 11.7816 40.75V40.75C11.8583 40.5139 11.7742 40.2553 11.5734 40.1094V40.1094C11.1244 39.7832 11.3552 39.0729 11.9102 39.0729V39.0729C12.1584 39.0729 12.3784 38.9131 12.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M12.4551 38.6771C12.6266 38.1492 13.3734 38.1492 13.5449 38.6771V38.6771C13.6216 38.9131 13.8416 39.0729 14.0898 39.0729V39.0729C14.6448 39.0729 14.8756 39.7832 14.4266 40.1094V40.1094C14.2258 40.2553 14.1417 40.5139 14.2184 40.75V40.75C14.39 41.2779 13.7858 41.7168 13.3368 41.3906V41.3906C13.136 41.2447 12.864 41.2447 12.6632 41.3906V41.3906C12.2142 41.7168 11.61 41.2779 11.7816 40.75V40.75C11.8583 40.5139 11.7742 40.2553 11.5734 40.1094V40.1094C11.1244 39.7832 11.3552 39.0729 11.9102 39.0729V39.0729C12.1584 39.0729 12.3784 38.9131 12.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M12.4551 38.6771C12.6266 38.1492 13.3734 38.1492 13.5449 38.6771V38.6771C13.6216 38.9131 13.8416 39.0729 14.0898 39.0729V39.0729C14.6448 39.0729 14.8756 39.7832 14.4266 40.1094V40.1094C14.2258 40.2553 14.1417 40.5139 14.2184 40.75V40.75C14.39 41.2779 13.7858 41.7168 13.3368 41.3906V41.3906C13.136 41.2447 12.864 41.2447 12.6632 41.3906V41.3906C12.2142 41.7168 11.61 41.2779 11.7816 40.75V40.75C11.8583 40.5139 11.7742 40.2553 11.5734 40.1094V40.1094C11.1244 39.7832 11.3552 39.0729 11.9102 39.0729V39.0729C12.1584 39.0729 12.3784 38.9131 12.4551 38.6771V38.6771Z" fill="#FFF500"/>
        <path d="M9.45509 6.67705C9.62661 6.14919 10.3734 6.14919 10.5449 6.67705V6.67705C10.6216 6.91312 10.8416 7.07295 11.0898 7.07295V7.07295C11.6448 7.07295 11.8756 7.78319 11.4266 8.10942V8.10942C11.2258 8.25532 11.1417 8.51393 11.2184 8.75V8.75C11.39 9.27786 10.7858 9.71681 10.3368 9.39058V9.39058C10.136 9.24468 9.86404 9.24468 9.66323 9.39058V9.39058C9.2142 9.71681 8.61004 9.27786 8.78155 8.75V8.75C8.85825 8.51393 8.77423 8.25532 8.57342 8.10942V8.10942C8.12439 7.78319 8.35516 7.07295 8.91019 7.07295V7.07295C9.1584 7.07295 9.37839 6.91312 9.45509 6.67705V6.67705Z" fill="#FFF500"/>
        <path d="M9.45509 6.67705C9.62661 6.14919 10.3734 6.14919 10.5449 6.67705V6.67705C10.6216 6.91312 10.8416 7.07295 11.0898 7.07295V7.07295C11.6448 7.07295 11.8756 7.78319 11.4266 8.10942V8.10942C11.2258 8.25532 11.1417 8.51393 11.2184 8.75V8.75C11.39 9.27786 10.7858 9.71681 10.3368 9.39058V9.39058C10.136 9.24468 9.86404 9.24468 9.66323 9.39058V9.39058C9.2142 9.71681 8.61004 9.27786 8.78155 8.75V8.75C8.85825 8.51393 8.77423 8.25532 8.57342 8.10942V8.10942C8.12439 7.78319 8.35516 7.07295 8.91019 7.07295V7.07295C9.1584 7.07295 9.37839 6.91312 9.45509 6.67705V6.67705Z" fill="#FFF500"/>
        <path d="M9.45509 6.67705C9.62661 6.14919 10.3734 6.14919 10.5449 6.67705V6.67705C10.6216 6.91312 10.8416 7.07295 11.0898 7.07295V7.07295C11.6448 7.07295 11.8756 7.78319 11.4266 8.10942V8.10942C11.2258 8.25532 11.1417 8.51393 11.2184 8.75V8.75C11.39 9.27786 10.7858 9.71681 10.3368 9.39058V9.39058C10.136 9.24468 9.86404 9.24468 9.66323 9.39058V9.39058C9.2142 9.71681 8.61004 9.27786 8.78155 8.75V8.75C8.85825 8.51393 8.77423 8.25532 8.57342 8.10942V8.10942C8.12439 7.78319 8.35516 7.07295 8.91019 7.07295V7.07295C9.1584 7.07295 9.37839 6.91312 9.45509 6.67705V6.67705Z" fill="#FFF500"/>
        <path d="M39.5 15L41.1839 20.1824H46.6329L42.2245 23.3853L43.9084 28.5676L39.5 25.3647L35.0916 28.5676L36.7755 23.3853L32.3671 20.1824H37.8161L39.5 15Z" fill="#FFF500"/>
        <path d="M39.5 15L41.1839 20.1824H46.6329L42.2245 23.3853L43.9084 28.5676L39.5 25.3647L35.0916 28.5676L36.7755 23.3853L32.3671 20.1824H37.8161L39.5 15Z" fill="#FFF500"/>
        <path d="M39.5 15L41.1839 20.1824H46.6329L42.2245 23.3853L43.9084 28.5676L39.5 25.3647L35.0916 28.5676L36.7755 23.3853L32.3671 20.1824H37.8161L39.5 15Z" fill="#FFF500"/>
        <path d="M39.5 43L41.1839 48.1824H46.6329L42.2245 51.3853L43.9084 56.5676L39.5 53.3647L35.0916 56.5676L36.7755 51.3853L32.3671 48.1824H37.8161L39.5 43Z" fill="#FFF500"/>
        <path d="M39.5 43L41.1839 48.1824H46.6329L42.2245 51.3853L43.9084 56.5676L39.5 53.3647L35.0916 56.5676L36.7755 51.3853L32.3671 48.1824H37.8161L39.5 43Z" fill="#FFF500"/>
        <path d="M39.5 43L41.1839 48.1824H46.6329L42.2245 51.3853L43.9084 56.5676L39.5 53.3647L35.0916 56.5676L36.7755 51.3853L32.3671 48.1824H37.8161L39.5 43Z" fill="#FFF500"/>
        <path d="M26.5 29L28.1839 34.1824H33.6329L29.2245 37.3853L30.9084 42.5676L26.5 39.3647L22.0916 42.5676L23.7755 37.3853L19.3671 34.1824H24.8161L26.5 29Z" fill="#FFF500"/>
        <path d="M26.5 29L28.1839 34.1824H33.6329L29.2245 37.3853L30.9084 42.5676L26.5 39.3647L22.0916 42.5676L23.7755 37.3853L19.3671 34.1824H24.8161L26.5 29Z" fill="#FFF500"/>
        <path d="M26.5 29L28.1839 34.1824H33.6329L29.2245 37.3853L30.9084 42.5676L26.5 39.3647L22.0916 42.5676L23.7755 37.3853L19.3671 34.1824H24.8161L26.5 29Z" fill="#FFF500"/>
        <path d="M4.5 56L6.18386 61.1824H11.6329L7.22454 64.3853L8 68L4.5 66.3647L2.5 67L1.5 66L1 63.5V61.1824H2.81615L4.5 56Z" fill="#FFF500"/>
        <path d="M4.5 56L6.18386 61.1824H11.6329L7.22454 64.3853L8 68L4.5 66.3647L2.5 67L1.5 66L1 63.5V61.1824H2.81615L4.5 56Z" fill="#FFF500"/>
        <path d="M4.5 56L6.18386 61.1824H11.6329L7.22454 64.3853L8 68L4.5 66.3647L2.5 67L1.5 66L1 63.5V61.1824H2.81615L4.5 56Z" fill="#FFF500"/>
        <path d="M14.5 43L16.1839 48.1824H21.6329L17.2245 51.3853L18.9084 56.5676L14.5 53.3647L10.0916 56.5676L11.7755 51.3853L7.36708 48.1824H12.8161L14.5 43Z" fill="#FFF500"/>
        <path d="M14.5 43L16.1839 48.1824H21.6329L17.2245 51.3853L18.9084 56.5676L14.5 53.3647L10.0916 56.5676L11.7755 51.3853L7.36708 48.1824H12.8161L14.5 43Z" fill="#FFF500"/>
        <path d="M14.5 43L16.1839 48.1824H21.6329L17.2245 51.3853L18.9084 56.5676L14.5 53.3647L10.0916 56.5676L11.7755 51.3853L7.36708 48.1824H12.8161L14.5 43Z" fill="#FFF500"/>
        <path d="M50.5 56L52.1839 61.1824H54V64.3853L53.5 66L52.5 67L52 67.5L50.5 68H47L47.7755 64.3853L43.3671 61.1824H48.8161L50.5 56Z" fill="#FFF500"/>
        <path d="M50.5 56L52.1839 61.1824H54V64.3853L53.5 66L52.5 67L52 67.5L50.5 68H47L47.7755 64.3853L43.3671 61.1824H48.8161L50.5 56Z" fill="#FFF500"/>
        <path d="M50.5 56L52.1839 61.1824H54V64.3853L53.5 66L52.5 67L52 67.5L50.5 68H47L47.7755 64.3853L43.3671 61.1824H48.8161L50.5 56Z" fill="#FFF500"/>
        </g>
        <g filter="url(#filter2_d_102_135)">
        <path d="M15.0637 19.086C15.0637 17.7295 14.6983 15.1537 15.7174 14.0747C16.2909 13.4675 16.4676 12.7677 17.0731 12.1622C17.7108 11.5245 18.511 10.8837 19.2519 10.3708C21.0639 9.11629 22.9129 8.43677 24.8683 7.53835C26.2276 6.91382 28.6127 6.01319 30.0974 6.01319C31.393 6.01319 32.6512 5.88936 33.8014 6.40053C34.5353 6.72671 36.2164 7.49507 36.5854 8.19199C36.981 8.93922 38.4894 10.1817 38.5947 11.0244C38.6553 11.509 39.0305 11.7619 39.0305 12.3317C39.0305 13.0185 39.2484 13.6714 39.2484 14.2926C39.2484 16.5764 39.9399 19.7529 38.05 21.2648C37.1517 21.9835 36.4214 23.0911 35.4234 23.6614C34.6229 24.1188 33.5401 25.1545 33.0267 25.9613C32.2529 27.1772 30.9946 28.2112 29.9885 29.2174C28.5826 30.6233 27.1281 32.643 26.8171 34.6644C26.5905 36.1375 26.0684 37.5686 26.5024 39.1309C26.9772 40.8402 27.265 42.5844 27.265 44.36" stroke="black" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g filter="url(#filter3_d_102_135)">
        <path d="M28.3822 56.6536C27.7225 57.066 26.3083 58.3934 27.4017 59.2682C28.565 60.1988 31.1105 58.7444 32.074 58.082C33.99 56.7648 30.3703 54.8699 29.0358 56.8715" stroke="black" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <defs>
        <filter id="filter0_f_102_135" x="0.5" y="0.5" width="54" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_102_135"/>
        </filter>
        <filter id="filter1_b_102_135" x="-3" y="-3" width="61" height="75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_102_135"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_102_135" result="shape"/>
        </filter>
        <filter id="filter2_d_102_135" x="9.50002" y="4.49643" width="35.3718" height="49.3636" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_102_135"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_102_135" result="shape"/>
        </filter>
        <filter id="filter3_d_102_135" x="21.5" y="54.5048" width="16.6219" height="14.5656" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_102_135"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_102_135" result="shape"/>
        </filter>
        </defs>
        </svg>
    }





}
 
export default Main;