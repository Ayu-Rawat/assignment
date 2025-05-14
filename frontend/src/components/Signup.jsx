import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index.js';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();


    const create = async (data) => {
        setError("");
        try {
            const response = await fetch(
            "http://localhost:3000/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: data.username,
                        password: data.password,
                    }),
                }
            );
    
            console.log("User registered successfully:", response.data);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="mb-6 flex justify-center">
                    <Logo width="80px" />
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-900">Sign up to create an account</h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
                    <Input
                        placeholder="Enter your Username"
                        className="border-gray-300 text-gray-900"
                        {...register("username", { required: true })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-300 text-gray-900"
                        {...register("password", { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        Sign up
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
