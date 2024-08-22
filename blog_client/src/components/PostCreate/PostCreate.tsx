import { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
    const [title, setTitle] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTitle(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios.post(
            'http://localhost:4000/posts',
            {
                title,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <label htmlFor="title">
                    Title
                    <input type="text" id="title" value={title} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
