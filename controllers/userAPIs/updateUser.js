import { User } from '../../schemas/userSchema.js'

export const editUser = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {userName, email, password } = req.body
  if (id.toString() === reqId.toString()) {
    try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "User updated sucessfully!"})
    } 
    catch (error) {
    res.status(500).json(error)
    }
  } else { 
     return res.status(401).json({message: "You are not authorized to edit this user"})
  } 
}

export const editProfile = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {country, bio} = req.body

  if (id.toString() === reqId.toString()) {
    try {
     const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
      'profile.country': country,
      'profile.bio': bio,
      }
    }, {new: true})
    res.status(200).json(updatedUser)
    } 
    catch (error) {
    res.status(500).json(error)
    }
  } else {
      return res.status(401).json({ message: "You are not authorized to edit this profile" })
    }
}