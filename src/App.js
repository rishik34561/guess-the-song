import React, {Component} from 'react';
import classes from './App.css';
import GenreSelector from './containers/GenreSelector/GenreSelector';
import {Route, Switch} from 'react-router-dom';
import Question from './components/Question/Question';
import Answer from './components/Answer/Answer';
import ClearScore from './components/ClearScore/ClearScore';
import EndGame from './components/EndGame/EndGame';
import axios from 'axios';

class App extends Component {
  state = {
    questionData: null,
    leaderboard: {}
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getLeaderboard')
        .then(response => {
            let leaderboard = {...this.state.leaderboard};
            leaderboard = response.data;
            this.setState({leaderboard: leaderboard});
        });
  }

  render() {
    return (
        <div className={classes.App}>
          <h2>Guess The Song</h2>
          <Switch>
            <Route path="/" exact render={(props) => {
              return (
                  <GenreSelector  
                  leaderboard={this.state.leaderboard}
                  questions={this.setQuestionData} 
                  {...props} />
              );
            }}/>
            <Route path="/question" component={Question} />
            <Route path="/answer" component={Answer} />
            <Route path="/clearScore" component={ClearScore} />
            <Route path="/endGame" component={EndGame} />
          </Switch>
        </div>
    );
  }
  
}

export default App;
