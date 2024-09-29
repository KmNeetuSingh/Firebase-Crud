import { useState } from 'react'
import { UseReference } from './component/useref'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <UseReference/>
    </>
  )
}

export default App
