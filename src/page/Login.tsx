import { createClient } from '@lib/supabase/client.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('error');
    } else {
      nav('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 p-10 rounded-2xl border border-gray-700 shadow-2xl">
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <div className="space-y-6">
          <div>
            <div className="block text-lg mb-2 text-gray-300">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white"
              placeholder="admin@yourdomain.com"
            />
          </div>

          <div>
            <div className="block text-lg mb-2 text-gray-300">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-xl font-bold text-lg transition-all"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};
