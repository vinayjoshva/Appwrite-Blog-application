//here we are creating authentication service for our user accounts
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  //to avoid dependency and cross-compatibility we are gonna create a function to create account
  //we're using the following method to call services provided by appwrite

  //in future, if we use some other service other than appwrite, we can simply make changes in the constructor and inside the hood changes(userDetails changes) but the async function all that can remain same making it easy for us to work with
  async createAccount({ email, password, name }) {
    try {
      const userDetails = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      ); //used await so we can simply hold this in a variable
      if (userDetails) {
        //call another method to directly allow users to login if the userDetails are already present
        return this.login({ email, password });
      } else {
        return userDetails;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await this.logOutUsers(); // Clear existing sessions
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get(); //if account is not available at all
    } catch (error) {
      console.log("Failed to fetch current user:", error.message);
      return null; // Return null if no user session exists
    }
  }

  async logOutUsers() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService(); //creating an object of our class AuthService

export default authService;
