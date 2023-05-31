import React from 'react';
import DataGrid from './DataGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'><h2>Posts</h2></div>
      <DataGrid
        apiEndpoint="https://jsonplaceholder.typicode.com/posts"
        columns={['userId', 'id', 'title', 'body']}
      />
      <div className='container'><h2>Comments</h2></div>
      <DataGrid
        apiEndpoint="https://jsonplaceholder.typicode.com/comments"
        columns={['postId', 'id', 'name', 'email', 'body']}
      />
    </div>
  );
}

export default App;
