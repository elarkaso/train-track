function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="error-message">
      Error: {message}
    </p>
  );
}

export { ErrorMessage };
