import React, {Component} from 'react';
import Score from '../Score/Score';
import Button from '../UI/Button/Button';
import axios from 'axios';

class EndGame extends Component {
    state = {
        userData: {
            value: null,
            num_correct: 0
        }
    }

    componentDidMount() {
        let userData = {...this.state.userData};
        userData.num_correct = sessionStorage.getItem('num_correct');
        this.setState({userData: userData});
    }

    endGameHandler = (event) => {
        event.preventDefault();
        let userData = this.state.userData;
        axios.post('http://localhost:5000/persistScore', userData )
            .then( response => {
                console.log(response.data);
                let num_correct = sessionStorage.getItem('num_correct');
                num_correct = 0;
                sessionStorage.setItem('num_correct',num_correct);

                let num_total = sessionStorage.getItem('num_total');
                num_total = 0;
                sessionStorage.setItem('num_total',num_total);
                
                this.props.history.push('/');
            } );
        console.log(this.state.userData.value + ' received');
    }

    inputChangedHandler = (event) => {
        let userData = this.state.userData;
        userData.value = event.target.value;
        this.setState({userData: userData});
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.endGameHandler(event)}>
                    <label>Username</label>
                    <br/>
                    <br/>
                    <textarea onChange={(event) => this.inputChangedHandler(event)} />
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

export default EndGame;