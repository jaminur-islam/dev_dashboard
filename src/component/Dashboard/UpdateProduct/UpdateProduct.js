import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:5000/products2/${id}`).then((result) => {
      setProduct(result.data);
      reset({ name, price, description, availability });
    });
  }, []);

  // generate slug
  const [slug, setSlug] = useState("");
  console.log(slug);
  const handleSlug = (e) => {
    const text = e.target.value;
    const slug = text.toLowerCase().trim().replace(/ /g, "-");
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

    var generateSlug = "";
    for (var i = 0; i < 8; i++) {
      generateSlug += chars[Math.floor(Math.random() * chars.length)];
    }
    setSlug(slug + "-" + generateSlug);
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (updateData) => {
    const NewUpdateData = { ...updateData, slug };
    console.log(id);
    axios
      .put(`http://localhost:5000/products2/${id}`, NewUpdateData)
      .then((result) => {
        console.log(result.data);
        if (result.data.modifiedCount) {
          alert("updated successfully");
          navigate("/dashboard/productManage");
        }
      });
  };

  const { name, price, description, availability } = product || {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        margin: "40px",
        width: "50%",
      }}
    >
      <h1> update products</h1>
      <label htmlFor="name">Product Name</label>
      <input defaultValue={name} {...register("name")} onBlur={handleSlug} />

      <label htmlFor="name">Product Price</label>
      <input defaultValue={price} {...register("price")} />

      <label htmlFor="name">Product availability </label>
      <input defaultValue={availability} {...register("availability")} />

      <label htmlFor="name">Product description </label>
      <textarea defaultValue={description} {...register("description")} />

      <input type="submit" />
    </form>
  );
};

export default UpdateProduct;
