import React, {useEffect, useState} from 'react';
import '../styles/PostPage.css';
import { useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import Navbar from '../components/Navbar';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://pawsitivelypets-api.onrender.com/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    },[]);

    if(!postInfo) return '';

  return (
    <>
    <Navbar/>
    <div>
    <div className="banner">
        <img src={`https://pawsitivelypets-api.onrender.com/${postInfo.cover}`}/>
    </div>
    <div class="blog">
        <h1 class="postTitle">{postInfo.title}</h1>
        <p class="published"><span>{postInfo.author.name}</span></p>
        <p class="published"><span>{formatISO9075(new Date(postInfo.createdAt))}</span></p>
        <div class="article" dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
    </div>
    </>
  )
}

export default PostPage
