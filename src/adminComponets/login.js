import { useNavigate } from "react-router-dom";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        fetch(`${apiUrl}/adminlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMessage("Login successful! Redirecting...");
                    navigate('/admin/aman');
                    localStorage.setItem("isAdminLoggedIn", true);
                } else {
                    setMessage("Login failed: " + (data.message || 'Unknown error'));
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                setMessage("An error occurred while trying to log in.");
            });
    };

    return (
        <>
            <form onSubmit={handleLogin} className="m-auto mt-5">
                <label htmlFor="email">Email Id</label>
                <input className="form-control" type="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" name="password" required />

                {message && <p className="text-center mt-2" style={{ color: "red" }}>{message}</p>}

                <button type="submit" className="btn btn-danger mt-2 d-flex m-auto">
                    Login
                </button>
            </form>
        </>
    );
};

export default Login;
