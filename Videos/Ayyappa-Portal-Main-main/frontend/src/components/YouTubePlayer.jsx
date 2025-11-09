import React, { useEffect, useRef, useState } from 'react';

const YouTubePlayer = ({ videoId, isPlaying, onReady, onStateChange }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);
      
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (player && isPlayerReady) {
      if (isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [isPlaying, player, isPlayerReady]);

  const initializePlayer = () => {
    if (!videoId || !playerRef.current) return;

    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      width: '100%',
      height: '360',
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 1,
        playsinline: 1
      },
      events: {
        onReady: (event) => {
          setIsPlayerReady(true);
          if (onReady) onReady(event);
        },
        onStateChange: (event) => {
          if (onStateChange) onStateChange(event);
        }
      }
    });

    setPlayer(newPlayer);
  };

  return (
    <div className="youtube-player-container">
      <div ref={playerRef} />
    </div>
  );
};

export default YouTubePlayer;