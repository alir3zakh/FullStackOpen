const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
  let name = 'Alireza';
  let age = 24;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
