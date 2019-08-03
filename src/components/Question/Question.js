import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

class Question extends Component {
    state = {
        questionData: null,
        value: null
    }

    componentDidMount() {
        this.setState({questionData: this.props.location.state.questionData});
    }

    submitAnswerHandler = () => {
        
    }

    inputChangedHandler = (song) => {
        let updatedQuestionChosen = {
            ...this.state.value
        };
        updatedQuestionChosen = song;
        console.log('updatedQuestionChosen');
        console.log(updatedQuestionChosen);
        this.setState({value: updatedQuestionChosen});
    }

    render() {    
        let audioSample = null;
        let options = null;
        if (this.state.questionData) {
            const songOptions = this.state.questionData.song_answers;
            console.log(songOptions);
            audioSample = (
                <audio src={this.state.questionData.songurl_correct} controls  />
            );

            options = (
                <form onSubmit={this.submitAnswerHandler}>
                    {songOptions.map(song => (
                        <div>
                            <input
                            type='radio'
                            name='questions'
                            onChange={(event) => this.inputChangedHandler(song)} />      
                            <label>{song}</label>
                        </div>                                     
                    ))}
                    <Button btnType="Success">Submit</Button>
                </form>
            );
        }
        

        return (
            <div>
                <h1>Question page</h1>
                {audioSample}
                {options}
            </div>
            
        )
    }
    
}

export default Question;