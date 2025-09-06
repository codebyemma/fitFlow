import { useState } from "react";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    // show login by default
    const [ islogin, setIslogin ] = useState(true);
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ errors, setErrors ] = useState({});
    
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailRegex = /^\S+@\S+\.\S+$/;

    const validateForm = () => {
        const errs = {};
        if (!email) errs.email = "Email is required";
        else if (!emailRegex.test(email)) errs.email = "Enter a valid email";

        if (!password) errs.password = "Password is required";
        else if (password.length < 5) errs.password = "Password must be at least 5 characters";

        if (!islogin) {
            if (!username) errs.username = "Username is required";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const resetFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
    };

    const handleSignup = () => {
        if (!validateForm()) return;

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
        // validate basic fields first
        const errs = {};
        if (!email) errs.email = "Email is required";
        else if (!emailRegex.test(email)) errs.email = "Enter a valid email";
        if (!password) errs.password = "Password is required";
        else if (password.length < 5) errs.password = "Password must be at least 5 characters";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setMessage(`Welcome, ${user.username}! Redirecting to dashboard ...`);
            setTimeout(() => navigate("/dashboard"), 2000);
        } else {
            setMessage("Invalid email or password.")
        }
    };
    const isFormValid = islogin
        ? email && emailRegex.test(email) && password && password.length >= 5
        : email && emailRegex.test(email) && username && password && password.length >= 5;

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
                    {errors.email && <p className="text-sm text-red-500 mb-2">{errors.email}</p>}
                    {!islogin && (
                        <>
                        <InputField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-sm text-red-500 mb-2">{errors.username}</p>}
                        </>
                    )}
                    <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-sm text-red-500 mb-2">{errors.password}</p>}
                    <button onClick={islogin ? handleLogin : handleSignup} 
                    disabled={!isFormValid}
                    className={`w-full p-2 mb-3 text-white rounded ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}>
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