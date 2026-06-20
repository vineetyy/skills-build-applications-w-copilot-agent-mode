import { useEffect, useState } from 'react';

const normalizeResponse = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  const arrayValue = Object.values(data).find((value) => Array.isArray(value));
  return arrayValue ?? [];
};

function Users({ apiRoot }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiRoot}/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeResponse(data, 'users')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiRoot]);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? JSON.stringify(user)}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
