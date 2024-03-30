import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

function Comments({ videoId , videoOwnerId}) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [info, setInfo] = useState({
    videoId: videoId,
    desc: ""
  })

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { }
    };
    fetchComments();
  }, [videoId]);

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const newComment = {
        ...info,
        desc: newCommentText,
      };
      await axios.post("/comments", newComment);
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
      setNewCommentText("")
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder='Add a comment' value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </NewComment>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} currentUser={currentUser} videoOwnerId={videoOwnerId} />
      ))}

    </Container>
  )
}

export default Comments