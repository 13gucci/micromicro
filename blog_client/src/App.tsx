import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
    return (
        <>
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <PostList />
            </div>
        </>
    );
}

export default App;
