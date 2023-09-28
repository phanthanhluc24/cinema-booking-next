"use client";
import React, { useState ,useRef} from "react";
import { Form, Input, Button ,FormInstance} from "antd";
import { toast } from "react-toastify";
import { IP_URL } from "@/config";
import Navbar from "../navbar";
export default function Create() {
  const formRef=useRef<FormInstance | null>(null)

  interface newMovie {
    title: string;
    release_date: Date;
    genre: string;
    director: string;
    actors: string;
    duration: string;
    language: string;
    country: string;
    price: string;
    movie_url: string;
    image: string;
    description: string;
  }

  const [movie, setMovie] = useState<newMovie>({
    title: "",
    release_date: new Date(),
    genre: "",
    director: "",
    actors: "",
    duration: "",
    language: "",
    country: "",
    price: "",
    movie_url: "",
    image: "",
    description: "",
  });
  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...movie, [e.target.name]: e.target.value };
    setMovie(data);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMovie({ ...movie, description: e.target.value });
  };
  const handleSubmitForm = () => {
    fetch(IP_URL + "admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.status == 201) {
          toast.success("Add new movie success!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          if (formRef.current) {
            formRef.current.resetFields();
          }
        }
      })
      .catch(() => {
        toast.warning("Add new movie fail please try again!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };
  return (
    <>
      <div className="mx-auto h-screen flex">
        <div className="w-1/4 bg-gray-700 mr-5">
         <Navbar/>
        </div>
        <div className="w-3/4">
          <div className="mx-auto w-3/3 mr-5 shadow-lg">
            <Form action="" onFinish={handleSubmitForm} method="post" ref={formRef}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold mb-2 block text-gray-500 text-lg"
                    >
                      Name of movie
                    </label>
                    <Form.Item
                      name="title"
                      rules={[
                        { required: true, message: "Name movie is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="title"
                        type="text"
                        className="text-gray-500 outline-none shadow  appearance-none rounded py-2 px-3 w-full focus:outline-none focus:shadow-none"
                        placeholder="Enter name of movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block font-bold mb-2 text-gray-500 text-lg"
                    >
                      Genre
                    </label>
                    <Form.Item
                      name="genre"
                      rules={[{ required: true, message: "Genre is required" }]}
                      hasFeedback
                    >
                      <Input
                        type="text"
                        name="genre"
                        className="text-gray-500 outline-none rounded py-2 px-3 w-full focus:outline-none focus:shadow-none shadow"
                        placeholder="Enter genre of movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block text-gray-500 font-bold mb-2 text-lg"
                    >
                      Language
                    </label>
                    <Form.Item
                      name="language"
                      rules={[
                        {
                          required: true,
                          message: `Field language is required`,
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        type="text"
                        name="language"
                        className="rounded  outline-none w-full text-gray-500 py-2 px-3 focus:outline-none focus:shadow-none"
                        placeholder="Enter language of movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Country
                    </label>
                    <Form.Item
                      name="country"
                      rules={[
                        { required: true, message: "Country is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="country"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter country create movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Actors
                    </label>
                    <Form.Item
                      name="actors"
                      rules={[
                        { required: true, message: "Actors is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="actors"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="You can enter more actors"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-span-1 mt-1.5">
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Release date
                    </label>
                    <Form.Item
                      name="release_day"
                      rules={[
                        { required: true, message: "Release date is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        type="date"
                        name="release_day"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter release date movie"
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Duration
                    </label>
                    <Form.Item
                      name="duration"
                      rules={[
                        { required: true, message: "Duration is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="duration"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter duration create movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Price
                    </label>
                    <Form.Item
                      name="price"
                      rules={[{ required: true, message: "Price is required" }]}
                      hasFeedback
                    >
                      <Input
                        name="price"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter price of movie"
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Movie url
                    </label>
                    <Form.Item
                      name="movie_url"
                      rules={[
                        { required: true, message: "Movie url is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="movie_url"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter movie url movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Image url
                    </label>
                    <Form.Item
                      name="image"
                      rules={[
                        { required: true, message: " Image url is required" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="image"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter mage url create movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Director
                    </label>
                    <Form.Item
                      name="director"
                      rules={[
                        {
                          required: true,
                          message: " Director url is required",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="director"
                        type="text"
                        className="text-gray-500 w-full rounded px-3 py-2  shadow focus:outline-none outline-none focus:shadow-none"
                        placeholder="Enter director of movie"
                        onChange={handleInputForm}
                      ></Input>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="text-gray-500 text-lg font-bold">
                  Description
                </label>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Description is required" },
                  ]}
                  hasFeedback
                >
                  <Input.TextArea
                    rows={4}
                    name="description"
                    className="rounded outline-none shadow text-gray-500  focus:outline-none focus:shadow-none"
                    placeholder="Enter description of the movie"
                    onChange={handleTextArea}
                  ></Input.TextArea>
                </Form.Item>
              </div>

              <div className="flex justify-center items-center gap-3 ">
                <Button
                  htmlType="submit"
                  className="uppercase text-white bg-green-500"
                >
                  Create
                </Button>{" "}
                <Button
                  htmlType="button"
                  className="uppercase text-white bg-gray-500"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
