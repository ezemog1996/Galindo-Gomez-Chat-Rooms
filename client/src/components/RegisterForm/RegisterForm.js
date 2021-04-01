import React, { useState } from 'react';
import './style.css';
import handleInputChangeState from '../../utils/Functions/handleInputChangeState';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';

function RegisterForm() {
    const [userInfo, setUserInfo] = useState({});
    const [profilePic, setProfilePic] = useState("https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png");
    const inputs = [
        {
            name: 'username',
            type: 'username',
            label: 'New Username',
        },
        {
            name: 'password',
            type: 'password',
            label: 'New Password'
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password'
        }
    ]

    const handleInputChange = e => {
        handleInputChangeState(e, userInfo, setUserInfo);
        let file;
        let reader;
        if (e.target.name === 'profilePic') {
            file = e.target.files[0];
            reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result)
            }
        }
        if (file) {
            reader.readAsDataURL(file);
            setProfilePic(reader.result)
        }

    }

    const submitForm = e => {
        e.preventDefault();
        handleFormSubmit(userInfo, 'register');
    }

    return (
        <form className="register-form" onSubmit={submitForm}>
            <h2>Sign Up</h2>
            {
                inputs.map((input, index) => (
                    <div className="input-container" key={index}>
                        <label>{input.label}</label>
                        <br/>
                        <input className="typed-input" onChange={handleInputChange} name={input.name} type={input.type} />
                    </div>
                ))
            }
            <div className="input-container" style={{width: '167px', overflow: 'hidden'}}>
                <input title="" accept="image/*" type="file" className="custom-file-input" name="profilePic" onChange={handleInputChange} />
            </div>
            <div style={{height: '100px', width: '100px', margin: 'auto', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                <img src={profilePic} style={{height: '100%'}}/>
            </div>
            <button className="submit-btn" type="submit">Sign up</button>
        </form>
    )
}

export default RegisterForm