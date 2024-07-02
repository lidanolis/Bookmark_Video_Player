import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import ProgressBar from "./progressBar";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  muted: true,
  autoplay: true,
  controls: true,
  responsive: true,
  playbackRates: [0.5, 1, 1.5, 2],
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const Navigate = useNavigate();
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const player = useRef<videojs.Player>();
  const [videoInfo, setVideoInfo] = useState({
    totalDuration: 0,
    currentTime: 0,
  });

  function getVideoInfo(player: videojs.Player) {
    const totalDuration = player.duration();
    const currentTime = player.currentTime();
    return { totalDuration, currentTime };
  }

  function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    if (videoNode.current) {
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options,
      }).ready(function () {
        // Set up event listeners
        this.on("loadedmetadata", () => {
          setVideoInfo(getVideoInfo(this));
        });

        this.on("timeupdate", () => {
          setVideoInfo(getVideoInfo(this));
        });
      });

      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, [options]);

  return (
    <div>
      <video ref={videoNode} className="video-js" />
      <div>Total Duration: {formatTime(videoInfo.totalDuration)}</div>
      <div>Current Time: {formatTime(videoInfo.currentTime)}</div>
      <ProgressBar
        totalDuration={videoInfo.totalDuration}
        currentDuration={videoInfo.currentTime}
      />
      <button onClick={() => Navigate("/")}>Back To Home Page</button>
    </div>
  );
};

export default VideoPlayer;
