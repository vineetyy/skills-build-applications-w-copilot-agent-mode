import { useEffect, useState } from 'react';

const normalizeResponse = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  const arrayValue = Object.values(data).find((value) => Array.isArray(value));
  return arrayValue ?? [];
};

function Leaderboard({ apiRoot }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiRoot}/leaderboard/`)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeResponse(data, 'leaderboard')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiRoot]);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? entry.id ?? JSON.stringify(entry)}>
                  <td>{entry.rank}</td>
                  <td>{entry.team}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
