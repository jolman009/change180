export interface BlogPost {
  slug: string;
  title: string;
  titleEs: string;
  date: string;
  excerpt: string;
  excerptEs: string;
  category: string;
  categoryEs: string;
  author: string;
  image: string;
  readingTime: number;
  content: string;
}

// Import all markdown files from the blog directory
const blogFiles = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function parseFrontmatter(content: string): { data: Record<string, string | number>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterString = match[1];
  const markdownContent = match[2];

  const data: Record<string, string | number> = {};
  const lines = frontmatterString.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Convert numbers
      if (!isNaN(Number(value)) && value !== '') {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  }

  return { data, content: markdownContent };
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, content] of Object.entries(blogFiles)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { data, content: markdownContent } = parseFrontmatter(content);

    posts.push({
      slug,
      title: (data.title as string) || '',
      titleEs: (data.titleEs as string) || '',
      date: (data.date as string) || '',
      excerpt: (data.excerpt as string) || '',
      excerptEs: (data.excerptEs as string) || '',
      category: (data.category as string) || '',
      categoryEs: (data.categoryEs as string) || '',
      author: (data.author as string) || '',
      image: (data.image as string) || '',
      readingTime: (data.readingTime as number) || 5,
      content: markdownContent,
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}
