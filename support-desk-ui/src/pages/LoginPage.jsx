import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/app/dashboard';

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Check the backend and credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <p className="eyebrow">Day 12</p>
      <h1>Login to Support Desk</h1>
      <p>Enter your credentials to reach the ticket dashboard.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingMessage message="Logging in..." />}

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>

      <div className="login-help">
        <strong>Seeded admin</strong>
        <span>email: admin@example.com</span>
        <span>password: Admin@123</span>
      </div>
    </div>
  );
}
