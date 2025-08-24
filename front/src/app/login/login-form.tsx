import Link from 'next/link';

export default function LoginForm() {
    return (
        <div className="flex flex-col justify-center items-center p-6 h-[45vh] w-[35vh] rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="font-bold text-lg p-4 text-[30px]">Login</div>
            <form className="flex flex-col">
                <input type="user" placeholder="Username" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <input type="text" placeholder="Email" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <input type="password" placeholder="Password" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <button type="submit" className="p-2 bg-[var(--login-button-border)] text-white rounded">Login</button>
            </form>
            <Link href="/register" className="mt-4 text-sm text-white hover:underline">Don&apos;t have an account? Register</Link>
        </div>
    )
}