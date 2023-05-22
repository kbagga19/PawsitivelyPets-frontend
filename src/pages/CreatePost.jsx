import React, {useEffect} from 'react'
import '../styles/Editor.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import NavBar from '../components/Navbar'

const modules = {

    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export default function CreatePost() {
  const [username, setUsername] = useState(null);
    const {id} = useParams();
  const [Token, setToken] = useState(null);
  
  const navigate = useNavigate();  
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('token', Token);
    
    ev.preventDefault();
    const response = await fetch('https://pawsitivelypets-api.onrender.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
    });
    if (response.ok) {
      navigate("/blog");
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch ('https://pawsitivelypets-api.onrender.com/profile',{
       method: "POST",
        crossDomain: true,
        headers: {'Content-Type':'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },    
        body: JSON.stringify({
            token
        }),
        })
          .then((res) => res.json())
          .then((data) => {
                console.log(data);
                let usname = data.data.name;
                setUsername(usname);
                setToken(token);
            });
  }, [])
  

  return (
    <>
    <NavBar/>
    <div className='createpostheading'><h1>Hello {username}, What's on your mind?</h1></div>
    <div className="createpost">
    <form className="writeBlogForm" onSubmit={createNewPost }>
        <input type="title"
                placeholder={'Title'} 
                value={title} 
                onChange={ev => setTitle(ev.target.value)}/>
        <input type="summary" 
                placeholder={'Summary'} 
                value={summary} 
                onChange={ev => setSummary(ev.target.value)}/>         
        <input type="file" onChange={ev => setFiles(ev.target.files)}/>
        <ReactQuill className="blogContent" value={content} 
            onChange={newValue => setContent(newValue)} 
            modules={modules} 
            formats={formats}/>
        <button className="createpostbtn" style={{marginTop:'5px'}}>Create Post</button>
    </form>
    </div>
    </>
  )
}

 
