import React, {Component} from 'react';
import './App.css';
import GenreSelector from './containers/GenreSelector/GenreSelector';
import {Route, Switch} from 'react-router-dom';
import Question from './components/Question/Question';
import Answer from './components/Answer/Answer';
import ClearScore from './components/ClearScore/ClearScore';
import EndGame from './components/EndGame/EndGame';

class App extends Component {

  state = {
    questionData: null
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={(props) => {
            return (
                <GenreSelector  
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
