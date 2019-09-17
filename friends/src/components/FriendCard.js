import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
// import { Card } from 'semantic-ui-react';

const FriendCard = ({friend, getData }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedFriend, setEditedFriend] = useState({
    name: friend.name,
    age: friend.age,
    email: friend.email
  })

  const handleChange = event => {
    setEditedFriend({ ...editedFriend, [event.target.name]: event.target.value })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleUpdate = (event, id) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/friends/${id}`, editedFriend)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response));
    toggleEdit();
    // axiosWithAuth()
    //   .post(`http://localhost:5000/api/friends/${id}`, editedFriend)
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => console.log(err.response));
    getData();
  }

  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => console.log('handleDelete', res.data))
      .catch(err => console.log(err.response));
    getData();
  }

  if (isEditing) {
    return (
      <div className='edit-friend-form'>
        <form onSubmit={(event) => handleUpdate(event, friend.id)}>
          <h2>Add a Friend</h2>
          <input
            type='text'
            name='name'
            placeholder='name'
            onChange={handleChange}
            value={editedFriend.name}
          />
          <input
            type='text'
            name='age'
            placeholder='age'
            onChange={handleChange}
            value={editedFriend.age}
          />
          <input
            type='email'
            name='email'
            placeholder='email'
            onChange={handleChange}
            value={editedFriend.email}
          />
          <button type='submit'>Update Friend Info</button>
        </form>
        <button onClick={toggleEdit}>Back</button>
      </div>
    )
  }

  return (
    <div className='friend-card'>
      <h3>{friend.name}</h3>
      <h4>{friend.age}</h4>
      <h4>{friend.email}</h4>
      <button onClick={toggleEdit}>{isEditing ? 'Update Friend Info' : 'Edit Friend Info'}</button>
      <button onClick={() => handleDelete(friend.id)}>Delete</button>
    </div>
  )
}

export default FriendCard;