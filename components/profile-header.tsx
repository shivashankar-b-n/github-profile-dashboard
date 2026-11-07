import type { GitHubStats, GitHubUser, GitHubRepo } from '@/types/github';
import { ArrowUpRight, CalendarDays, ExternalLink, Forklift, MapPin, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const profileTagline = 'Aspiring Associate Product Manager | AI & Data Science Enthusiast';

export function ProfileHeader({ user, stats }: { user: GitHubUser; stats: GitHubStats }) {
  const displayName = user.name || 'Shivashankar B N';
  const username = user.login || 'shivashankar-b-n';
  const tagline = user.bio || profileTagline;

  return (
    <header className="mb-8 flex flex-col gap-8 pt-4 md:flex-row md:items-start md:gap-8 lg:gap-10">
      <div className="md:w-[280px]">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#141414] shadow-soft">
          <Image
            src={user.avatar_url || 'https://github.com/shivashankar-b-n.png'}
            alt={`${displayName} profile avatar`}
            width={420}
            height={420}
            className="h-[320px] w-full object-cover md:h-[360px]"
            priority
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{displayName}</h1>
          <span className="text-xl font-medium text-[#a0a0a0] md:text-3xl">{username}</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2b6fe7] text-[10px] text-white shadow-lg shadow-blue-500/20">
            ✓
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-base text-[#d9d9d9] md:text-xl">
          <span className="inline-flex items-center gap-2">
            <span className="text-yellow-400">✨</span>
            <span>{tagline}</span>
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#d0d0d0] md:text-base">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" /> Bengaluru, India</span>
          <Link href="https://www.linkedin.com/in/shivashankar-b-n" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <ArrowUpRight className="h-4 w-4" /> LinkedIn
          </Link>
          <Link href={user.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <ExternalLink className="h-4 w-4" /> GitHub
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <StatBadge label="Public Repos" value={stats.totalRepos.toString()} color="orange" icon={<Star className="h-4 w-4" />} />
          <StatBadge label="Total Stars" value={stats.totalStars.toString()} color="yellow" icon={<Star className="h-4 w-4" />} />
          <StatBadge label="Followers" value={stats.followers.toString()} color="blue" icon={<Users className="h-4 w-4" />} />
          <StatBadge label="Following" value={stats.following.toString()} color="purple" icon={<Users className="h-4 w-4" />} />
        </div>
      </div>
    </header>
  );
}

function StatBadge({
  label,
  value,
  color,
  icon
}: {
  label: string;
  value: string;
  color: 'orange' | 'yellow' | 'blue' | 'purple';
  icon: React.ReactNode;
}) {
  const colorMap = {
    orange: 'bg-[#f59e0b] text-[#1f1200]',
    yellow: 'bg-[#f8d94d] text-[#1d1b05]',
    blue: 'bg-[#4ea8ff] text-[#031a2a]',
    purple: 'bg-[#d7a7ff] text-[#1f122b]'
  };

  return (
    <div className={`inline-flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold shadow-lg ${colorMap[color]}`}>
      <span className="inline-flex h-5 w-5 items-center justify-center">{icon}</span>
      <span className="text-lg">{value}</span>
      <span className="text-lg">{label}</span>
    </div>
  );
}
