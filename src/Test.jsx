import { useEffect, useState } from "react"

export default function Test(){
  const [dishNum, setDishNum] = useState(0)

  useEffect(()=>{
    function Obs(){setDishNum(userModel.dishNum)}
      userModel.addObserver(Obs);
                      // 1. subscribe
        return function(){ userModel.removeObserver(Obs);}
    },[userModel])


  function handleClick(val){
    Mealsmodel.setDishNum()
  }

  return (
    <div>
      <button id='minus' onClick={() => handleClick(-1)}>-</button>
      {dishNum}
      <button id='plus' onClick={() => handleClick(1)}>+</button>
    </div>
  )
}