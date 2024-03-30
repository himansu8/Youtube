import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper1 = styled.div`
//flex: 1;
 width:200px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter}; 
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  display: flex;
`;
const Image = styled.img`
 width:100px;
  height: 100px;
  border-radius:50%;
margin-left:40px;
`;

const Wrapper2 = styled.div`
 //flex: 2;
 width:600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const SignUp = ({ setOpen }) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    img: ""
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  };


  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/himansu8/image/upload", data)
      console.log(uploadRes.data.url)
      const { url } = uploadRes.data;
      console.log(url)
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("/auth/signup", newUser);
      navigate("/")
      console.log("navigate ok")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Wrapper1>
        <Image src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
      </Wrapper1>
      <Wrapper2>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Sign Up For ApnaTube</Title>
        <Label>Image:</Label>
        <Input
          type="file"
          name="img"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Label>Full Name:</Label>
        <Input name="name" placeholder='Enter Your Name' onChange={handleChange} />
        <Label>Email:</Label>
        <Input type="email" name="email" placeholder='Enter Your Email' onChange={handleChange} />
        <Label>Password:</Label>
        <Input type='password' name="password" placeholder='Password' onChange={handleChange} />

        <Button onClick={handleSubmit}>Upload</Button>
      </Wrapper2>
    </Container>
  );
};

export default SignUp;