import { useState } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [ islogin, setIslogin ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState("");
    
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const resetFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
    };

    const handleSignup = () => {
        if (!email || !username || !password) {
            setMessage("All fields are required!");
            return;
        }

        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            setMessage("User already exists! Please log in.");
            return;
        }

        const newUser = { email, username, password };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        setMessage("Signup successful! Please log in.");
        setIslogin(true);
        resetFields();
    };
    const handleLogin = () => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setMessage(`Welcome, ${user.username}! Redirecting to dashboard ...`);
            setTimeout(() => navigate("/dashboard"), 2000);
        } else {
            setMessage("Invalid email or password.")
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {islogin ? "Login" : "Sign up"}</h2>

                    <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {!islogin && (
                        <InputField
                        label="Username"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    )}
                    <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={islogin ? handleLogin : handleSignup} 
                    className="w-full p-2 mb-3 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {islogin ? "Login" : "Register"}
                    </button>
                    {message && <p className="text-center text-red-500 mb-3">{message}</p>}
                    <div className="text-center">
                        <button onClick={() => setIslogin(!islogin)}
                        className="text-blue-500 hover:underline">
                            {islogin ? "Create an account" : "Already have an account? Login"}
                        </button>
                        <p className="mt-2 text-sm text-gray-600 hover:underline cursor-pointer">
                            Forget Password?
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default SignUp;