const posts = [
    { id: 1, title: 'post one' },
    { id: 2, title: 'post two' },
];

// non default way to export if need to import we need to give .js (import { getPosts } from "./postController.js";)
// export const getPosts = () => posts;


// non default way to export if need to import we need to give .js (import { getPosts } from "./postController.js";)
const getPosts = () => posts;
// export { getPosts };

// default export import getPosts from "./postController"; we can do imports without curlybraces
export default getPosts;

export const getPostsLength = () => posts.length;