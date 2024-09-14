// src/app/api/posts/route.js
import { openDb } from '../../../database/db.js';

export async function POST(req) {
  try {
    const db = await openDb();
    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);

    return new Response(JSON.stringify({ message: 'Post created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
export async function GET() {
    try {
      const db = await openDb();
      const posts = await db.all('SELECT * FROM posts');
  
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }