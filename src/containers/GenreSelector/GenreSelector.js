import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-instance';
import Score from '../../components/Score/Score';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './GenreSelector.css';

class GenreSelector extends Component {
    state = {
        genreForm: {
            genre: {
                elementType: 'select',
                elementConfig: {
                    options: null                
                },
                value: 'Current Pop Hits'
            }
        },
        loaded: false,
        questionData: null,
        leaderboard: null,
        submitted: false
    }

    componentDidMount() {
        axios.get('/getGenres')
        .then(response => {
            let genreForm = {...this.state.genreForm};
            genreForm.genre.elementConfig.options = response.data;
            let optionsArray = [];
            for (let option in genreForm.genre.elementConfig.options) {
                optionsArray.push({
                    value: genreForm.genre.elementConfig.options[option]
                });
            }
            genreForm.genre.elementConfig.options = optionsArray;
            this.setState({genreForm: genreForm});
        });
        axios.get('/getLeaderboard')
            .then(response => {
                let leaderboard = {...this.state.leaderboard};
                leaderboard = response.data;
                this.setState({leaderboard: leaderboard});
            });
    }

    submitGenreHandler = (event) => {
        event.preventDefault();
        axios.post('/getGenres', this.state.genreForm.genre )
            .then( response => {
                this.setState({questionData: response.data, submitted: true});
                this.props.history.push({
                    pathname: '/question', 
                    state: {questionData: this.state.questionData, 
                            genre: this.state.genreForm.genre}});
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedGenreForm = {
            ...this.state.genreForm
        };
        const updatedFormElement = {
            ...updatedGenreForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedGenreForm[inputIdentifier] = updatedFormElement;
        
        this.setState({genreForm: updatedGenreForm});
    }

    render() {
        let leaderboard = this.state.leaderboard;

        const formElementsArray = [];
        for (let key in this.state.genreForm) {
            formElementsArray.push({
                id: key,
                config: this.state.genreForm[key]
            });
        }
        let inputList = null;
        let score = null;
        let submitButton = null;
        score = (
            <Score 
                num_correct={sessionStorage.getItem('num_correct')} 
                num_total={sessionStorage.getItem('num_total')} />
        );

        if (this.state.genreForm.genre.elementConfig.options) {
            inputList = formElementsArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ));
        }
        else {
            inputList = <Spinner />
        }

        if (this.state.leaderboard) {
            leaderboard = <Leaderboard leaderboard={leaderboard} />;
        }
        else {
            leaderboard = <Spinner />
        }

        if (this.state.submitted) {
            submitButton = <Spinner />;
        }
        else {
            submitButton = <Button btnType="Success">SELECT</Button>;
        }

        return (
            <div className={classes.GenreSelector}>
                <h2 style={{paddingBottom: '5px'}}>Guess The Song</h2>
                <h4>Select a genre</h4>
                <form onSubmit={this.submitGenreHandler}>
                    {inputList}
                    <br/>
                    <br/>
                    {submitButton}
                </form>
                <br/>
                <br/>
                {score}
                <br/>
                <br/>
                {leaderboard}
            </div>
            
        )
    }
}

export default GenreSelector;