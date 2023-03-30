import React from 'react';
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const BlogPost = ({_id, title, summary, cover, content, createdAt, author}) => {
  return (
    <div>
        <div className="blog-card">
        <img src={'http://pawsitivelypets-api.onrender.com/'+cover} className="blog-img" alt="blog1"/>
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
