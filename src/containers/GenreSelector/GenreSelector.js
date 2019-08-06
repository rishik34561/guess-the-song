import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import Question from '../../components/Question/Question';
import Score from '../../components/Score/Score';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
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
        leaderboard: null
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getGenres')
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
        console.log('Retrieved genres');
        axios.get('http://localhost:5000/getLeaderboard')
            .then(response => {
                let leaderboard = {...this.state.leaderboard};
                leaderboard = response.data;
                this.setState({leaderboard: leaderboard});
            });
    }

    submitGenreHandler = (event) => {
        event.preventDefault();
        const genre = {...this.state.genreForm.genre};
        console.log('genre to submit');
        console.log(genre);
        axios.post('http://localhost:5000/getGenres', this.state.genreForm.genre )
            .then( response => {
                console.log(response.data);
                this.setState({questionData: response.data});
                this.props.history.push({
                    pathname: '/question', 
                    state: {questionData: this.state.questionData, 
                            genre: this.state.genreForm.genre}});
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedGenreForm = {
            ...this.state.genreForm
        };
        const updatedFormElement = {
            ...updatedGenreForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedGenreForm[inputIdentifier] = updatedFormElement;
        console.log('updatedFormElement');
        console.log(updatedFormElement);
        
        this.setState({genreForm: updatedGenreForm});
    }

    render() {
        const leaderboard = this.state.leaderboard;
        console.log(leaderboard);

        const formElementsArray = [];
        for (let key in this.state.genreForm) {
            formElementsArray.push({
                id: key,
                config: this.state.genreForm[key]
            });
        }
        console.log('formElementsArray');
        console.log(formElementsArray);
        let inputList = null;
        let score = null;
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

        return (
            <div className={classes.GenreSelector}>
                <h4>Select a genre</h4>
                <form onSubmit={this.submitGenreHandler}>
                    {inputList}
                    <Button btnType="Success">SELECT</Button>
                </form>
                {score}
                <Leaderboard leaderboard={leaderboard} />
            </div>
            
        )
    }
}

export default GenreSelector;