function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p style={{ color: "red", fontWeight: "bold", marginTop: "1rem" }}>
      Error: {message}
    </p>
  );
}

export { ErrorMessage };