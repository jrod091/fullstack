import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, name}) => {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

const Statistic = ({text,value}) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    );
}

const Statistics = ({good,neutral,bad}) => {
    const all = (g,n,b) => (g+n+b);
    const average = (g,n,b) => ((g*1+n*0+b*-1)/(g+n+b)).toFixed(2);
    const positive = (g,n,b) => ((g/(g+n+b))*100).toFixed(2);

    if (all(good,neutral,bad) === 0) {
        return (
            <p>No feedback given</p>
        );
    }

    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={all(good,neutral,bad)} />
                <Statistic text='average' value={average(good,neutral,bad)} />
                <Statistic text='positive' value={positive(good,neutral,bad)+'%'} />
            </tbody>
        </table>
    );
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>give feedback</h2>

            <Button onClick={() => setGood(good+1)} name={"good"} />
            <Button onClick={() => setNeutral(neutral+1)} name={"neutral"} />
            <Button onClick={() => setBad(bad+1)} name={"bad"} />

            <h2>statistics</h2>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
