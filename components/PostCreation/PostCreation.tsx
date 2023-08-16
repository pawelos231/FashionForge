"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Button } from "@UI/Button";
import QuillTextEditor from "./Editor";
import Customizer from "./Customizer";
import { useCallback } from "react";
import { PostValidator, PostRequest } from "@lib/validators/postCreation";
import { useMutation } from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import { wait } from "@utils/wait";
import useLocalStorage from "@hooks/useLocalStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "@utils/token";

interface PostCreationProps {}

type SuccessfulPostCreation = {
  message: string
  accessToken: string | null
}

const PostCreation: React.FC<PostCreationProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [viewProjectOpen, setViewProjectOpen] = useState<boolean>(false);
  const {storage: accessToken, setStorage} = useLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_NAME)

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }, // Get the form validation errors
  } = useForm<PostRequest>({
    resolver: yupResolver(PostValidator),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const clearInputs = () => {
    handleContentChange("")
    setValue("content", "")
    setValue("title", "")
  }

  const {mutate: sendPost, isLoading} = useMutation({
    mutationFn: async ({title, content}: PostRequest) => {
        const payload: PostRequest = {title, content}
        await wait(1000) //for debug 

        const headers = {
          Authorization: accessToken, 
        };

        const {data} = await axios.post("/api/posts/create", payload, {headers})
        return data
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        } if (err.response?.status === 401) {
          console.log("unathorized")
        }
      }
    },
    onSuccess: (data: SuccessfulPostCreation) => {
      console.log(data)
      clearInputs()
      if(data.accessToken) setStorage(data.accessToken)
    },
  })


  const handleContentChange = useCallback((value: string) => {
    setValue("content", value);
  }, []);

  const handleChangeProjectViewState = useCallback((val: boolean) => {
    setViewProjectOpen(val);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  const handlePostSubmit = async () => {
    sendPost({title: watch("title"), content: watch("content")});
  };

  return (
    <>
      {!viewProjectOpen ? (
        <form
          className="flex flex-col items-center py-8 w-full"
          onSubmit={handleSubmit(handlePostSubmit)}
        >
          <h2 className="text-3xl font-semibold mb-6">Create a New Post</h2>
          <div className="w-[45%] bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                {...register("title")}
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter post title"
              />
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
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
              <QuillTextEditor
                HandleChange={handleContentChange}
                {...register("content")}
              />
              {errors.content && (
                <div className="text-red-500">{errors.content.message}</div>
              )}
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
              isLoading={isLoading}
            >
              Submit Post
            </Button>
          </div>
        </form>
      ) : (
        <div className="w-full absolute h-full backdrop-blur-3xl">
          <Customizer changeView={handleChangeProjectViewState} />
        </div>
      )}
    </>
  );
};

export default PostCreation;
