const Notification = ({ message }) => {
  if (message === null) return null
  const type = message.split(' ')[0]
  message = message.slice(message.indexOf(' ') + 1)

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification
