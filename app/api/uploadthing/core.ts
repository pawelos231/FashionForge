import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

//ADD MIDDLEWARE FOR USER AUTH LATER

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete((data) =>
    console.log("file", data)
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
