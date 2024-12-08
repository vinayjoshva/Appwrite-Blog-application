import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-slate-50 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-56 mx-auto"
          />
        </div>
        <h2 className="text-lg uppercase text-center font-medium text-rose-600">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
