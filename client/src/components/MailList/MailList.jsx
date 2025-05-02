import "./mailList.css"
import React, { useState } from 'react';

const MailList = () => {
  
  const [email, setEmail] = useState('');

  // Function to handle subscription
  const handleSubscribe = () => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (emailPattern.test(email)) {
      alert("You are successfully Subscribed to our community page");
    } else {
      alert("Please enter a valid email address before subscribing.");
    }
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, Create more!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email please"
        required />
        <button onClick={handleSubscribe} >Subscribe</button>
      </div>
    </div>
  )
}

export default MailList