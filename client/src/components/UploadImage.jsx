import { InputLabel } from "@mui/material";
import React, { useState } from "react";

export default function UploadImage({ imageURL, onImageChange }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const getBaseUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5000";
    } else {
      return "https://decohoatest-server.vercel.app";
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    fetch(`${getBaseUrl()}/uploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setUploadedImage(data.url);
        onImageChange(data.url);
        alert("Image uploaded Successfully");
      })
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    fetch(`${getBaseUrl()}/uploadMultipleImages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data);
        alert("Image uploaded Successfully");
      })
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }

  const uploadImages = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64, imageURL);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  function UploadInput() {
    return (
      <div style={{ flex: 1, fontSize: "20px" }}>
        <InputLabel>Add image: </InputLabel>
        <br />
        <input
          style={{ fontSize: "20px" }}
          label="Add image"
          type="file"
          onChange={uploadImages}
        />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, fontSize: "20px" }}>
      <div>
        <div>
          {url && (
            <div>
              Access your file at{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
          )}
        </div>
        {uploadedImage && (
          <div>
            <img
              src={uploadedImage}
              alt="uploaded"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <img
              src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
              alt="loading"
            />
          </div>
        ) : (
          <UploadInput />
        )}
      </div>
    </div>
  );
}
