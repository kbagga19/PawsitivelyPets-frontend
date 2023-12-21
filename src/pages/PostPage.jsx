import React, {useEffect, useState} from 'react';
import '../styles/PostPage.css';
import { useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import Navbar from '../components/Navbar';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    // const [imageSrc, setImageSrc] = useState('');

    const {id} = useParams();
    useEffect(() => {
        fetch(`https://pawsitivelypets-api.onrender.com/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
                // if (postInfo.cover) {
                //     const buffer = new Uint8Array(postInfo.cover.data);
                //     const CHUNK_SIZE = 8192; // Process 8KB chunks

                //     let binary = '';
                //     const len = buffer.byteLength;
                //     let start = 0;

                //     while (start < len) {
                //         const end = Math.min(start + CHUNK_SIZE, len);
                //         const chunk = new Uint8Array(buffer.slice(start, end));
                //         binary += String.fromCharCode.apply(null, chunk);
                //         start = end;
                //     }

                //     const base64Image = btoa(binary);
                //     setImageSrc(`data:image/png;base64,${base64Image}`);
                // }
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
        {/* <img src={imageSrc} alt="" /> */}
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
