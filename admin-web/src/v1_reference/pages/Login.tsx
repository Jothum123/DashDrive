import { Eye, EyeOff, Lock, Mail, Shield, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    if (isAuthenticated) {
        navigate('/', { replace: true });
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('System Access ID Required');
            return;
        }
        if (!password.trim()) {
            setError('Security Passkey Required');
            return;
        }

        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        setIsLoading(false);

        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.error || 'Identity Verification Failed');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full" />
            </div>

            <div className="w-full max-w-[440px] relative z-10">
                {/* Logo Area */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[32px] bg-primary mb-6 shadow-2xl shadow-primary/40 transition-transform duration-700 hover:rotate-[360deg]">
                        <Zap className="w-10 h-10 text-black outline-none" strokeWidth={3} />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">DashDrive</h1>
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] opacity-80">Management Console v1.0</p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-[48px] p-10 shadow-2xl shadow-black relative overflow-hidden group hover:border-zinc-800 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Error Alert */}
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                                <p className="text-red-400 text-xs font-black text-center uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                Operator Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@dashdrive.com"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl pl-14 pr-6 py-5 text-white placeholder-zinc-700 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                Security Passkey
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl pl-14 pr-14 py-5 text-white placeholder-zinc-700 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-black py-5 rounded-3xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Shield size={16} strokeWidth={3} />
                                    Verify Identity
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Hint */}
                <div className="mt-8 text-center">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        Encryption Active • Secure Link Primary
                    </p>
                </div>
            </div>
        </div>
    );
}
