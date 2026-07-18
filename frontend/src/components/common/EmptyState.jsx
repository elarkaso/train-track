function EmptyState({ text = "No data found." }) {
  return <p className="empty-state">{text}</p>;
}

export default EmptyState;