import {
  User,
} from "../../models"

export const getAllUsers = async () => {
  return await User
    .findAll();
}
