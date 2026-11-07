import React from 'react';
import { GitHubStats, GitHubUser, GitHubRepo } from '@/lib/github';
import { ProfileHeader } from '@/components/profile-header';
import { RepositoryDashboard } from '@/components/repository-dashboard';

const GITHUB_USERNAME = 'shivashankar-b-n';

async function getGithubData() {
  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : undefined;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 }
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 }
    })
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('Failed to load GitHub profile data.');
  }

  const user = (await userRes.json()) as GitHubUser;
  const repos = (await reposRes.json()) as GitHubRepo[];

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return {
    user,
    repos,
    stats: {
      totalRepos: user.public_repos,
      totalStars,
      followers: user.followers,
      following: user.following
    }
  };
}

export default async function Page() {
  try {
    const data = await getGithubData();

    return (
      <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 lg:px-10">
        <ProfileHeader user={data.user} stats={data.stats} />
        <RepositoryDashboard repos={data.repos} />
      </main>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-red-500/30 bg-panel p-6 text-center shadow-soft">
          <p className="text-lg font-semibold text-red-400">Unable to load GitHub data</p>
          <p className="mt-2 text-sm text-gray-300">{message}</p>
          <p className="mt-4 text-xs text-gray-400">
            Please check your network connection or GitHub API rate limits.
          </p>
        </div>
      </main>
    );
  }
}
