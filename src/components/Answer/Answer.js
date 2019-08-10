import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import axios from '../../axios-instance';
import Score from '../Score/Score';
import classes from './Answer.css';
import DangerButton from '../UI/Button/DangerButton/DangerButton';
import Spinner from '../UI/Spinner/Spinner';

class Answer extends Component {
    state = {
        isCorrect: false,
        correct_song: '',
        genre: null,
        continue: false
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
        axios.post('/getGenres', genre )
            .then( response => {
                let questionData = response.data;
                this.setState({continue: true});
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
        let isCorrect = null;
        let correctSong = null;
        let score = null;
        let continueButton = null;
        if (this.state.correct_song !== '') {
            if (this.state.isCorrect) {
                isCorrect = (
                    <div>
                        <h1>Correct</h1>
                        <br/>
                    </div>
                )
                let num_correct = sessionStorage.getItem('num_correct');
                num_correct++;
                sessionStorage.setItem('num_correct',num_correct);
            }
            else {
                isCorrect = (
                    <div>
                        <h1>Incorrect</h1>
                        <br/>
                    </div>   
                )
            }
            let num_total = sessionStorage.getItem('num_total');
            num_total++;
            sessionStorage.setItem('num_total',num_total);
            correctSong = this.state.correct_song;
            score = (
                <Score 
                num_correct={sessionStorage.getItem('num_correct')} 
                num_total={sessionStorage.getItem('num_total')} />
            );
        }

        if (this.state.continue) {
            continueButton = <Spinner />
        }
        else {
            continueButton = <Button className={classes.Button} clicked={this.continueHandler} btnType="Success">Continue</Button>
        }

        return (
            <div className={classes.Answer}>
                {isCorrect}
                <h4>The answer is {correctSong}</h4>
                <br/>
                {continueButton}
                <br/>
                <br/>
                <Button className={classes.Button} clicked={this.changeGenreHandler} btnType="Success">Change Genre</Button>
                <br/>
                <br/>
                <Button className={classes.Button} clicked={this.clearScoreHandler} btnType="Success">Clear Score</Button>
                <br/>
                <br/>
                <DangerButton className={classes.Button} clicked={this.endGameHandler} btnType="Success">End Game</DangerButton>
                <br/>
                <br/>
                {score}
            </div>
            
            
        )
    }
}

export default Answer;