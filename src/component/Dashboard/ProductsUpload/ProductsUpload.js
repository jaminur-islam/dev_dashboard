import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  // upload form style
  upload_form: {
    width: "50%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    "& input": {
      padding: "10px",
    },
  },
});

const ProductsUpload = () => {
  const classes = useStyle();
  const [imgUrl, setImgUrl] = useState("");
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (formData) => {
    setFormData(formData);
    uploadImgOnImgBb(formData.imgFile[0]);
    reset();
  };
  // upload img
  const uploadImgOnImgBb = (uploadImg) => {
    const fd = new FormData();
    fd.append("image", uploadImg, uploadImg.name);
    axios
      .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMGBB_API}`,
        fd
      )
      .then((result) => {
        setImgUrl(result?.data?.data?.display_url);
      });
  };
  useEffect(() => {
    if (imgUrl) {
      delete formData.imgFile;
      const newFormData = { ...formData, imgUrl };

      axios
        .post("https://aqueous-falls-80276.herokuapp.com/upload", newFormData)
        .then((result) => {
          if (result.data.acknowledged) {
            alert("uploaded products successfully");
            setImgUrl("");
          }
        });
    }
  }, [imgUrl]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.upload_form}>
      <h1>Upload product</h1>
      <input
        type="text"
        placeholder="product title *"
        {...register("title", { required: true })}
      />
      <input
        placeholder="Slug"
        type="text"
        {...register("slug", { required: true })}
      />
      <input
        placeholder="price"
        type="number"
        {...register("price", { required: true })}
      />
      <textarea
        placeholder="description"
        type="text"
        {...register("description", { required: true })}
      />

      <input
        placeholder="Availability"
        type="number"
        {...register("availability", { required: true })}
      />

      <input
        placeholder="Category"
        type="text"
        {...register("category", { required: true })}
      />
      <input type="file" {...register("imgFile", { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default ProductsUpload;
