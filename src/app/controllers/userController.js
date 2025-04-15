import UserModel from "../models/user.model.js";

//? User Insert - controller
const userInsert = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    //! Check if user already exists
    const existingUser = await UserModel.findOne({ email, phone });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, try again",
      });
    }

    //* Create and save new user
    const user = new UserModel({
      name,
      email,
      phone,
      message,
    });
    const result = await user.save();

    return res.status(200).json({
      message: "Successfully User Created",
      details: result,
    });
  } catch (error) {
    console.error(`Something went wrong: ${error.message}`);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//?Get all users

const viewUsers = async (req, res) => {
  try {
    //* find all users-data form database

    const users = await UserModel.find();
    res.status(200).json({
      message: "Successfully Users fetched",
      Count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(`Somthing went wrong: ${error.message}`);
    res.status(500).json({
      message: "Failed to Fetching Data, Server Error",
      Error: error,
    });
  }
};

//? Delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    //! Check if user not exists
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "User Successfully Deleted",
        User: user,
      });
    }
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
    return res.status(500).json({
      message: "Internal server Error",
      Error: error,
    });
  }
};

//? Update user

const userDataUpdate = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const updatedUser = { name, email, phone, message };
    const newUser = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    res.status(200).json({
      message: "User Successfully Updated",
      OldUser: user,
      NewUser: newUser,
    });
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
    res.status(500).json({ message: "Internal server error", Error: error });
  }
};

//?delete all users

const deleteAllUsers = async (req, res) => {
  try {
    await UserModel.deleteMany({});
    return res.status(200).json({
      message: "All Users deleted Successfully",
    });
  } catch (error) {
    console.log(`Something went wrong : ${error}`);
    return res.status(500).json({
      message: "Internal server error",
      Error: error,
    });
  }
};

export { userInsert, viewUsers, deleteUser, userDataUpdate,deleteAllUsers };
