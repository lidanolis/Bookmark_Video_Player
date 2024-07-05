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
  responsive: true,
  fluid: true,
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const [isPlayed, setIsPlayed] = useState(false);
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

  const Navigate = useNavigate();
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const player = useRef<videojs.Player>();
  const [videoInfo, setVideoInfo] = useState({
    totalDuration: 0,
    currentTime: 0,
  });

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
        onProgressChange={(value: number) => {
          if (!videoNode.current) return;
          const duration = videoNode.current.duration;
          const newTime = (value / 100) * duration;
          videoNode.current.currentTime = newTime;
        }}
      />
      <button
        onClick={() => {
          if (isPlayed) {
            videoNode.current?.pause();
          } else if (!isPlayed) {
            videoNode.current?.play();
          }
          setIsPlayed(!isPlayed);
        }}
      >
        {isPlayed ? "Stop" : "Play"}
      </button>
      <button
        onClick={() => {
          Navigate("/");
        }}
      >
        return to home page
      </button>
    </div>
  );
};

export default VideoPlayer;
