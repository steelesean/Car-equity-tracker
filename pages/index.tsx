import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage('Error sending magic link');
    } else {
      setMessage('Check your email for a magic link!');
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Car Equity Tracker</h1>
      <p>Sign in with your email</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
