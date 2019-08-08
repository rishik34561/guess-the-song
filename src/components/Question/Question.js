import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Score from '../Score/Score';
import classes from './Question.css';

class Question extends Component {
    state = {
        questionData: null,
        value: null,
        isCorrect: false,
        genre: null
    }

    componentDidMount() {
        this.setState({questionData: this.props.location.state.questionData, 
                        genre: this.props.location.state.genre});
    }

    submitAnswerHandler = (event) => {
        event.preventDefault();
        if (this.state.value !== this.state.questionData.correct_song) {
            console.log('isCorrect is false');
            //this.setState({isCorrect: false});
        }
        else {
            console.log('isCorrect is true');
            //this.setState({isCorrect: true});
        }
        console.log('isCorrect');
        console.log(this.state.isCorrect);

        this.props.history.push({
            pathname: '/answer', 
            state: {isCorrect: this.state.isCorrect, 
                correct_song: this.state.questionData.correct_song,
                genre: this.state.genre}});
    }

    inputChangedHandler = (song) => {
        let updatedQuestionChosen = {
            ...this.state.value
        };
        updatedQuestionChosen = song;
        let updatedCorrect = false;
        if (updatedQuestionChosen === this.state.questionData.correct_song) {
            updatedCorrect = true;
        }
        console.log('updatedQuestionChosen');
        console.log(updatedQuestionChosen);
        this.setState({value: updatedQuestionChosen, isCorrect: updatedCorrect});
    }

    render() {    
        let audioSample = null;
        let options = null;
        let score = null;
        if (this.state.questionData) {
            const songOptions = this.state.questionData.song_answers;
            console.log(songOptions);
            audioSample = (
                <audio src={this.state.questionData.songurl_correct} controls  />
            );

            options = (
                <div className="wrapper" style={{position: 'relative', float: 'left', left: '40%'}}>
                <form onSubmit={(event) => this.submitAnswerHandler(event)}>
                    {songOptions.map(song => (
                        <div className="inner_cont_div" style={{margin: '0px auto 0px auto', textAlign: 'left'}}>
                            <input
                            type='radio'
                            name='questions'
                            onChange={(event) => this.inputChangedHandler(song)} />      
                            <label>{song}</label>
                            <br/>
                        </div>                                     
                    ))}   
                    <br/>
                    <br/>
                    <div style={{position: 'relative', float: 'left', left: '20%'}}>
                        <Button btnType="Success">Submit</Button>
                    </div>
                </form>
                </div>
            );
            score = (
                <div style={{position: 'relative',
                margin: '170px auto auto auto'}}>
                    <Score 
                    num_correct={sessionStorage.getItem('num_correct')} 
                    num_total={sessionStorage.getItem('num_total')} />
                </div>
            );
        }
        

        return (
            <div className={classes.Question}>
                <h2>Guess The Song</h2>
                <br/>
                {audioSample}
                <br/>
                <br/>
                {options}
                <br/>
                <br/>
                <br/>
                <br/>
                {score}
            </div>
            
        )
    }
    
}

export default Question;