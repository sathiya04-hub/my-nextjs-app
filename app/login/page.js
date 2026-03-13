'use client'

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Login successful! JWT: ${data.token}`);
        console.log('JWT:', data.token);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage('An error occurred while logging in.');
    }
  };

  return (
        <div className="container">
          <div className="box shadow p-4 mt-3">     
            <h2 className="text-primary">Login API route /api/login that validates hardcoded credentials (admin / password) and returns a JWT.</h2>
          </div>
          <div className="box shadow p-4 mt-3">
            <form onSubmit={handleLogin} className="box shadow p-4 mt-4">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
              </div>

              <div className="col-12">
                <button className="btn btn-primary" 
                    type="submit">
                      Sign In
                    </button>
              </div>

            </form>
            <h3 className="text-break">{message}</h3>
          </div>
        </div>


    
  );
}