import React from 'react'
import { useSelector } from 'react-redux'
import JSONDATA from '../../MOCK_DATA.json'
/**
* @author
* @function Test2
**/

const Test2 = (props) => {
  const test = useSelector(state => state.test)

  console.log(test.owners);


  // let test3 =  JSONDATA.filter((val)=>{
  //   return <p>{val.first_name}</p>
  // })


  console.log(JSONDATA);

  return(

    <div> 
    {
    JSONDATA.filter((val)=>{
      return <p>{val}</p>
    })

    }</div>

   )

 }

export default Test2