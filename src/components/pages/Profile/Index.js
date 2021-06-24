import React, { useState, useEffect } from 'react'
import { IoTrash, IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { app } from '../../../store'
import { useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';




const db = app.firestore();
const storage = app.storage();
/**
* @author 
* @function ProfilePage
**/

const ProfilePage = (props) => {
    document.title = "Profile";

    const userID = useParams();
    const firestore = useFirestore();
    const firebase = useFirebase();
    const docRef = firestore.collection("restros").doc(userID.userID);
    const auth = useSelector(state => state.firebase.auth);
    //state variable
    const [userData, setUserData] = useState({
        uid: userID.userID,
        restroName: '',
        phone: '',
        //TODO A do will later
        // email: auth.email,
        city: '',
        address: '',
        dishes: []

    })
    const [items, setItems] = useState({
        name: '',
        price: '',
        describe: '',
        itemImg: null
    });
    const [restroLogo, setRestroLogo] = useState(null)
    // const [itemImg, setItemImg] = useState(null)
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    useFirestoreConnect([// why i using  dont know
        { collection: "restros" },
    ]);

    useEffect(() => {
        if (userID) {
            showSingleUserData();
        }
    }, []);

    const showSingleUserData = async () => {

        try {
            const result = await docRef.get();
            if (result.exists) {
                setUserData(result.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    }
    const userDataAdd = async (e) => {
        e.preventDefault()

        if (e.target.value === "saveItem") {
            if (items.itemImg) {
                const storageRef = storage.ref();
                const itemImgRef = storageRef.child(`items/${userData.restroName}/${items.itemImg.name}`)

                await itemImgRef.put(items.itemImg)
                const itemImgUrl = await itemImgRef.getDownloadURL();

                let tempArray = [...userData.dishes];
                tempArray.push({ ...items, itemImg: itemImgUrl });
                setUserData({ ...userData, dishes: tempArray })

                await docRef.update({
                    ...userData,
                    dishes: tempArray,
                    updatedAt: firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    setItems({ ...items, name: '', price: '', describe: '', itemImg: null })

                }).catch((error) => {
                    console.log(error)
                })
            } else {
                let tempArray = [...userData.dishes];
                tempArray.push(items);
                setUserData({ ...userData, dishes: tempArray })

                await docRef.update({
                    ...userData,
                    dishes: tempArray,
                    updatedAt: firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    setItems({ ...items, name: '', price: '', describe: '', itemImg: null })

                }).catch((error) => {
                    console.log(error)
                })
            }
        } else if (e.target.value === "saveAllData") {

            if (restroLogo) {
                const storageRef = storage.ref();
                const restroLogoRef = storageRef.child(`restroLogos/${restroLogo.name}`)

                await restroLogoRef.put(restroLogo)
                    .then((ok) => {

                    }).catch(error => {
                        console.log('error :>> ', error);
                    });

                await restroLogoRef.getDownloadURL().then(async url => {
                    await docRef.set({
                        ...userData,
                        restroLogo: url,
                        createdAt: firestore.FieldValue.serverTimestamp()
                    });
                    alert("Data successfully stored")
                })
            } else {
                await docRef.set({
                    ...userData,
                    restroLogo,
                    createdAt: firestore.FieldValue.serverTimestamp()
                });
            }
        }

    }
    const deleteItem = async (index) => {

        const toBeDelete = userData.dishes[index];

        if (window.confirm(toBeDelete.name + " want to delete")) {

            const deleted = userData.dishes.splice(index, 1)
            setUserData({ ...userData })
            try {
                await docRef.update({
                    ...userData, updatedAt: firestore.FieldValue.serverTimestamp()
                })
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('i dont want to delete :>> ');
        }
    }

    return (
        <div>
            <div className="container">
                <div className="details">
                    <div className="input-card-box">
                        <div className="heading">About Your Restaurant</div>
                        <form action="" autoComplete="off" onSubmit={userDataAdd}>
                            <div className="input-card-options">
                                <h2>Basic Details</h2>
                                <div className="options">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Your Restaraunt name"
                                        name="restroName"
                                        required="required"
                                        value={userData.restroName}
                                        onChange={e => handleChange(e)}
                                    />
                                    <input
                                        type="file"
                                        required="required"
                                        onChange={e => setRestroLogo(e.target.files[0])}
                                    />
                                </div>
                                <div className="options">
                                    <input
                                        type="phone"
                                        placeholder="Phone"
                                        name="phone"
                                        required="required"
                                        value={userData.phone}
                                        onChange={e => handleChange(e)}
                                    />

                                    {/* <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={userData.email}
                                        onChange={e => handleChange(e)}
                                    /> */}
                                </div>

                                <div className="options">
                                    <select
                                        name="city"
                                        id="city"
                                        name="city"
                                        required="required"
                                        value={userData.city}
                                        onChange={e => handleChange(e)}
                                    >
                                        <option value="Not Provided">Select City</option>
                                        <option value="yavatamal">Yavatamal</option>
                                        <option value="amravati">Amravati</option>
                                        <option value="murtijapur">Murtijapur</option>
                                        <option value="akola">Akola</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        name="address"
                                        required="required"
                                        value={userData.address}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="input-card-btn">
                                    <button
                                        onClick={userDataAdd}
                                        type="submit"
                                        name="save"
                                        value="saveAllData"
                                    >Save</button>
                                </div>
                            </div>


                            <div className="input-card-options">
                                <h2>Dish/Food Details</h2>

                                <div className="options dish">
                                    <input
                                        type="file"
                                        required="required"
                                        // onChange={e => setItemImg(e.target.files[0])}
                                        onChange={e => setItems({ ...items, itemImg: e.target.files[0] })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dish/Food Name"
                                        name="name"
                                        required="required"
                                        value={items.name}
                                        onChange={e => setItems({ ...items, [e.target.name]: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        value={items.price}
                                        onChange={e => setItems({ ...items, [e.target.name]: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="What's make Your Food Unique"
                                        required="required"
                                        name="describe"
                                        value={items.describe}
                                        onChange={e => setItems({ ...items, [e.target.name]: e.target.value })}
                                    />
                                    <button
                                        onClick={userDataAdd}
                                        type="text" placeholder="Bt"
                                        name="save"
                                        value="saveItem"
                                    >Add</button>
                                    {/* ><IoAddCircleOutline size="30" /></button> */}
                                </div>

                            </div>
                            <div className="parent-list">
                                {/* <div className="list" >
                                    <div className="item item-1"> <h2>Images</h2></div>
                                    <div className="item item-2"><h2>Item Name</h2></div>
                                    <div className="item item-2"><h2>Item Price</h2></div>
                                    <div className="item item-3"><h2>Discription</h2></div>
                                    <div className="item item-4" onClick={() => deleteItem(index)} ><button><IoTrash size="30" /></button></div>
                                </div> */}
                                {
                                    userData.dishes.length > 0
                                        ?
                                        userData.dishes.map((dish, index) => (
                                            <div className="list" key={index}>
                                                <div className="item item-1"><img src={dish.itemImg} /></div>
                                                <div className="item item-2"><h2> {dish.name} </h2></div>
                                                <div className="item item-2"><h2>{dish.price}</h2></div>
                                                <div className="item item-3"><h2>{dish.describe}</h2></div>
                                                <div className="item item-4" ><button onClick={() => deleteItem(index)}><IoTrash size="30" /></button></div>
                                            </div>
                                        ))
                                        :
                                        <h2>No data</h2>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProfilePage