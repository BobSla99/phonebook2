const Notification = ({ message }) => {

  if (message.content === null) {
    return null;
  } else {
    return (
      <div className={message.type}>
        <p>{message.content}</p>
      </div>
    );
  }
};

export default Notification;
