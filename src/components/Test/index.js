import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TestAction } from '../../actions/test.actions';
import Test2 from '../Test2'

/**
* @author
* @function Test
**/

const Test = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [showResult, setShowResult] = useState(false)

const handleClicked = ()=>{
// console.log("checked");
  setShowResult(true);
  dispatch(TestAction(name));
}

// console.log(showResult);


  return(
    <div>
         name :  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        <button onClick={() => handleClicked()} > submit</button>
        {showResult ? <Test2 /> : ""}
    </div>
   )

 }

export default Test