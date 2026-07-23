function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

<<<<<<< HEAD
  return (
    <p className="error-message">
      Error: {message}
    </p>
  );
=======
  return <p className="status-message status-message-error">Error: {message}</p>;
>>>>>>> 91c6cc3ddda12b028d5c959f5aa825300ec72fc3
}

export { ErrorMessage };
