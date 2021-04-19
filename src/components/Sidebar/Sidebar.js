import React from 'react';
import { Avatar } from '@material-ui/core';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Sidebar() {
  const  user = useSelector(selectUser)
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="https://cdn.pixabay.com/photo/2015/09/02/10/18/background-918211_960_720.jpg" alt="" />
        <Avatar src={user.photoUrl ? user.photoUrl : ''} className="sidebar__avatar">
          {user.displayName ? user.displayName[0] : ''}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who wiev you</p>
          <p className="sidebar__statNumber">79</p>
        </div>
        <div className="sidebar__stat">
          <p>Wiev on post</p>
          <p className="sidebar__statNumber">105</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem('ReactJS')}
        {recentItem('programming')}
        {recentItem('softwareengenering')}
        {recentItem('design')}
        {recentItem('developer')}
      </div>
    </div>
  )
}

export default Sidebar
