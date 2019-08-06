import React, {Component} from 'react';
import { deflate } from 'zlib';

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
            <table>
                <tbody>
                    <h3>Leaderboard</h3>
                    <tr>
                        <th>Player</th>
                        {'      '}
                        <th>High Score</th>
                    </tr>
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
            <div>
                {sortedLeaderboard}
            </div>
            
        )
    }
    
}

export default Leaderboard;