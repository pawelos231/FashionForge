"use client";

import React, { useState } from "react";
import { Button } from "@UI/Button";
import QuillTextEditor from "./Editor";
import Customizer from "./Customizer";
import { useCallback } from "react";

interface PostCreationProps {}

const PostCreation: React.FC<PostCreationProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [project, setProject] = useState<any>("");
  const [viewProjectOpen, setViewProjectOpen] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleChangeProjectViewState = useCallback((val: boolean) => {
    setViewProjectOpen(val);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    setImageFile(file || null);
  };

  const handleProjectChange = () => {};

  const handlePostSubmit = () => {
    // Handle post submission logic here
    console.log("Post submitted:", { title, content, imageFile });
  };

  return (
    <>
      {!viewProjectOpen ? (
        <div className="flex flex-col items-center py-8 w-full">
          <h2 className="text-3xl font-semibold mb-6">Create a New Post</h2>
          <div className="w-[45%] bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Select Project
              </label>

              <Button
                onClick={() => handleChangeProjectViewState(!viewProjectOpen)}
              >
                CreateProject
              </Button>
            </div>
            <div className="mb-6 h-[80%]">
              <label className="block text-sm font-medium mb-2">Content</label>
              <QuillTextEditor HandleChange={handleContentChange} />
            </div>

            {/*
        <div className="mb-6">
          <label htmlFor="file-upload" className="filepicker-label">
            Upload File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        */}

            <Button
              variant="outline"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={handlePostSubmit}
            >
              Submit Post
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full absolute h-full backdrop-blur-3xl">
          <Customizer changeView={handleChangeProjectViewState} />
        </div>
      )}
    </>
  );
};

export default PostCreation;
