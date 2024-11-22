import { useState } from 'react';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import user_icon from '../../Assests/user.png';
import email_icon from '../../Assests/email.png';
import password_icon from '../../Assests/password.png';



const Signup = () => {
    const navigate = useNavigate();

    const initialData = {
        name: "",
        email: "",
        password: "",
        userType: "",
    };
    
    const [inputData, setInputData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const isPasswordStrong = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        return regex.test(password);
    };

    

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!isPasswordStrong(inputData.password)) {
            setErrorMessage("Password must contain at least 10 characters, including one uppercase letter, one number, and one special character.");
            return;
        }


        if (!isEmailValid(inputData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }


        try {
            const response = await axios.post("http://localhost:3000/signup", inputData);
            if (response.data === "exist") {
                setErrorMessage("User already exists");
            } else {
                alert("Signup Successful");
                navigate("/");
            }
        } catch (e) {
            setErrorMessage("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="containersignup">
            <div className="container1">
                <div className="header1">
                    <div className="text1">Signup</div>
                    <div className="underline1"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs1">
                        <div className="input1">
                            <img src={user_icon} alt="User Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                value={inputData.name} 
                                onChange={handleData} 
                                autoComplete="name" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={email_icon} alt="Email Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Id" 
                                value={inputData.email} 
                                onChange={handleData} 
                                autoComplete="email" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={password_icon} alt="Password Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={inputData.password} 
                                onChange={handleData} 
                                autoComplete="new-password" 
                                required 
                            />
                        </div>

                        <div className="user-type">
                            <label>
                                <input type="radio" name="userType" value="server" onChange={handleData} />
                                Server
                            </label>
                            <label>
                                <input type="radio" name="userType" value="Customer" onChange={handleData} />
                                Customer
                            </label>
                        </div>


                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>

                    <div className="account1">
                        Already have an account? <Link to="/">Login</Link>
                    </div>
                    <div className="submit-container1">
                        <button type="submit" className="submit1">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
