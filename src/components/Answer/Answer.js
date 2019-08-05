import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import axios from 'axios';
import Score from '../Score/Score';

class Answer extends Component {
    state = {
        isCorrect: false,
        correct_song: '',
        genre: null
    }

    componentDidMount() {
        this.setState({isCorrect: this.props.location.state.isCorrect, 
            correct_song: this.props.location.state.correct_song,
            genre: this.props.location.state.genre});
    }

    continueHandler = () => {
        const genre = {...this.state.genre};
        console.log('genre to submit');
        console.log(genre);
        axios.post('http://localhost:5000/getGenres', genre )
            .then( response => {
                console.log(response.data);
                let questionData = response.data;
                this.props.history.push({
                    pathname: '/question', 
                    state: {questionData: questionData, genre: genre}});
            } );
    }

    changeGenreHandler = () => {
        this.props.history.push('/');
    }

    clearScoreHandler = () => {
        this.props.history.push('/clearScore');
    }

    endGameHandler = () => {
        this.props.history.push('/endGame');
    }

    render() {
        console.log(this.props.location.state.isCorrect);
        console.log(this.props.location.state.genre);
        let isCorrect = null;
        let correctSong = null;
        let score = null;
        if (this.state.correct_song !== '') {
            if (this.state.isCorrect) {
                isCorrect = (
                    <h1>Correct</h1>
                )
                let num_correct = sessionStorage.getItem('num_correct');
                num_correct++;
                sessionStorage.setItem('num_correct',num_correct);
            }
            else {
                isCorrect = (
                    <h1>Incorrect</h1>
                )
            }
            let num_total = sessionStorage.getItem('num_total');
            num_total++;
            sessionStorage.setItem('num_total',num_total);
            console.log('num_total: ' + sessionStorage.getItem('num_total'));
            correctSong = this.state.correct_song;
            score = (
                <Score 
                num_correct={sessionStorage.getItem('num_correct')} 
                num_total={sessionStorage.getItem('num_total')} />
            );
        }
        return (
            <div>
                {isCorrect}
                The answer is {correctSong}
                <br/>
                <Button clicked={this.continueHandler} btnType="Success">Continue</Button>
                <br/>
                <Button clicked={this.changeGenreHandler} btnType="Success">Change Genre</Button>
                <br/>
                <Button clicked={this.clearScoreHandler} btnType="Success">Clear Score</Button>
                <br/>
                <Button clicked={this.endGameHandler} btnType="Success">End Game</Button>
                {score}
            </div>
            
            
        )
    }
}

export default Answer;