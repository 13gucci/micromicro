import { Comment } from '../../PostList';

type Props = {
    comments: Comment[];
};

export default function CommentList({ comments }: Props) {
    return (
        <div>
            <ul>
                {comments.map((item) => (
                    <li key={item._id}>
                        {item.status === 'Approved'
                            ? item.content
                            : item.status === 'Pending'
                            ? 'Pending status'
                            : 'Rejected'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
