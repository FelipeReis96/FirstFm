'use client'
import RegisterForm from "./register-form";

export default function Register() {
    return (
        <div className="w-full h-full flex flex-col justify-between bg-gradient-to-br from-[var(--a)] via-[var(--b)] to-[var(--c)]">
            <div className="flex justify-center h-full items-center">
                <RegisterForm />
            </div>
        </div>
    )
}