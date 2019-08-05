import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Score from '../Score/Score';

class ClearScore extends Component {
    state = {
        shouldClearScore: false
    }
    
    inputChangedHandler = (clearScore) => {
        if (clearScore === 'Yes') {
            this.setState({shouldClearScore: true});
        }
        else {
            this.setState({shouldClearScore: false});
        }
    }

    clearScoreHandler = (event) => {
        event.preventDefault();
        if (this.state.shouldClearScore) {
            let num_correct = sessionStorage.getItem('num_correct');
            num_correct = 0;
            sessionStorage.setItem('num_correct',num_correct);

            let num_total = sessionStorage.getItem('num_total');
            num_total = 0;
            sessionStorage.setItem('num_total',num_total);
        }
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
                <h3>Do you want to clear your score?</h3>
                <form onSubmit={(event) => this.clearScoreHandler(event)}>
                    <input type='radio' name='clearScore' onChange={(event) => this.inputChangedHandler('Yes')} />      
                    <label>Yes</label>
                    <br/>
                    <input type='radio' name='clearScore' onChange={(event) => this.inputChangedHandler('No')} />      
                    <label>No</label>
                    <br/>
                    <Button btnType="Success">Submit</Button>
                </form>
                <Score 
                num_correct={sessionStorage.getItem('num_correct')} 
                num_total={sessionStorage.getItem('num_total')} />
            </div>
        )
    }
    
}

export default ClearScore;