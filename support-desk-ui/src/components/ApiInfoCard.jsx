import { useEffect, useState } from 'react';
import { fetchApiInfo } from '../services/api';

export default function ApiInfoCard() {
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApiInfo()
      .then((data) => setApiInfo(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading API info...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <section className="card api-card">
      <h2>Backend Connection</h2>
      <p>Application: {apiInfo.application}</p>
      <p>Version: {apiInfo.version}</p>
    </section>
  );
}
