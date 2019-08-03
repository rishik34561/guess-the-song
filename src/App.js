import React, {Component} from 'react';
import './App.css';
import GenreSelector from './containers/GenreSelector/GenreSelector';
import {Route, Switch} from 'react-router-dom';
import Question from './components/Question/Question';

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
                <GenreSelector questions={this.setQuestionData} {...props} />
            );
          }}/>
          <Route path="/question" component={Question} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
