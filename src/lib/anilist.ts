// AniList GraphQL helper - uses public API (no auth required for read-only browsing)
// https://docs.anilist.co/

const ANILIST_URL = "https://graphql.anilist.co";

export interface AnilistEntry {
  id: number;
  title: { romaji: string; english: string | null; native: string | null };
  status: string;
  episodes: number | null;
  averageScore: number | null;
  coverImage: { large: string };
}

export interface AnilistListEntry {
  status: string; // CURRENT, PLANNING, COMPLETED, DROPPED, PAUSED, REPEATING
  progress: number;
  score: number;
  media: AnilistEntry;
}

export async function fetchAnilistUserList(username: string): Promise<AnilistListEntry[]> {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          entries {
            status
            progress
            score
            media {
              id
              title { romaji english native }
              status
              episodes
              averageScore
              coverImage { large }
            }
          }
        }
      }
    }`;
  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables: { name: username } }),
  });
  if (!res.ok) throw new Error(`AniList request failed (${res.status})`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  const lists = json.data?.MediaListCollection?.lists ?? [];
  return lists.flatMap((l: { entries: AnilistListEntry[] }) => l.entries);
}

export function exportListToXml(items: { title: string; episodesWatched?: number; status: string; score?: number }[]): string {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const entries = items.map((i) => `  <anime>
    <series_title><![CDATA[${i.title}]]></series_title>
    <my_watched_episodes>${i.episodesWatched ?? 0}</my_watched_episodes>
    <my_status>${escape(i.status)}</my_status>
    <my_score>${i.score ?? 0}</my_score>
  </anime>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
${entries}
</myanimelist>`;
}
