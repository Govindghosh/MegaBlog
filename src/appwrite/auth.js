import config from "../config/config";
import { Client, ID, Account } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client();
    this.account = new Account(this.client);

    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
      throw error; // Rethrow the error so that the calling code can handle it
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
      throw error; // Rethrow the error so that the calling code can handle it
    }
  }
}

const authService = new AuthService();
export default authService;