import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LogOut from "../LogOut"

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  return (
    <LogOut />
  )
}

export default Home