import React, {useState} from "react";
import "./App.css";
function App() {
  const [username, setUsername] = useState('');
  const [resData, setResData] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
     fetch("https://api.github.com/users/" + username)
    .then(response => response.json())
    .then(data => {
      console.table(data);
      setResData(data);
    });
    
    setUsername('');

  }
  return (
    <div className="container">
      <form action="/" onSubmit={handleSubmit} className="formCard">
          <input type="text" onChange={handleUsernameInput} value={username} />
          <button>Submit</button>
      </form>
      {resData.message}
      {resData && (resData.message !== "Not Found") && (
        <div className="userDetailCard">
          <div className="userDetailBody">
              <p className="name">{resData.name}</p>
              <em className="username">{resData.login}</em>
              <div className="follow">
                <p>Followers: {resData.followers}</p>
                <p  style={{borderRight: "2px solid white",}}></p>
                <p >Following: {resData.following}</p>

              </div>
              <div className="profDetails">
                <p>🏢{resData.company}</p>
                <p>✍️ {resData.bio}</p>
                <p>🏠{resData.location}</p>
              </div>
                
          </div>
          <div className="userImg">
              <img src={resData.avatar_url} alt="avatar" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
