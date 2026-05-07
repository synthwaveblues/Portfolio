import {useEffect, useState} from "react";

interface TrackInfo {
  title: string;
  artist: string;
  album: string;
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
    <div className="spotify-card">
      {/* CURRENT TRACK*/}
      <div className="spotify-main">
        <div className="spotify-album-art">
          {data.albumArt
            ? <img src={data.albumArt} alt="album art"/>
            : <div className="spotify-album-note">♪</div>
          }
        </div>

        <div className="spotify-info">
          <div className="spotify-status">
            <span
              className="spotify-status-dot"
              style={{animationPlayState: data.isPlaying ? 'running' : 'paused'}}
            />
            <span>{data.isPlaying ? 'NOW PLAYING' : 'PLAYED RECENTLY'}</span>
          </div>
        </div>

        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-title"
        >
          {data.title}
        </a>

        <div className="spotify-artist">
          {data.artist} - {data.album}
        </div>

        {data.isPlaying && (
          <>
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
          </>
        )}

        <a
          href={data.songUrl}
          target="_blank"
          rel="noreferrer"
          className="spotify-open-btn"
        >
          open in spotify ↗
        </a>
      </div>

      {data.isPlaying && data.nextTrack && (
        <a
          href={data.nextTrack.songUrl}
          target="_blank"
          rel="noreferrer"
          className="spotify-adjacent spotify-next"
        >
          <div className="spotify-adjacent-label">next →</div>
          <div className="spotify-adjacent-art">
            {data.nextTrack.albumArt
              ? <img src={data.nextTrack.albumArt} alt={data.nextTrack.album}/>
              : <span>♪</span>
            }
          </div>
          <div className="spotify-adjacent-info">
            <div className="spotify-adjacent-title">{data.nextTrack.title}</div>
            <div className="spotify-adjacent-artist">{data.nextTrack.artist}</div>
          </div>
        </a>
      )}

    </div>
  )
}