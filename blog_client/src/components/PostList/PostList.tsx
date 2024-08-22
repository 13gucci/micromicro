import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentCreate from './components/CommentCreate/CommentCreate';
import CommentList from './components/CommentList';

export default function PostList() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = useState<any>({});

    const getPost = async () => {
        const response = await axios.get('http://localhost:4000/posts');
        if (response) {
            setPosts(response.data);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    console.log(posts);

    const renderedPosts = Object.values(posts).map((post) => (
        <div style={{ padding: 2, border: '1px solid black' }} key={post._id}>
            <h1>{post.title}</h1>
            <p style={{ fontStyle: 'italic' }}>1 comments</p>
            <CommentList post_id={post._id} />
            <CommentCreate post_id={post._id} />
        </div>
    ));

    return <>{renderedPosts}</>;
}
