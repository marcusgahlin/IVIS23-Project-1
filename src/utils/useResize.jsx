import { useEffect, useState } from "react"

export const useResize = (myRef) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleResize = () => {
    // console.log(myRef.current.offsetWidth)
    setWidth(myRef.current.offsetWidth)
    setHeight(myRef.current.offsetHeight)
  }

  useEffect(() => {
    myRef.current && myRef.current.addEventListener('resize', handleResize)

    return () => {
      try {
      myRef.current.removeEventListener('resize', handleResize)
      } catch(error) {
        console.log(error)
      }
    }
  }, [myRef])

  return { width, height }
}