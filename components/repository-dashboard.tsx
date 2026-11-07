'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, ExternalLink, GitFork, GitBranch, Star } from 'lucide-react';
import Link from 'next/link';
import type { GitHubRepo } from '@/types/github';

const sortOptions = [
  { key: 'name', label: 'Name' },
  { key: 'stars', label: 'Most Stars' },
  { key: 'updated', label: 'Recently Updated' }
] as const;

type SortKey = (typeof sortOptions)[number]['key'];

export function RepositoryDashboard({ repos }: { repos: GitHubRepo[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedRepos = useMemo(() => {
    const result = [...repos];

    switch (sortKey) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stars':
        result.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'updated':
        result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      default:
        break;
    }

    return result;
  }, [repos, sortKey]);

  const visibleRepos = sortedRepos.slice(0, visibleCount);

  return (
    <section className="pb-12">
      <div className="mb-6 flex justify-end">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a] p-1.5 shadow-soft">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSortKey(option.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                sortKey === option.key ? 'bg-[#2d2d2d] text-white shadow-inner' : 'text-gray-300 hover:text-white'
              }`}
            >
              {option.key === 'updated' ? 'Last Modified' : option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleRepos.map((repo) => (
          <article
            key={repo.id}
            className="group flex min-h-[280px] flex-col rounded-3xl border border-white/5 bg-[#191919] p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1e1e1e]"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <Link href={repo.html_url} target="_blank" rel="noreferrer" className="text-2xl font-bold text-[#3b82f6] hover:text-[#60a5fa]">
                {repo.name}
              </Link>
              {repo.homepage && (
                <Link
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-pink-400/40 bg-pink-500/10 px-2 py-1 text-xs font-semibold text-pink-300"
                >
                  Live Link
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>

            <p className="mb-5 line-clamp-6 flex-1 text-[15px] leading-7 text-[#d1d5db]">
              {repo.description || 'No description available.'}
            </p>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4 text-sm text-[#a3a3a3]">
              <div className="flex items-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-yellow-400" />
                  {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GitFork className="h-3.5 w-3.5 text-gray-400" />
                  {repo.forks_count}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(repo.updated_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            {repo.language && (
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#60a5fa]" />
                  {repo.language}
                </span>
              </div>
            )}
          </article>
        ))}
      </div>

      {visibleCount < sortedRepos.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + 6, sortedRepos.length))}
            className="rounded-full border border-white/10 bg-[#1c1c1c] px-6 py-3 text-sm font-semibold text-white transition hover:border-blue-500/40 hover:bg-[#212121]"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
