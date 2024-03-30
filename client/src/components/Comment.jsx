import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { format } from 'timeago.js';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Details = styled.div`
display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;
const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;
function Comment({ comment, currentUser, videoOwnerId }) {
  const [channel, setChannel] = useState({});
  const [comments, setComments] = useState([]);
  //console.log(currentUser)
  const days = comment.createdAt
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);
  async function handleDelete() {
    try {
      await axios.delete(`/comments/${comment._id}`);
       window.location.reload();
    } 
      catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>{channel.name} <Date>{format(days)}</Date>
          {(comment?.userId === currentUser?._id || videoOwnerId === currentUser?._id) &&
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          }
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment