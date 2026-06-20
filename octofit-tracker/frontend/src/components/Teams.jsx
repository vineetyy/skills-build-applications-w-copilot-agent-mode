import { useEffect, useState } from 'react';

const normalizeResponse = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  const arrayValue = Object.values(data).find((value) => Array.isArray(value));
  return arrayValue ?? [];
};

function Teams({ apiRoot }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiRoot}/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeResponse(data, 'teams')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiRoot]);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.id ?? JSON.stringify(team)}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{(team.members || []).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
