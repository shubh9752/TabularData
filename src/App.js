import React from 'react';
import DataGrid from './DataGrid';

function App() {
  return (
    <div className="App">
      <h2>Posts</h2>
      <DataGrid
        apiEndpoint="https://jsonplaceholder.typicode.com/posts"
        columns={['userId', 'id', 'title', 'body']}
      />
      <h2>Comments</h2>
      <DataGrid
        apiEndpoint="https://jsonplaceholder.typicode.com/comments"
        columns={['postId', 'id', 'name', 'email', 'body']}
      />
    </div>
  );
}

export default App;
