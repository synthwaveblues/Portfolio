import {useEffect, useState} from "react";

interface TrackInfo {
  title: string;
  artist: string;
  artistUrl: string | null;
  album: string;
  albumUrl: string | null;
  albumArt: string | null;
  songUrl: string;
  duration: number;
}

interface SpotifyData extends TrackInfo {
  isPlaying: boolean;
  progress: number;
  nextTrack: TrackInfo | null;
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/spotify');
      const json = await res.json();
      setData(json);
      setProgress(json.progress ?? 0);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data?.isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1000, data.duration))
    }, 1000);
    return () => clearInterval(interval);
  }, [data?.isPlaying, data?.duration]);

  const progressPct = data ? (progress / data.duration) * 100 : 0;

  const formatMs = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="spotify-card">
        <div className="spotify-loading">
          <span className="spotifн-loading-dot"/>
          <span>Connecting to Spotify...</span>
        </div>
      </div>
    )
  }

  if (!data?.title) {
    return (
      <div className="spotify-card">
        <div className="spotify-offline">nothing playing right now</div>
      </div>
    )
  }

  return (
    <>
    <div className="fz-card-label">{data.isPlaying ? 'Now Playing' : 'Played Recently'}</div>
    <div className="spotify-card">
      <div className="spotify-top">
        <a href={data.songUrl} target="_blank" rel="noopener noreferrer" className="spotify-album-art">
          {data.albumArt
            ? <img src={data.albumArt} alt="album art" className="spotify-album-img"/>
            : <div className="spotify-album-note">♪</div>
          }
        </a>

        <div className="spotify-info">
          <div>
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-title"
            >
              {data.title}
            </a>
          </div>

          <div className="spotify-artist">
            <a href={data.artistUrl ?? undefined} target="_blank" rel="noreferrer"
               className="spotify-meta-link">{data.artist}</a>
            {' · '}
            <a href={data.albumUrl ?? undefined} target="_blank" rel="noreferrer"
               className="spotify-meta-link">{data.album}</a>
          </div>

          <div className="spotify-progress-bar">
            <div
              className="spotify-progress-fill"
              style={{width: `${progressPct}%`}}
            />
          </div>
          <div className="spotify-time">
            <span>{formatMs(progress)}</span>
            <span>{formatMs(data.duration)}</span>
          </div>
        </div>
      </div>

      {data.nextTrack && (
        <div className="spotify-adjacent">
          <div className="spotify-adjacent-label">next in queue</div>
          <div className="spotify-adjacent-row">
            <a href={data.nextTrack.songUrl} target="_blank" rel="noreferrer" className="spotify-adjacent-art">
              {data.nextTrack.albumArt
                ? <img src={data.nextTrack.albumArt} alt={data.nextTrack.album}/>
                : <span>♪</span>
              }
            </a>
            <div className="spotify-adjacent-info">
              <a
                href={data.nextTrack.songUrl}
                target="_blank"
                rel="noreferrer"
                className="spotify-adjacent-title"
              >{data.nextTrack.title}</a>
              <div className="spotify-adjacent-artist">
                <a href={data.nextTrack.artistUrl ?? undefined} target="_blank" rel="noreferrer"
                   className="spotify-meta-link">{data.nextTrack.artist}</a>
                {' · '}
                <a href={data.nextTrack.albumUrl ?? undefined} target="_blank" rel="noreferrer"
                   className="spotify-meta-link">{data.nextTrack.album}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="spotify-branding">spotify api · 2026</div>
    </div>
    </>
  )
}