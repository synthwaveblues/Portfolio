const CLIENT_ID = "dd72d813aa78413188dc0cae7188c9fb";
const CLIENT_SECRET = "4fe4c8455d4340c992372a46ea55bbc7";
const REFRESH_TOKEN = "AQCxRpAkR-FAInzVMoRj_QWzcINeZ3o5wEo1hOFTcSdPXK0qpCESXdGMZQ9YQrx0WwcSZXaWP73wKfgV6gvrze2dA8njO-CN4J0r6ePFhFNb6tjCAe__RENpJbimSfidKl8";
const BASIC = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN
    })
  });
  const data = await res.json();
  return data.access_token;
}
function formatTrack(track) {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    artistUrl: track.artists[0]?.external_urls.spotify ?? null,
    album: track.album.name,
    albumUrl: track.album.external_urls.spotify ?? null,
    albumArt: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
    duration: track.duration_ms
  };
}
const GET = async () => {
  try {
    const accessToken = await getAccessToken();
    const [currentRes, recentRes, queueRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${accessToken}` }
      }),
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=2", {
        headers: { Authorization: `Bearer ${accessToken}` }
      }),
      fetch("https://api.spotify.com/v1/me/player/queue", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    ]);
    let nextTrack = null;
    if (queueRes.status === 200) {
      const queueData = await queueRes.json();
      const next = queueData?.queue?.[0];
      if (next) nextTrack = formatTrack(next);
    }
    let recentData = null;
    if (recentRes.status === 200) {
      recentData = await recentRes.json();
    }
    if (currentRes.status === 200) {
      const data = await currentRes.json();
      if (data?.item) {
        return new Response(
          JSON.stringify({
            isPlaying: data.is_playing,
            ...formatTrack(data.item),
            progress: data.progress_ms,
            nextTrack
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    if (recentData) {
      const last = recentData?.items?.[0]?.track;
      if (last) {
        const prevTrack = recentData?.items?.[1]?.track ?? null;
        return new Response(
          JSON.stringify({
            isPlaying: false,
            ...formatTrack(last),
            progress: 0,
            nextTrack: prevTrack ? formatTrack(prevTrack) : null
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    return new Response(
      JSON.stringify({ isPlaying: false, prevTrack: null, nextTrack: null }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch Spotify data" }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
