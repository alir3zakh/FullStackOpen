import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0);

  // event handlers
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <>
      <Display counter={counter} />
      <Button text="plus" onClickHandler={increaseByOne} />
      <Button text="decrease" onClickHandler={decreaseByOne} />
      <Button text="reset" onClickHandler={reset} />
    </>
  )

}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ text, onClickHandler }) =>
  <button onClick={onClickHandler}>{text}</button>

export default App;
