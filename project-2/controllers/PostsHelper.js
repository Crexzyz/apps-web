"use strict";

const Post = require('../models/index.js').Post;
const User = require('../models/index.js').User;

module.exports = {
    getPostsPaged: async function (pageParam, whereOptions={}) {
        let page = 0;
    
        if(typeof pageParam === 'undefined') {
            page = 1;
        }
        else {
            page = parseInt(pageParam);
            page = isNaN(page) ? 1 : page;
        }
    
        let offset = (page - 1) * 5;
    
        const posts = await Post.findAndCountAll({
            where: whereOptions,
            order: [['date', 'ASC']],
            limit: 5,
            offset: offset,
            include: User
        });
    
        const count = Math.ceil(posts.count / 5);
        const startPage = page - 5 < 1 ? 1 : page - 5;
        const endPage = page + 5 > count ? count : page + 5;
        const pages = Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);
    
        for(const post of posts.rows) {
            post.commentsCount = await post.countComments();
        }
    
        return {
            pages: pages,
            posts: posts.rows,
            page: page
        }
    }
}


