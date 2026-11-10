'use server';

import { getPostsByPage } from '@/src/libs/posts';

export async function loadMorePostsAction(pageNumber) {
    const limit = 10;
    const offset = pageNumber * limit;
    const posts = getPostsByPage(limit, offset);
    return posts;
}