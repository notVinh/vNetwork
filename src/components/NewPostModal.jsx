import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { createNewpost } from "../redux/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewPostModal = ({ openModal, closeModal }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const notify = () => toast("Wow so easy !");

  const handleUploadImage = async () => {
    const downloadUrl = []; // Initialize an empty array to store download URLs

    for (const img of files) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + img.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);

      try {
        // Wait for the upload to complete
        await uploadTask;
        // console.log(`Upload completed for ${fileName}`);

        // Get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        downloadUrl.push(downloadURL);
        // console.log(`Download URL for ${fileName}: ${downloadURL}`);
      } catch (error) {
        // console.error(`Error uploading ${fileName}: ${error}`);
      }
    }

    // Print the final list of download URLs
    // console.log("All uploads completed. Download URLs:");
    const result = [];
    for (const url of downloadUrl) {
      // console.log(url);
      // setImage([...image, url]);
      result.push(url);
    }
    return result;
  };

  const handleSubmit = async () => {
    if (content === "") {
      toast.error("Type something");
      return;
    }
    setLoading(true);

    await handleUploadImage().then((imgUrl) => {
      const postCredentials = {
        content: content,
        image: imgUrl,
      };

      // console.log(postCredentials);
      dispatch(createNewpost(postCredentials)).then((ok) => {
        console.log(ok);
        setContent(null);
        setFiles([]);
        setLoading(false);
        closeModal();
        navigate(0);
        toast.success("Post successfully");
      });
    });
  };

  return (
    <>
      <div
        className={`bg-black bg-opacity-30 fixed z-50 top-0 right-0 bottom-0 left-0 w-full h-full m-auto flex justify-center items-center ${
          !openModal && "hidden"
        }`}
        onClick={closeModal}
      ></div>
      <div
        className={`bg-light-2 dark:bg-dark-3 border-8 text-text-light-1 dark:text-text-dark-1 dark:border-dark-5 xl:w-[700px] xl:h-[700px] flex rounded-xl justify-between fixed z-50 -50 top-0 right-0 bottom-0 left-0 mx-5 my-5 xl:m-auto ${
          !openModal && "hidden"
        }`}
      >
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between p-3 w-full items-center">
            <div className="border-b flex items-center font-bold text-text-light-2 dark:text-text-dark-2">
              Create New Post
            </div>
            <div
              className="w-12 h-12 rounded-full border-light-3 dark:border-dark-5 border-2  p-2 hover:bg-[#877eff] hover:cursor-pointer group"
              onClick={closeModal}
            >
              <img
                src="/assets/icons/close1.svg"
                alt=""
                className=" group-hover:invert-white "
              />
            </div>
          </div>
          <div className="h-full w-full flex flex-col gap-8 flex-1">
            <div className="h-[350px] w-full ">
              <ReactQuill
                className=" border-none h-full"
                theme="snow"
                placeholder="What are you thinking? ..."
                required
                value={content}
                onChange={(value) => setContent(value)}
              />
            </div>

            <div className="w-full flex flex-col p-5 flex-1 border-t-2 border-light-3 dark:border-dark-5">
              <div className="flex h-[100px] w-full flex-wrap my-2 overflow-auto gap-4 ">
                {files.map((img) => (
                  <div
                    className="relative w-28 h-28 object-cover rounded"
                    key={img.name}
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className=" w-28 h-28 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        setFiles(
                          files.filter((item) => item.name !== img.name)
                        );
                      }}
                      className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-text-dark-1 bg-black text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 hover:text-black rounded-full p-1"
                    >
                      <span className="mx-auto">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="mx-3">
              <label htmlFor="imgupload" className="flex justify-end w-fit">
                <div className="w-12 h-12 rounded-full border-light-3 dark:border-dark-5 border-2  p-2 hover:bg-[#877eff] hover:cursor-pointer group">
                  <img
                    src="/assets/icons/attach.svg"
                    alt=""
                    className=" group-hover:invert-white "
                  />
                </div>
              </label>
              <input
                id="imgupload"
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={(e) => {
                  const item = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    item.push(e.target.files[i]);
                  }
                  setFiles(item);
                  // handleUpdloadImage(files);
                }}
              />
            </div>
            <button
              className=" px-10 py-2 rounded-full m-3 border-2 border-light-3 dark:border-dark-5 hover:bg-[#877eff] hover:text-light-1"
              onClick={handleSubmit}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(NewPostModal);
