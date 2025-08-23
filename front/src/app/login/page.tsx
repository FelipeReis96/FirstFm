'use client'
import LoginForm from "./login-form";

export default function Login() {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-center h-full">
                <LoginForm />
            </div>
            <div className="bg-[var(--bg-footer)] text-white 1">
                <ul className="flex flex-row justify-center items-center">
                    <li>
                        Account
                    </li>
                    <li>
                        Follow us
                    </li>
                </ul>
            </div>
        </div>
    )
}
