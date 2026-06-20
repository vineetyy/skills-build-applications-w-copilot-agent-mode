import { useEffect, useState } from 'react';

const normalizeResponse = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  const arrayValue = Object.values(data).find((value) => Array.isArray(value));
  return arrayValue ?? [];
};

function Activities({ apiRoot }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiRoot}/activities/`)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeResponse(data, 'activities')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiRoot]);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? JSON.stringify(activity)}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.distanceKm}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
