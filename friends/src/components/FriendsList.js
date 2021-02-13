import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import '../App.css';


function FriendsList (props) {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState({
        id: Date.now(),
        name: '',
        age: '',
        email: ''
    });

    function handleChanges (e) {
        setNewFriend({...newFriend, [e.target.name]: e.target.value});
    };

    function addNewFriend(e){
        e.preventDefault();
        axiosWithAuth()
            .post('http://localhost:5000/api/friends', newFriend)
            .then(res=> setFriends(res.data))
            .catch(err => console.log('error response in attempt to post new friend: ', err.response));
        setNewFriend({
            id: Date.now(),
            name: '',
            age: '',
            email: ''
        })
    };


    useEffect(() => {

        axiosWithAuth()
        .get('http://localhost:5000/api/friends')
        .then(res => {
            // console.log('friends get response: ', res);
            setFriends(res.data);
        })
        .catch(err => console.log("Uh oh! Error displaying friends: ", err.response.status, err.response.data.error));

    }, []);

    return (
        <div className="here2">
        <h1>MY FAM</h1>
        <div className="fr">
        {friends.map(friend => (
            <p key={friend.id}> {friend.name} is {friend.age} years old and we talk business all the time at {friend.email} ya dig.</p>
        ))}</div>
        <br/>
        <h2>Wanna be a homie??</h2>
        <div className="here">
            <form onSubmit={addNewFriend}>
                <label>Name
                    <br/>
                    <input type='text' name='name' placeholder='Name' value={newFriend.name} onChange={handleChanges}></input>
                </label>
                <br/>
                <label>how old are you?
                    <br/>
                    <input type='number' name='age' value={newFriend.age} placeholder='age' onChange={handleChanges}></input>
                </label>
                <br/>
                <label>Gimme that email ya dig?
                    <br/>
                    <input type='text' name='email' value={newFriend.email} placeholder='email address' onChange={handleChanges}></input>
                </label>
                <br/>
                <button>Join </button>
            </form>
            </div>
        </div>
    );
    
}


export default FriendsList;