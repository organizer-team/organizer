import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {

  const handleGuestClick = () => {
    // Generate temporary token and redirect to Home Page
    // Create temporary email and password in the database
    // Delete temporary email and password after a short time
  }


  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>This is the welcome page of our app.</p>
      <Link to={'/email-validation'}>Continue as a user</Link>
      <button onClick={handleGuestClick}>Continue as a guest</button>
    </div>
  )
}

export default WelcomePage