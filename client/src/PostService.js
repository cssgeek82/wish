/* eslint-disable no-async-promise-executor */
// Above solves this error: "ERROR: should not be async"

import axios from 'axios';

const url = 'api/posts/';

class PostService {
    // Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    // Create Post
    static insertPost(wishname, wishdesc, wishlink) {
        return axios.post(url, {
            wishname: wishname,
            wishdesc: wishdesc,
            wishlink: wishlink
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

    // Update Post
    static updatePost(id, wishname, wishdesc, wishlink) {
        return axios.put(`${url}${id}`, {
            wishname: wishname,
            wishdesc: wishdesc,
            wishlink: wishlink
        });
    }
}

export default PostService; 