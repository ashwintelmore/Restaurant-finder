import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase'

//costome components
import vector from '../../../assets/vector.svg'
/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {
  document.title = "Registration";
  //Hooks
  const history = useHistory();
  const firebase = useFirebase();


  //state variable
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState("")



  useEffect(() => {
    createdUserData();
  }, [])

  const createdUserData =()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`user effect`, user)
      } else {
        // User is signed out
        // ...
      }
    });
  }



  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const userRegister = async (e) => {
    e.preventDefault()

    if (user.email === "" || user.password === "" || user.confirmPassword === "") {
      setError("Should be Not Empty")
    } else if (user.password !== user.confirmPassword) {
      setError("Password Not Match")
    } else {
      setError('');
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          
          history.replace(`/profile/${user.uid}`);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage);
        });


    }
  }


  return (
    <div>
      <div className="container">
        <div className="register-vector">
          <div className="input-card-box">
            <div className="heading">Registration</div>
            <form action="POST" onSubmit={userRegister}>
              <div className="input-card-options">
                <p className="error">{error}</p>
                <div className="options">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    required="required"
                    value={user.email}
                    onChange={e => handleChange(e)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    required="required"
                    value={user.password}
                    onChange={e => handleChange(e)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required="required"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="input-card-btn">
                  <button type="submit">Register</button>
                </div>
                <Link to="/login"><h4>Already have account</h4></Link>
              </div>
            </form>
          </div>
          <div className="vector"><img src={vector} alt="vector" />
            <h4>Give us a chance to improve your business</h4>
          </div>
        </div>
      </div>
    </div>
  )

}

export default RegisterPage;