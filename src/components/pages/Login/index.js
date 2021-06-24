import React, { useState } from 'react'
import vector from '../../../assets/vector.svg'
import { Link , useHistory } from 'react-router-dom';
import { useFirebase , isLoaded } from 'react-redux-firebase';
import Loder from '../../helper/Loder'
import { useSelector } from 'react-redux';
/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {
document.title = "Login";
  //Hooks
  const history = useHistory();
  const profile = useSelector((state) => state.firebase.profile);

  const firebase = useFirebase();

  //state variable
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState("")

  //functions
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  if (!profile.isLoaded) {
    return <Loder />;
  }
  const userLogin = async (e) => {
    e.preventDefault()

    if (user.email  ==="" || user.password ==="" ) {
      setError("Should be Not Empty")
    }else{
      setError('')

      await  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        history.replace(`/profile/${user.uid}`);
      })
      .catch((error) => { 
        setError(error.message) 
      });
    }
  }
  
  
  return (
    <div>
      <div className="container">
        <div className="register-vector">
          <div className="input-card-box">
            <div className="heading">Login</div>
            <form action="" onSubmit={userLogin}>
              <div className="input-card-options">
                <p className="error">{error}</p>
                <div className="options">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={e => handleChange(e)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={user.password}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="input-card-btn">
                  <button type="submit">Login</button>
                </div>
                <Link to="/registration"><h4>Create a new Account</h4></Link>
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

export default LoginPage;