import React, {useState, useEffect} from 'react';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const BlogPost = ({_id, title, summary, cover, content, createdAt, author}) => {
//   const [imageSrc, setImageSrc] = useState('');

//   useEffect(() => {
//   if (cover.data) {
//     const buffer = new Uint8Array(cover.data);
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
//   }, [cover.data]);

  return (
    <div>
        <div className="blog-card">
        <img src={'https://pawsitivelypets-api.onrender.com/'+cover} className="blog-img" alt="blog1"/>
        {/* <img src={imageSrc} className="blog-img" alt="blog1"/> */}
        <h1 className="blog-title">{title}</h1>
        <h3>{author.name}</h3>
        <time>{formatISO9075(new Date(createdAt))}</time>
        <p className="blog-overview">{summary}</p>
        <Link className="blog-btn" to={`/post/${_id}`}>
          <button>Read</button>
        </Link>
        </div>
    </div>
  )
}

export default BlogPost
