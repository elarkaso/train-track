function LoadingMessage({ message = "Loading..." }) {
  return <p className="status-message status-message-loading">{message}</p>;
}

export { LoadingMessage };