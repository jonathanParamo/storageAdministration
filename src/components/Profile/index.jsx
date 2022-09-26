import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"

const Profile = () => {
  const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&usqp=CAU"
  const [name, setName] = useState("")
  const [lastName, setLasName] = useState("")
  const [passWord, setPassword] = useState("")
  const [image, setImage] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()


  useEffect(() =>{
    if(!token) navigate("/")
  }, [])

  const user =[{name: "Andres",image: "", lastName: "Paramo"}]

  return (
    <div className="cardContainerProfile">
      {user.map(({name, image, lastName}) => {
        return (
          <div className="cardProfile">
              <img className="cardImage" src={image || noImage} />
            <div className="cardTextProfile">
                <p className="cardName" >{name}</p>
                <p className="cardLastName">{lastName}</p>
            </div>
            <div className="cardButtons">
              <button
                className="editButton"
              >
                Edit profile
              </button>
              <button
                className="deleteButton"
              >
                Delete user
              </button>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default Profile