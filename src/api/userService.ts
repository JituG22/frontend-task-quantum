// src/api/userService.ts
import axios from "./axios";
import { NewUser, User } from "./models/User";

const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get<User[]>("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users", error);
      return [];
    }
  },

  addUser: async (user: NewUser): Promise<User> => {
    try {
      const response = await axios.post<User>("/users", user);
      return response.data;
    } catch (error) {
      console.error("Error adding user", error);
      throw error;
    }
  },

  updateUser: async (id: string, user: NewUser): Promise<NewUser> => {
    try {
      const response = await axios.put<NewUser>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`/users/${id}`);
    } catch (error) {
      console.error("Error deleting user", error);
      throw error;
    }
  },
};

export default userService;
