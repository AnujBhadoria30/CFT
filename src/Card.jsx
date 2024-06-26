import React, { useState, useEffect } from 'react';

export default function Card({ id, title, body, onDelete }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [id]);

  function handleAddComment() {
    const commentToAdd = { id: comments.length + 1, name: newComment };
    setComments([...comments, commentToAdd]);
    setNewComment('');
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <div className='card-container'>
      <div className='Card'>
        <span className='Cross' onClick={handleDelete}><p>X</p></span>
        <h2>{title}</h2>
        <p>{body}</p>
        {/* <span>{id}</span> */}
      </div>
      <div className='comment'>
        <h3>Comments:</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <div>{comment.name}</div>
            </li>
          ))}
        </ul>
        <div>
          <input
            type='text'
            placeholder='Add a comment...'
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}
