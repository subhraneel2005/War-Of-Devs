// app/api/github/route.js
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
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
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
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // GitHub token needed
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const data = await response.json();
      const contributions = data.data.user.contributionsCollection.contributionCalendar;
  
      return NextResponse.json(contributions, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
