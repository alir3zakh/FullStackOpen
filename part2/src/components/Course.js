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

export default Course
