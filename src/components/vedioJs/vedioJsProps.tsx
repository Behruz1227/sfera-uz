import React from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({videoId}) => {
    const extractVideoId = (id: string) => {
        const youtubeUrlPattern =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = id.match(youtubeUrlPattern);
        return match ? match[1] : id;
    };

    const finalVideoId = extractVideoId(videoId);

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return <YouTube videoId={finalVideoId} opts={opts}/>
};

export default VideoPlayer;
