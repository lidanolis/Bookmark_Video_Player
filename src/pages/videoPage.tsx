import React from "react";
import VideoPlayer from "../components/video";

const VideoPage: React.FC = () => {
  const videoJsOptions = {
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };
  return (
    <div>
      <VideoPlayer options={videoJsOptions} />
    </div>
  );
};

export default VideoPage;
