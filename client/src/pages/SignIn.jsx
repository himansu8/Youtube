import axios from 'axios';
import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;
function SignIn() {
  //let navigate = useNavigate()
  let [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  

  function onChangeHandler(e) {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e) {
    try {
      e.preventDefault();
      let res = await axios.post('auth/signin',loginInfo)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>To continue to ApnaTube</SubTitle>
        <Input name="name" placeholder='username' onChange={onChangeHandler} />
        <Input type='password' name="password" placeholder='password' onChange={onChangeHandler} />
        <Button onClick={onSubmit}>Sign In</Button>
        <Title>Or</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Term</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn