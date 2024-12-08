import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug, //considering this as document ID
        {
          title,
          content,
          featuredImage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("APPWRITE service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug, //considering this as document ID
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("APPWRITE service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug //considering this as document ID
      );
      return true;
    } catch (error) {
      console.log("APPWRITE service :: deletePost :: error", error);
    }
  }

  //for single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug //considering this as document ID
      );
    } catch (error) {
      console.log("APPWRITE service :: getPost :: error", error);
      return false;
    }
  }

  async allPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        [Query.equal("status", ["active"])]
      );
    } catch (error) {
      console.log("APPWRITE service :: allPosts :: error", error);
      throw error;
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("APPWRITE service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketID, fileID);
    } catch (error) {
      console.log("APPWRITE service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    return this.storage.getFilePreview(conf.appwriteBucketID, fileID);
  }
}

const service = new Service();

export default service;
