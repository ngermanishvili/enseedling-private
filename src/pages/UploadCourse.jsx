import React, {useState} from "react";
import axios from "axios";
import LayoutDashboard from "../layout/Layout";

const uploadFile = async (files) => {
  const formData = new FormData();

  // convert files object to an array
  const filesArray = Array.from(files);

  filesArray.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await axios.post(
      "http://localhost:4000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status === "success") {
      console.log("File uploaded successfully");
      // Clear the input field after successful upload
      document.getElementById("fileInput").value = "";
    }
  } catch (err) {
    console.log(err);
  }
};

const UploadCourse = () => {
  const onFileChange = (e) => {
    uploadFile(e.target.files);
  };
  const imageUrl =
    "https://testbucket333123.s3.eu-north-1.amazonaws.com/uploads/6e8ccccc-cf50-4571-af27-a2d6879d2728-intership.png";
  const videoUrl =
    "https://testbucket333123.s3.eu-north-1.amazonaws.com/uploads/6e0201c0-3ffb-42d7-bc4c-d1e6d252e9a3-backgroundvideo.mp4";
  return (
    <>
      {/* Give the file input an ID for easy access */}
      <input type="file" id="fileInput" onChange={onFileChange} multiple />
      <button onClick={UploadCourse}>Upload Course</button>
      <h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt vero
        neque ipsum? Expedita nobis aperiam mollitia fuga modi esse quae veniam,
        vitae impedit, deleniti pariatur nisi, aliquam natus explicabo corrupti?
      </h1>
      <img src={imageUrl} alt="Uploaded Image" />
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default UploadCourse;
