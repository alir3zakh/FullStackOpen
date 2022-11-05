const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <Course name={course.name} parts={course.parts} />
  )
}

const Course = ({ name, parts }) => {
  return (
    <div id="course">
      <Header title={name} />
      <Content parts={parts} />
    </div>
  )
}

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div id="contents">
      {parts.map(part =>
        <Part key={part.id}
          name={part.name}
          exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

export default App;
