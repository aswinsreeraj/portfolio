export interface TechInterestArea {
  category: string;
  badge: string;
  title: string;
  description: string;
  topics: string[];
}

export interface LearningSource {
  type: 'YouTube' | 'Blog' | 'Newsletter';
  name: string;
  creator: string;
  focus: string;
  url: string;
}

export const techInterestsData = {
  areas: [
    {
      category: 'Distributed Systems & Consensus',
      badge: 'Systems',
      title: 'Reliability under partial failures',
      description:
        'Exploring Raft, Paxos, Vector Clocks, WAL, transaction coordination, and partition recovery. Modeling failure modes before writing happy-path code.',
      topics: ['Raft / Consensus', 'Eventual Consistency', 'Idempotency Keys', 'Partition Recovery'],
    },
    {
      category: 'Database Engines & Storage Internals',
      badge: 'Databases',
      title: 'Access patterns, locks & indexing',
      description:
        'LSM Trees vs B+ Trees, write amplification, MVCC concurrency, row-level locks (SELECT FOR UPDATE), and tuning PostgreSQL connection pools.',
      topics: ['LSM vs B-Tree', 'MVCC & Row Locks', 'pgxpool Tuning', 'pgvector Indexing'],
    },
    {
      category: 'Go Runtime & Concurrency',
      badge: 'Go Internals',
      title: 'Mechanical sympathy in Go',
      description:
        'Analyzing assembly outputs (`go tool compile -S`), understanding goroutine M:N work-stealing schedulers, memory allocator arenas, and zero-allocation patterns.',
      topics: ['pprof Profiling', 'Work-Stealing Sched', 'Escape Analysis', 'Zero-Allocation I/O'],
    },
    {
      category: 'AI Infrastructure & Durable Agents',
      badge: 'AI & MCP',
      title: 'Deterministic harnesses for LLMs',
      description:
        'Constraining stochastic LLMs with type-checked function calls, Model Context Protocol (MCP) tool governance, and Temporal durable state machines.',
      topics: ['Temporal Workflows', 'Model Context Protocol', 'Deterministic State', 'Hybrid BM25+RAG'],
    },
  ] as TechInterestArea[],

  sources: [
    {
      type: 'YouTube' as const,
      name: 'Think School',
      creator: '@ThinkSchool',
      focus: 'Business case studies, geopolitics, economics, and current affairs analysis.',
      url: 'https://www.youtube.com/@ThinkSchool',
    },
    {
      type: 'YouTube' as const,
      name: 'Fireship',
      creator: '@Fireship',
      focus: 'Fast-paced tech news, systems and web tooling breakdowns, and developer ecosystem updates.',
      url: 'https://www.youtube.com/@Fireship',
    },
    {
      type: 'YouTube' as const,
      name: 'Aevy TV',
      creator: '@aevytv',
      focus: 'Research-driven video essays covering current affairs, public policy, technology, and global trends.',
      url: 'https://www.youtube.com/@aevytv',
    },
    {
      type: 'YouTube' as const,
      name: 'CultRepo',
      creator: '@cultrepo',
      focus: 'Software engineering documentaries, open-source stories, and developer community deep dives.',
      url: 'https://www.youtube.com/@cultrepo',
    },
    {
      type: 'Newsletter' as const,
      name: 'The Batch',
      creator: 'DeepLearning.AI',
      focus: 'Weekly AI news, research takeaways, and insights across modern ML and LLM systems.',
      url: 'https://www.deeplearning.ai/the-batch',
    },
    {
      type: 'Blog' as const,
      name: 'The Go Blog',
      creator: 'Go Core Team',
      focus: 'Official releases, standard library deep dives, runtime improvements, and Go language design posts.',
      url: 'https://go.dev/blog/',
    },
  ] as LearningSource[],
};
