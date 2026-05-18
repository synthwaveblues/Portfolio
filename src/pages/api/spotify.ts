import type {APIRoute} from 'astro';

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

interface SpotifyTrack {
  name: string;
  artists: { name: string; external_urls: { spotify: string } }[];
  album: { name: string; images: { url: string }[]; external_urls: { spotify: string } };
  external_urls: { spotify: string };
  duration_ms: number;
}

function formatTrack(track: SpotifyTrack) {
  return {
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    artistUrl: track.artists[0]?.external_urls.spotify ?? null,
    album: track.album.name,
    albumUrl: track.album.external_urls.spotify ?? null,
    albumArt: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
    duration: track.duration_ms,
  };
}

export const GET: APIRoute = async () => {
  try {
    const accessToken = await getAccessToken();

    const [currentRes, recentRes, queueRes] = await Promise.all([
      fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {Authorization: `Bearer ${accessToken}`},
      }),
      fetch('https://api.spotify.com/v1/me/player/recently-played?limit=2', {
        headers: {Authorization: `Bearer ${accessToken}`},
      }),
      fetch('https://api.spotify.com/v1/me/player/queue', {
        headers: {Authorization: `Bearer ${accessToken}`},
      }),
    ]);

    // next track from queue
    let nextTrack = null;
    if (queueRes.status === 200) {
      const queueData = await queueRes.json();
      const next = queueData?.queue?.[0];
      if (next) nextTrack = formatTrack(next);
    }

    // parse recent once — body stream can only be read once
    let recentData: any = null;
    if (recentRes.status === 200) {
      recentData = await recentRes.json();
    }

    // currently playing
    if (currentRes.status === 200) {
      const data = await currentRes.json();
      if (data?.item) {
        return new Response(
          JSON.stringify({
            isPlaying: data.is_playing,
            ...formatTrack(data.item),
            progress: data.progress_ms,
            nextTrack,
          }),
          {status: 200, headers: {'Content-Type': 'application/json'}}
        );
      }
    }

    // fallback — nothing playing
    if (recentData) {
      const last = recentData?.items?.[0]?.track;
      if (last) {
        return new Response(
          JSON.stringify({
            isPlaying: false,
            ...formatTrack(last),
            progress: 0,
            nextTrack: null,
          }),
          {status: 200, headers: {'Content-Type': 'application/json'}}
        );
      }
    }

    return new Response(
      JSON.stringify({isPlaying: false, prevTrack: null, nextTrack: null}),
      {status: 200}
    );

  } catch (err) {
    return new Response(
      JSON.stringify({error: 'Failed to fetch Spotify data'}),
      {status: 500}
    );
  }
};