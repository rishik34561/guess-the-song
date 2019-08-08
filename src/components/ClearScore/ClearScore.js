import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Score from '../Score/Score';
import classes from './ClearScore.css';

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
            <div className={classes.ClearScore}>
                <h3 style={{paddingBottom: '15px'}}>Do you want to clear your score?</h3>
                <div style={{position: 'relative', float: 'left', left: '48%'}}>
                    <form onSubmit={(event) => this.clearScoreHandler(event)}>
                        <div style={{margin: '0px auto 10px auto', textAlign: 'left'}}>
                            <input type='radio' name='clearScore' onChange={(event) => this.inputChangedHandler('Yes')} />      
                            <label>Yes</label>
                            <br/>
                        </div>
                        <div style={{margin: '0px auto 0px auto', textAlign: 'left'}}>
                            <input type='radio' name='clearScore' onChange={(event) => this.inputChangedHandler('No')} />      
                            <label>No</label>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        <div style={{position: 'relative', float: 'left', left: '-17px'}}>
                            <Button btnType="Success">Submit</Button>
                        </div>
                    </form>
                </div>
                <br/>
                <div style={{position: 'relative', marginTop: '15%', marginLeft: '-2%'}}>
                    <Score 
                    num_correct={sessionStorage.getItem('num_correct')} 
                    num_total={sessionStorage.getItem('num_total')} />
                </div>
            </div>
        )
    }
    
}

export default ClearScore;