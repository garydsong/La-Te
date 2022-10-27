import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="user-page-wrapper">
        <div className="user-page-top-wrapper">
          <div className="user-page-container">
            <div className="cover-img-wrapper">
              <img id="user-page-cover-img" src={user.cover_img} />
            </div>
            <div className="avatar-wrapper">
              <img id="user-page-avatar" src={user.avatar} />
              <div className="user-page-top-name-container">
                <div className="user-page-top-name">{user.first_name} {user.last_name}</div>
                <div>la-te.com/{user.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
