import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
    post_id: string;
};

export default function CommentList({ post_id }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [comment, setComment] = useState<any[]>([]);

    const fetchCommentList = async (post_id: string) => {
        const response = await axios.get(`http://localhost:4001/posts/${post_id}/comments`);

        if (response) {
            setComment(response.data);
        }
    };

    useEffect(() => {
        fetchCommentList(post_id);
    }, [post_id]);

    return (
        <div>
            <ul>
                {comment.map((comment) => (
                    <li key={comment._id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
}
