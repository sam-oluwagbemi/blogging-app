import { User } from '../../schemas/userSchema.js'

export const editUser = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id

  if (id.toString() !== reqId.toString()) {
    return res.status(401).json({message: "You are not authorized to edit this user"})
  }

    try {
      const user = await User.findById(reqId)
      if(!user){
        return res.status(404).json({message: "User not found"})
      }

      user.userName = req.body.userName ?? user.userName
      user.email = req.body.email ?? user.email

      await user.save()

      res.status(200).json(user)
      } catch (error) {
    res.status(500).json(error.message)
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
