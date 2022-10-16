import { getProfileData } from "../../Store/ProfileReducer"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import "./styles.css"
import Loader from "../Loader"

const Profile = () => {
  const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&usqp=CAU"
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    profile,
  } = useSelector(({ProfileReducer}) => ({
    profile: ProfileReducer.profile,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getProfileData())
  }, [])

  const editProfile = async (_id) => {
    setLoading(true)
    try {
      const { data } = await axios ({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/updateUser',
        data: {
          _id: profile._id,
          name: newName,
          secondName: newSecondName,
          surname: newSurname,
          secondSurname: newSecondSurname,
          address: newAddress,
          birthday: newBirthday,
          role: newRole,
          image: newImage },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "PROFILE_SUCCESS", payload: data})
      toast.success("Your profile was updated successfully")
      setLoading(false)
    } catch (error) {
      toast.error("Error updating profile")
      dispatch({ type: "PROFILE_ERROR", payload: error })
      setLoading(false)
    }
  }
  const hasData = !!profile && Object.entries(profile).length > 0
  const {
    name,
    secondName,
    surname,
    image,
    address,
    role,
    secondSurname,
    birthday} = profile

  const [newName, setNewName] = useState(name)
  const [newSecondName, setNewSecondName] = useState(secondName || "")
  const [newSurname, setNewSurname] = useState(surname|| "")
  const [newRole, setNewRole] = useState(role || "")
  const [newAddress, setNewAddress] = useState(address || "")
  const [newSecondSurname, setNewSecondSurname] = useState(secondSurname || "")
  const [newBirthday, setNewBirthday] = useState(birthday || "")
  const [newImage, setNewImage] = useState(image)

  return (
    <div className="cardContainerProfile">
      {hasData ? (
        <div className="cardProfile">
          <div className="containerImage">
            <img className="cardImage" src={newImage || noImage} />
            <input
              type="text"
              className="inputImage"
              placeholder="Link of the user image"
              onChange={(e) => setNewImage(e.target.value)}
            />
            <button
              className="security"
              onClick={() => navigate('Security')}
            >
              Security
            </button>
          </div>
          <div className="cardDataUser">
            <div className="cardTextProfile">
              <input
                type="text"
                placeholder="Name"
                className="inputCard"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Second name"
                className="inputCard"
                value={newSecondName}
                onChange={(e) => setNewSecondName(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <input
                type="text"
                placeholder="Surname"
                className="inputCard"
                value={newSurname}
                onChange={(e) => setNewSurname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Second surname"
                className="inputCard"
                value={newSecondSurname}
                onChange={(e) => setNewSecondSurname(e.target.value)}
              />
            </div>
            <div className="cardTextProfile">
              <input
                id="address"
                className="inputCardAddress"
                type="text"
                placeholder="Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div className="cardLabelInputProfile">
              <label
                htmlFor="birthday"
                className="labelCardProfile"
              >
                Birthday:
              </label>
              <input
                id="birthday"
                className="inputCard"
                type="date"
                value={newBirthday}
                onChange={(e) => setNewBirthday(e.target.value)}
              />
            </div>
            <div className="cardLabelInputProfile">
              <p className="labelCardProfile">Select your role:</p>
              <select
                className="inputCard"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="manager">Manager</option>
                <option value="coordinator">Coordinator</option>
                <option value="administrativeAssistant">Administrative assistant</option>
                <option value="headCellarman">Head cellarman</option>
              </select>
            </div>
            <div className="cardButtons">
              {!loading ?

                <button
                  className="saveChanges"
                  onClick={editProfile}
                  >
                  Save changes
                </button> : <Loader />
              }
            </div>
          </div>
          <Toaster
            position="button-right"
            duration="3000"
          />
        </div>
        ) : <p>no existen usuarios</p>
      }
    </div>
  )
}

export default Profile