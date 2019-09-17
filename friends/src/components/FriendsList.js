import React from 'react';
import Loader from 'react-loader-spinner';
import axiosWithAuth from '../utils/axiosWithAuth.js';
import FriendCard from './FriendCard.js';
import AddFriend from './AddFriend.js';

class FriendsList extends React.Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/friends')
      // .then(res => console.log(res.data))
      .then(res => this.setState({ friends: res.data}))
      .catch(err => console.log(err.response));
  };

  render() {
    if (this.state.friends.length < 1) {
      return <Loader type='TailSpin' color='#00BFFF' height={100} width={100} />
    }

    return (
      <div className='friends'>
        <AddFriend getData={this.getData} />
        <div className='friends-list'>
          Your Friends
        {this.state.friends.length > 0 ? this.state.friends.map(friend => <FriendCard key={friend.id} friend={friend} getData={this.getData} />) : null}
        </div>
      </div>
      
    )
  }
}

export default FriendsList;