import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './Leaderboard.css';

class Leaderboard extends Component {
    sortLeaderboard = (leaderboardList) => {
        var sortable=[];
        for(var key in leaderboardList)
            if(leaderboardList.hasOwnProperty(key))
                sortable.push([key, leaderboardList[key]]); // each item is an array in format [key, value]
        
	// sort items by value
        sortable.sort(function(a, b)
        {
            return b[1]-a[1]; // compare numbers
        });
        return sortable; 
    }

    render() {
        let leaderboardList = this.props.leaderboard;
        let sortable = this.sortLeaderboard(leaderboardList);
        console.log(sortable);

        let sortedLeaderboard = null;

        sortedLeaderboard = (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Player</th>
                        {'      '}
                        <th scope="col">High Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortable.map(score => (
                        <tr key={score[0]}> 
                            <th>{score[0]}</th>
                            <th>{score[1]}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        )

        return (
            <div className={classes.Leaderboard}>
                {sortedLeaderboard}
            </div>
            
        )
    }
    
}

export default Leaderboard;