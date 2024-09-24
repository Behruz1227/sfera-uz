import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube"; // Ensure the YouTube plugin is included

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Extract video ID from YouTube URL if necessary
    const extractVideoId = (id: string) => {
      const youtubeUrlPattern =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = id.match(youtubeUrlPattern);
      return match ? match[1] : id; // Return extracted ID if URL, otherwise the original ID
    };

    const finalVideoId = extractVideoId(videoId);

    // Ensure the video element exists before initialization
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        width: 700,
        height: "auto",
        preload: "auto",
        loop: false,
        autoplay: false,
        techOrder: ["youtube"], // Prioritize YouTube playback using the plugin
      });

      player.src({
        type: "video/youtube",
        src: finalVideoId,
      });

      return () => player.dispose();
    }
  }, [videoId]);

  return (
    <div>
      {/* Make sure the video element is rendered before this point */}
      <video
        ref={videoRef}
        id="my-video"
        className="video-js"
        controls
        width={700}
        height="auto"
        preload="auto"
        loop={false}
        data-setup="{}" // (Optional) Additional video.js configuration
        autoPlay={false}
      />
    </div>
  );
};

export default VideoPlayer;
