import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../../Store/ProfileReducer"
import "./styles.css"

const Profile = () => {
  const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&usqp=CAU"
  const [name, setName] = useState("")
  const [lastName, setLasName] = useState("")
  const [passWord, setPassword] = useState("")
  const [image, setImage] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const {
    error,
    profile
  } = useSelector(({ProfileReducer}) => ({
    error: ProfileReducer.error,
    profile: ProfileReducer.profile,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    getProfile()
  }, [])
  console.log(profile);
  const user =[{name: "Andres",image: "", lastName: "Paramo", _id: 123124324,}]

  return (
    <div className="cardContainerProfile">
      {user.map(({_id, name, image, lastName}) => {
        return (
          <div className="cardProfile" key={_id}>
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