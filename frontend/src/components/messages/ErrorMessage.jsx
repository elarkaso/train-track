function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return <p className="status-message status-message-error">Error: {message}</p>;
}

export { ErrorMessage };