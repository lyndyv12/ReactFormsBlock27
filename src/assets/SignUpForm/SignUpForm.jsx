import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function SignUpForm({ setToken }) {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateUsername = (username) => {
        if (username.length < 8) {
            setUsernameError("Username must be at least 8 characters long.");
            return false;
        } else {
            setUsernameError("");
            return true;
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) { 
            setPasswordError("Password must be at least 6 characters long.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("please enter username and password");
            return;
        }
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (!isUsernameValid || !isPasswordValid) {
            setError("Please fix the errors above.");
            return;
        }

        try {
            const res= await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({username,password}),
                headers: {
                    "Content-type": "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                setError(null);
                setUsername("");
                setPassword("");
                setToken(json.token);
                navigate("/authenticate");
            }


            console.log(json);
        } catch (err){
            console.log(err);
            setError(true)
        }
    };

  return (
    <>
        {error && <p>Whoops! Something went wrong.</p>}
        <h2>SignUpForm</h2>
        <form onSubmit={handleSubmit}>
            <label>
                username:{" "}
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setUsername(e.target.value);
                        validateUsername(e.target.value);
                    }}>
                </input>
            </label>
            {usernameError && <p className="error">{usernameError}</p>}
            <label>
                password:{" "}
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                        validatePassword(e.target.value)
                    }}>
                </input>
            </label>
            {passwordError && <p className="error">{passwordError}</p>}
            <input type="submit" value="Submit" />
        </form>
    </>
  )
}

export default SignUpForm
