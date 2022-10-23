import React from "react"
import regeneratorRuntime from "regenerator-runtime";
import uniqid from 'uniqid'
import { useState, useEffect, useRef } from "react"

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [currentUserPosts, setCurrentUserPosts] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  const headerRef = useRef()

  useEffect(() => {
    getUsers()
    getPosts()
  }, [])

  let getUsers = async () => {
    let url = 'https://jsonplaceholder.typicode.com/users'

    let response = await fetch(url)
    let data = await response.json()
    
    setUsers(data)
  }

  let getPosts = async () => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    let response = await fetch(url)
    let data = await response.json()
    setPosts(data)
  }
  
  let displayUserPosts = (userId, name) => {
    setCurrentUser(name)
    headerRef.current.textContent = "Let's See What They're Saying...Anyone speak Latin?"
    let currentPosts = posts.filter(post => post.userId == userId)
    setCurrentUserPosts(currentPosts)
  }

  return (
    <React.Fragment>
      <header>
        <h1 ref={headerRef}>Let's See What They're Saying</h1>
      </header>

      <div className="users-container" data-users-container="">
        {users.map(user => {
          let name = user.name
          let userId = user.id
          return (
            <div className="users-item" data-user-id={userId} key={uniqid()} onClick={() => displayUserPosts(userId, name)}>
              {name}
            </div>
          )
        })}
      </div>

      <div className="posts-container" data-posts-container="">
        <h2 style={{marginBottom: "1.5rem"}}>
          {currentUser ? `${currentUser} says` : ""}
        </h2>
        {currentUserPosts.map(post => {
          let title = post.title
          let body = post.body
          return (
            <React.Fragment key={uniqid()}>
              <h3>{title}</h3>
              <li style={{marginBottom: "1rem"}}>{body}</li>
            </React.Fragment>
          )
        })}
      </div>
    </React.Fragment>
    
  )
}

export default App