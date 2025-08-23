

export default function LoginForm() {
    return (
        <div className="flex flex-col justify-center items-center p-2">
            <div className="font-bold text-lg p-4 text-[30px]">Log in</div>
            <form className="flex flex-col">
                <input type="text" placeholder="Email" className="mb-2 p-2 rounded border-1 border-[var(--input-border)]" />
                <input type="password" placeholder="Password" className="mb-2 p-2 rounded border-1 border-[var(--input-border)]" />
                <button type="submit" className="p-2 bg-[var(--login-button-border)] text-white rounded">Login</button>
            </form>
        </div>
    )
}