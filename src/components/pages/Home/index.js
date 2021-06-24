import React, { useEffect, useState } from 'react'
import BigLogo from '../../../assets/BigLogo.png'
import { useSelector } from 'react-redux';
import { app } from '../../../store'
import { useFirestoreConnect } from 'react-redux-firebase';

import { Link } from 'react-router-dom'
/**
* @author
* @function Home
**/

const db = app.firestore();
const storage = app.storage();

const Home = (props) => {
  document.title = "Home";
  let restros = [];
  useFirestoreConnect({
    collection: "restros"
  })
  restros = useSelector(state => state.firestore.ordered.restros)
  const auth = useSelector(state => state.firebase.auth)

  const [searchKeys, setSearchKeys] = useState({
    city: '',
    restroName: '',
    food: '',
  })

  const [resultByFood, setResultByFood] = useState([])
  const [flag, setFlag] = useState(false)
  if (!restros) {
    return restros = [];
  }


  var filteredBycity = restros.filter(keys => searchKeys.city === keys.city);

  const handleChange = (e) => {
    setSearchKeys({ ...searchKeys, [e.target.name]: e.target.value });
  }






  // TODO i wanna to only shows in datalist which city was selected
  let temp = [];
  if (temp.length == 0) {
    filteredBycity.map(restro => {
      restro.dishes.map(dish => {
        // console.log('dish.name; :>> ', dish.name);
        temp.push(dish.name);
      })
    })
  }

  // TODO
  const test3 = function (array, key) {
    let s = ""
    for (let index = 0; index < array.length; index++) {

      if (array[index].name.toLowerCase() === key) {
        s = array[index].name.toLowerCase();
        // return s;
      } else {
        // s ="not Found"
      }
    }
    return s;
  }


  const restroSearch = (e) => {
    e.preventDefault();

    const filteredByDish = filteredBycity.filter(city => test3(city.dishes, searchKeys.food.toLowerCase()) === searchKeys.food.toLowerCase());
    // console.log('filteredByDish :>> ', filteredByDish);
    if (filteredByDish.length > 0) {
      setResultByFood(filteredByDish)
    } else {
      setResultByFood(filteredByDish)
      setFlag(true)
    }

  }
  let test = resultByFood.length > 0 ? resultByFood : flag ? [] : filteredBycity;
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="big-logo"><img src={BigLogo} alt="biglogo" /></div>
          <div className="input-card-box">
            <div className="heading">Find the Restaurant</div>
            <form action="POST" onSubmit={restroSearch}>
              <div className="input-card-options">
                <div className="options">
                  <select
                    id="city"
                    name="city"
                    value={searchKeys.city}
                    onChange={e => handleChange(e)}
                  >
                    <option value="">Select City</option>
                    <option value="yavatamal">Yavatamal</option>
                    <option value="amravati">Amravati</option>
                    <option value="murtijapur">Murtijapur</option>
                    <option value="akola">Akola</option>
                  </select>

                  <input
                    type="text"
                    list="foodSuggList"
                    placeholder="Search By Your Favorite Food"
                    name="food"
                    value={searchKeys.food}
                    onChange={e => handleChange(e)}
                  />
                  <datalist id="foodSuggList">
                    {
                      temp.map((sugg, index) => (
                        <option key={index} value={sugg} />
                      ))
                    }
                  </datalist>
                  {/* //TODO after some time */}
                  {/* <strong><u>OR</u></strong>
                  <input
                    type="text"
                    placeholder="Search By Your Restaraunt name"
                    name="restroName"
                    value={searchKeys.restroName}
                    onChange={e => handleChange(e)}
                  /> */}
                  {/* //TODO after some time */}
                </div>
                <div className="input-card-btn">
                  <button type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="result">
        <div className="container">
          {
            filteredBycity.length > 0 ? // T
              test.length > 0 ?
                test.map((restro, index) => (
                  <div className="card" key={index}>
                    <div className="top">
                      <div className="restro-logo"><img src={restro.restroLogo} alt="" /></div>
                      <div className="restro-heading">
                        <Link to={`/restro/${restro.uid}`}><h2> {restro.restroName} </h2></Link>
                        <p>{restro.city} , {restro.address}</p>
                      </div>
                      <div className="restro-offers">
                        <h2>Some Offer Provided by Restaurant</h2>
                      </div>
                    </div>
                    <div className="items">

                      {
                        restro.dishes.length > 0 ?
                          restro.dishes.map((dish, index) => (
                            <div className="item" key={index}>
                              <h3>{dish.name}</h3>
                              <img src={dish.itemImg} alt="" />
                              <h4>{dish.price}/-</h4>
                            </div>
                          ))
                          :
                          <h2>Not Provided </h2>
                      }
                    </div>
                  </div>
                ))
                :
                <h2>There are no results {searchKeys.city == "" ? " " : ` for ${searchKeys.city}`}  {searchKeys.food == "" ? " " : ` and ${searchKeys.food}`}</h2>
              :
              <h2>There are no results {searchKeys.city == "" ? " " : ` for ${searchKeys.city}`}  {searchKeys.food == "" ? " " : ` and ${searchKeys.food}`}</h2>
          }



        </div>

      </section>
    </>
  )

}

export default Home;