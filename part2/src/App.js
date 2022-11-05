const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div id="course-wrapper">
      {courses.map(course =>
        <Course key={course.id}
          name={course.name}
          parts={course.parts} />
      )}
    </div>
  )
}

const Course = ({ name, parts }) => {
  const total = parts.reduce((acc, part) =>
    acc + part.exercises, 0);
  return (
    <div id="course">
      <Header title={name} />
      <Content parts={parts} />
      <TotalExercises
        exercises={total} />
    </div>
  )
}

const Header = ({ title }) => {
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

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const TotalExercises = ({ exercises }) => {
  return (
    <b>Total of {exercises} exercises</b>
  )
}

export default App;
