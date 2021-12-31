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
    "& input , textArea": {
      padding: "10px",
    },
  },
});

const ProductsUpload = () => {
  const classes = useStyle();
  const [imgUrl, setImgUrl] = useState("");
  const [formData, setFormData] = useState({});

  // generate slug
  const [slug, setSlug] = useState("");
  const handleTitle = (e) => {
    const title = e.target.value;
    const slug = title?.trim().toLowerCase().replace(/ /g, "-");

    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

    var generateSlug = "";
    for (var i = 0; i < 8; i++) {
      generateSlug += chars[Math.floor(Math.random() * chars.length)];
    }
    setSlug(slug + "-" + generateSlug);
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (formData) => {
    console.log(formData);
    setFormData(formData);
    uploadImgOnImgBb(formData.imgFile[0]);
  };
  // upload img
  const uploadImgOnImgBb = (uploadImg) => {
    const uploadForm = new FormData();
    uploadForm.set("key", process.env.REACT_APP_IMGBB_API);
    uploadForm.append("image", uploadImg, uploadImg.name);

    const url = "https://api.imgbb.com/1/upload";
    axios.post(`${url} `, uploadForm).then((result) => {
      setImgUrl(result?.data?.data?.display_url);
      console.log(result.data);
    });
  };
  useEffect(() => {
    if (imgUrl) {
      delete formData.imgFile;
      delete formData.InputSlug;
      const newFormData = { slug, ...formData, imgUrl };
      console.log(newFormData);
      setSlug("");
      reset();

      axios
        .post(
          "https://aqueous-falls-80276.herokuapp.com/addProduct",
          newFormData
        )
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
        placeholder="product name *"
        {...register("name", { required: true })}
        onBlur={handleTitle}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          style={{ width: "80%" }}
          placeholder="Slug"
          value={slug.length > 9 ? slug : ""}
          type="text"
          {...register("InputSlug")}
        />

        <button>generate slug</button>
      </div>

      <input
        placeholder="price"
        type="text"
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
      <input
        placeholder="Rating"
        type="text"
        {...register("rating", { required: true })}
      />
      <input
        placeholder="Review"
        type="number"
        {...register("review", { required: true })}
      />
      <input type="file" {...register("imgFile", { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default ProductsUpload;
