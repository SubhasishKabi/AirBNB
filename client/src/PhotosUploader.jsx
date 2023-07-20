import React, { useState } from "react";
import axios from "axios";
import upload from "./assets/icons/upload.svg";
import trash from "./assets/icons/trash.svg";
import star from "./assets/icons/star.svg";
import starsolid from "./assets/icons/starsolid.svg";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    // console.log(fileName);

    onChange((prev) => {
      return [...prev, fileName];
    });

    setPhotoLink("");
  }

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let file in files) {
      data.append("photos", files[file]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: fileNames } = response;
        console.log(fileNames);
        onChange((prev) => {
          return [...prev, ...fileNames];
        });
      })
      .catch((err) => console.log(err));
  };
  //   const [addedPhotos, setAddedPhotos] = useState([]);

  //addedPhotos are basically photo link
  const removePhoto = (e, fileName) => {
    e.preventDefault();

    onChange([...addedPhotos.filter((photo) => photo !== fileName)]);
  };

  const selectAsMainPhoto = (e, fileName) => {
    e.preventDefault();

    const newAddedPhotos = [
      fileName,
      ...addedPhotos.filter((photo) => photo != fileName),
    ];
    onChange(newAddedPhotos);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link.."
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((link) => {
            return (
              <div key={link} className="relative">
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  className="rounded-2xl w-full h-full object-cover"
                />
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="absolute bottom-2 right-2  bg-white/[0.6] rounded-full p-1"
                >
                  <img src={trash} className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => selectAsMainPhoto(e, link)}
                  className="absolute bottom-2 left-2  bg-white/[0.6] rounded-full p-1"
                >
                  {link === addedPhotos[0] && (
                    <img src={starsolid} className="w-5 h-5" />
                  )}
                  {link !== addedPhotos[0] && (
                    <img src={star} className="w-5 h-5" />
                  )}
                </button>
              </div>
            );
          })}
        <label className="border bg-transparent rounded-2xl p-4 text-2xl text-gray-500 flex flex-col items-center justify-center cursor-pointer ">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <img src={upload} className=" w-5 h-5" />
          <p className="text-sm">Upload</p>
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
