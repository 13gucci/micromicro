import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentCreate from './components/CommentCreate/CommentCreate';
import CommentList from './components/CommentList';

export type Comment = {
    _id: string;
    content: string;
};

type Post = {
    _id: string;
    title: string;
    comments: Comment[];
};

type Posts = {
    [_id: string]: Post;
};

export default function PostList() {
    const [posts, setPosts] = useState<Posts>({});

    const getPost = async () => {
        const response = await axios.get('http://localhost:4002/posts');
        if (response) {
            setPosts(response.data);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => (
        <div style={{ padding: 2, border: '1px solid black' }} key={post._id}>
            <h1>{post.title}</h1>
            <p style={{ fontStyle: 'italic' }}>1 comments</p>
            <CommentList comments={post.comments} />
            <CommentCreate post_id={post._id} />
        </div>
    ));

    return <>{renderedPosts}</>;
}
