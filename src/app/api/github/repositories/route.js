// app/api/github/repositories/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
  
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
  
    const query = `
      query ($username: String!) {
        user(login: $username) {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
              languages(first: 5) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `;
  
    const variables = {
      username,
    };
  
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const data = await response.json();
      const repositories = data.data.user.repositories.nodes;
  
      return NextResponse.json(repositories, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
