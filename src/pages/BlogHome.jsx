import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/BlogHome.css';
import {Link} from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('https://pawsitivelypets-api.onrender.com/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });

    fetch ('https://pawsitivelypets-api.onrender.com/profile',{
        method: "POST",
        crossDomain: true,
        headers: {'Content-Type':'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },    
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        }),
        })
          .then((res) => res.json())
          .then((data) => {
                console.log(data);
                let usname = data.data.name;
                setUsername(usname);
            });
  }, []);

  return (
    <div>
        <Navbar/>
        {
          username && (
            <div class="write-a-blog-btn">
              <span><Link to={"/create"}>WRITE A BLOG</Link></span>
            </div>
          )
        }
        {
          !username && (
            <div class="write-a-blog-btn" onClick={() => {
                alert("Login to write a Blog!");
            }}>
              <span>WRITE A BLOG</span>
            </div>
          )
        }
        <section class="blogs-section">
            {posts.length > 0 && posts.map(post => (
              <BlogPost {...post}/>
            ))}
        </section>
    </div>
  )
}

export default BlogHome
