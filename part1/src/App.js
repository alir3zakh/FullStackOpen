import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handler functions
  const setGoodHandler = () => setGood(good + 1)
  const setNeutralHandler = () => setNeutral(neutral + 1)
  const setBadHandler = () => setBad(bad + 1)

  return (
    <div id="unicafe">
      <Feedback title="Give Feedback"
        goodHandler={setGoodHandler}
        neutralHandler={setNeutralHandler}
        badHandler={setBadHandler} />

      <Statistics title="Statistics"
        state={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

const Statistics = ({ title, state }) => {
  const all = state.good + state.bad + state.neutral;
  const avergae = (state.good - state.bad) / all;
  const positive = (100 * state.good / all);

  if (all == 0) {
    return (
      <div id="stats">
        <DisplayTitle title={title} />
        <DisplaySingleLine param="No feedback given." />
      </div>
    )
  } else {
    return (
      <div id="stats">
        <DisplayTitle title={title} />
        <DisplaySingleLine param="good :" val={state.good} />
        <DisplaySingleLine param="neutral :" val={state.neutral} />
        <DisplaySingleLine param="bad :" val={state.bad} />
        <DisplaySingleLine param="average :" val={avergae} />
        <DisplaySingleLine param="positive :" val={positive + '%'} />
      </div>
    )
  }
}

const Feedback = (props) => {
  return (
    <div id="feedback">
      <DisplayTitle title={props.title} />
      <Button text="good" handler={props.goodHandler} />
      <Button text="neutral" handler={props.neutralHandler} />
      <Button text="bad" handler={props.badHandler} />
    </div>
  )
}

const Button = ({ text, handler }) => (
  <button onClick={handler}>{text}</button>
)

const DisplayTitle = ({ title }) => <h2>{title}</h2>
const DisplaySingleLine = ({ param, val }) => <p>{param} {val} <br /></p>


export default App
