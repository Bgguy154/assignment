// src/app/api/posts/[id]/route.js
import { openDb } from '../../../../database/db.js';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const db = await openDb();
    const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(post), {
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
export async function DELETE(req, { params }) {
    const { id } = params;
  
    try {
      const db = await openDb();
      
      // Delete the post from the database
      const result = await db.run('DELETE FROM posts WHERE id = ?', [id]);
  
      if (result.changes === 0) {
        return new Response(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
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