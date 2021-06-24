import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom'
import Footer from '../../Layout/Footer';
import fireBase from 'firebase'

/**
* @author
* @function RestroDetails
**/

const RestroDetails = (props) => {
    const increment = fireBase.firestore.FieldValue.increment(1);
    const decrement = fireBase.firestore.FieldValue.increment(-1);
    const { restroId } = useParams();
    const firebase = useFirestore();
    const [restroDetails, setRestroDetails] = useState({
        uid: '',
        restroName: '',
        phone: '',
        // email: auth.email,
        city: '',
        address: '',
        restroLogo: '',
        dishes: [],
        views: '0',

    })
    const [reviewsGotData, setReviewsGotData] = useState([]);
    const [reviews, setReviews] = useState({
        name: "",
        email: "",
        message: "",
    })
    const handleChangeReviews = (e) => {
        setReviews({ ...reviews, [e.target.name]: e.target.value })
    }

    const AddReview = async (e) => {
        e.preventDefault();
        try {
            await firebase.collection("restros")
                .doc(restroId)
                .collection("reveiws")
                .doc()
                .set(reviews);
            setReviews({ name: "", email: "", message: "" })

            await firebase.collection("restros")
                .doc(restroId)
                .collection("reveiws")
                .get()
                .then((querySnapshot) => {
                    const documents = querySnapshot.docs.map(doc => doc.data())
                    setReviewsGotData(documents);
                });
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(async () => {
        //Geting all detail of restro
        const data = await firebase.collection("restros").doc(restroId).get();
        if (!data.exists) {
            console.log('No such document!');
        } else {
            await firebase.collection("restros").doc(restroId).update({ views: increment });
            setRestroDetails(data.data())
        }

    }, [])

    useEffect(async () => {
        //Geting all detail of restro reviews
        await firebase.collection("restros")
            .doc(restroId)
            .collection("reveiws")
            .get()
            .then((querySnapshot) => {
                const documents = querySnapshot.docs.map(doc => doc.data())
                setReviewsGotData(documents);
            });
    }, [])


    return (
        <>
            <div className="container">
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className=" px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={restroDetails.restroLogo} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{restroDetails.restroName}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg fill="#4CAF50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="#4CAF50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="#4CAF50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="#4CAF50" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">{reviewsGotData.length} Reviews</span>
                                        <span className="text-gray-600 ml-3">{restroDetails.views} times viewed</span>
                                    </span>
                                </div>
                                <h2 className="text-md title-font text-red-500 tracking-widest">Timing :  08:00am to 10:00pm (Daily) </h2>
                                <p className="leading-relaxed">
                                    People Say This Place Is Known For
                                    Taste of Food, Elegantly Decorated, Taste was Awesome, Drive through, Worth Waiting, Low Price

                                    Popular Dishes
                                    Chicken Tornado, Bbq Mushroom, Paneer Schezwan Pizza, Meat Feast, Chicken Delight, Chicken Garlic Bread

                                </p>
                                <div className="flex">
                                    <button style={{ width: "30%" }} className=" flex ml-3 text-white bg--500 border-0 py-2 px-18 focus:outline-none hover:bg-green-600 rounded">  <a href="#addReview"> Add Review</a></button>
                                    <button style={{ width: "30%" }} className=" flex ml-3 text-white bg--500 border-0 py-2 px-18 focus:outline-none hover:bg-green-600 rounded">  <a href="https://maps.google.com" target="_blank"> Direction</a></button>
                                    <button style={{ width: "30%" }} className=" flex ml-3  text-white bg--500 border-0 py-2 px-18 focus:outline-none hover:bg-green-600 rounded">Share</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-gray-600 body-font">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 mt-20">Best of Our</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Dishes/foods</h1>
                    </div>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap  justify-center ">
                            {
                                restroDetails.dishes.length > 0 ?
                                    restroDetails.dishes.map((item, index) => (
                                        <div className="lg:w-1/4 md:w-1/2 p-2 w-full m-2 bg-gray-100" key={index}>
                                            <a className="block relative h-48 rounded overflow-hidden">
                                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.itemImg} />
                                            </a>
                                            <div className="mt-4">
                                                <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                                                <p className="mt-1">{item.price}</p>
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.describe}</h3>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="lg:w-1/4 md:w-1/2 p-2 w-full m-2 bg-gray-100">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">No Data Available</h2>
                                    </div>
                            }
                        </div>
                    </div>
                </section>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-20 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 mt-20">What customer Says about us</h2>
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Contact The Restaruant</h1>
                        </div>
                        <div className="flex flex-wrap -m-4 mb-10">
                            <div className="p-4 md:w-1/3 sm:w-full">
                                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-gray-900 text-lg title-font font-medium">Restaurant Address</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">{restroDetails.address} , {restroDetails.city} , india</p>
                                        <a className="mt-3 text-indigo-500 inline-flex items-center">Direction
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3 sm:w-full">
                                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <h2 className="text-gray-900 text-lg title-font font-medium">Email</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">restro@gmail.com</p>
                                        <a className="mt-3 text-indigo-500 inline-flex items-center">Mail
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3 sm:w-full">
                                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <circle cx="6" cy="6" r="3"></circle>
                                                <circle cx="6" cy="18" r="3"></circle>
                                                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-gray-900 text-lg title-font font-medium">Phone</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">+91 {restroDetails.phone}</p>
                                        <a className="mt-3 text-indigo-500 inline-flex items-center">Call
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 mt-20">What customer Say's about us</h2>
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Reviews</h1>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {
                                reviewsGotData.length > 0 ?
                                    reviewsGotData.map((review, index) => (
                                        <div className="p-4 md:w-1/2 w-full" key={index}>
                                            <div className="h-full bg-gray-100 p-8 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                                </svg>
                                                <p className="leading-relaxed mb-6">{review.message}</p>
                                                <a className="inline-flex items-center">
                                                    <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                                    <span className="flex-grow flex flex-col pl-4">
                                                        <span className="title-font font-medium text-gray-900">{review.name}</span>
                                                        <span className="text-gray-500 text-sm">{review.email}</span>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <h1 style={{ margin: "auto" }} >Be the first one</h1>
                            }
                        </div>
                    </div>
                </section>

                <form onSubmit={AddReview}>
                    <section className="text-gray-600 body-font mt-10  relative" id="addReview">
                        <div className=" bg-gray-100 px-5 py-24 mx-auto">
                            <div className="flex flex-col text-center w-full mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Review</h1>
                                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Your Review is very Important htmlFor Restaurant.</p>
                            </div>
                            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required="required"
                                                name="name"
                                                value={reviews.name}
                                                onChange={handleChangeReviews}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required="required"
                                                name="email"
                                                value={reviews.email}
                                                onChange={handleChangeReviews}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                            <textarea
                                                id="message"
                                                required="required"
                                                name="message"
                                                value={reviews.message}
                                                onChange={handleChangeReviews}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button
                                            type="submit"
                                            className="flex mx-auto w-32 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>

            </div>
            <Footer />
        </>
    )
}


export default RestroDetails