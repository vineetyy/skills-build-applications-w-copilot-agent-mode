import { useEffect, useState } from 'react';

const normalizeResponse = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  const arrayValue = Object.values(data).find((value) => Array.isArray(value));
  return arrayValue ?? [];
};

function Workouts({ apiRoot }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiRoot}/workouts/`)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeResponse(data, 'workouts')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiRoot]);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.id ?? JSON.stringify(workout)}>
                  <td>{workout.title}</td>
                  <td>{workout.description}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
