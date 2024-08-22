import axios from 'axios';
import React, { useState } from 'react';

type Props = {
    post_id: string;
};

export default function CommentCreate({ post_id }: Props) {
    const [comment, setComment] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setComment(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${post_id}/comments`, {
            content: comment,
        });

        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">
                comment
                <input value={comment} onChange={handleChange} type="comment" />
            </label>
            <button>Submit</button>
        </form>
    );
}
