import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    // Store user role in localStorage for demo purposes
    localStorage.setItem('userRole', formData.role);
    localStorage.setItem('userName', formData.role === 'husband' ? 'John' : 'Jane');
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implement Google login logic
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am the
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'husband'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'husband' })}
                >
                  <span className="text-2xl mb-1">👨</span>
                  <p className="text-sm font-medium">Husband</p>
                </button>
                <button
                  type="button"
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'wife'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'wife' })}
                >
                  <span className="text-2xl mb-1">👩</span>
                  <p className="text-sm font-medium">Wife</p>
                </button>
              </div>
            </div>
          
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-sky-500 hover:text-sky-600">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48">
                    <g fill="none" fillRule="evenodd">
                      <path d="M9.827 24a15.16 15.16 0 0 1 .705-4.356L2.623 13.604A23.742 23.742 0 0 0 .214 24c0 3.737.867 7.26 2.407 10.388l7.904-6.051A15.17 15.17 0 0 1 9.827 24" fill="#FBBC05"/>
                      <path d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094l6.836-6.827C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.292 5.311-21.09 13.071l7.908 6.04c1.823-5.532 7.016-9.511 13.182-9.511" fill="#EB4335"/>
                      <path d="M23.714 37.867c-6.165 0-11.358-3.979-13.182-9.511l-7.909 6.038C6.422 42.156 14.427 47.467 23.714 47.467c5.732 0 11.205-2.035 15.312-5.849l-7.507-5.803c-2.118 1.334-4.786 2.052-7.805 2.052" fill="#34A853"/>
                      <path d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618" fill="#4285F4"/>
                    </g>
                  </svg>
                  Continue with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>
              <Link to="/register" className="ml-1 font-medium text-sky-500 hover:text-sky-600">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;