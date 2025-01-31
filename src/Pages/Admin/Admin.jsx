import React, { useEffect, useState } from 'react';
import { get } from '../../services/Endpoint';

export default function Admin() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  console.log("Posts:", post);

  useEffect(() => {
    const GetData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is retrieved
        const request = await get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        console.log("API Response:", request.data);
        
        if (request.status === 200) {
          setPost(request.data.Posts);
          setUsers(request.data.Users);
          setComments(request.data.comments);
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message); // Fixed error logging
      }
    };
    GetData();
  }, []);

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{users ? users.length : "0"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Posts</h5>
                <p className="card-text">{post ? post.length : "0"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Comments</h5>
                <p className="card-text">{comments ? comments.length : "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
