import { useParams } from "react-router-dom";

function WorkoutDetailPage() {
  const { id } = useParams();

  return <h2>Workout Detail #{id}</h2>;
}

export default WorkoutDetailPage;