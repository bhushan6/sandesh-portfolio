//@ts-nocheck
"use client";
import { Background, Column } from "@once-ui-system/core";
import styles from "./Projects.module.scss";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { effects } from "@/resources";

const VideoCard = ({ url, className }: { url: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Mute by default
  const [isHovering, setIsHovering] = useState(false);

  const userPausedRef = useRef(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Play the video only if the user has not manually paused it.
          if (!userPausedRef.current) {
            videoElement
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          }
        } else {
          videoElement.pause();
          setIsPlaying(false);
          userPausedRef.current = false;
        }
      },
      { threshold: 0.9 }
    );

    observer.observe(videoElement);
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        // If user plays, clear the manual pause flag.
        userPausedRef.current = false;
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        // If user pauses, set the manual pause flag.
        userPausedRef.current = true;
      }
    }
  };

  const toggleMute = (e: MouseEventHandler<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMuted((prevMuted) => !prevMuted);
  };

  const cardStyles = {
    container: {
      width: "100%",
      borderRadius: "1rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      position: "relative",
      alignSelf: "center",
    },
    muteButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      zIndex: 1,
      padding: "0.5rem",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "9999px",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },

    videoElement: {
      top: 0,
      left: 0,
      width: "100%",
      cursor: "pointer",
      userSelect: "none",
    },
    playIconOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      pointerEvents: "none",
    },
    playIconSvg: {
      width: "4rem",
      height: "4rem",
      color: "white",
      opacity: 0.8,
    },
    textOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "1rem",
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.125rem",
      margin: 0,
    },
    user: {
      fontSize: "0.875rem",
      color: "#d1d5db",
      margin: 0,
    },
    iconOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      pointerEvents: "none",
    },
    iconSvg: {
      width: "4rem",
      height: "4rem",
      color: "white",
      opacity: 0.8,
    },
  };

  return (
    <div
      className={className}
      style={cardStyles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleVideoClick}
    >
      <button
        onClick={toggleMute}
        style={cardStyles.muteButton}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg
            style={{ height: "1.5rem", width: "1.5rem" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 19l-14-14"
            />
          </svg>
        ) : (
          <svg
            style={{ height: "1.5rem", width: "1.5rem" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      <video
        ref={videoRef}
        src={url}
        // poster={videoInfo.poster}
        style={cardStyles.videoElement}
        loop
        muted={isMuted}
        playsInline
      />

      {isPlaying && isHovering && (
        <div style={cardStyles.iconOverlay}>
          <svg
            style={cardStyles.iconSvg}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Show play icon when paused */}
      {!isPlaying && (
        <div style={cardStyles.iconOverlay}>
          <svg
            style={cardStyles.iconSvg}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export function Projects({
  heading,
  videos,
}: {
  heading: string;
  videos: string[];
}) {
  const numberOfVideos = videos.length;

  const getGridContainerClass = () => {
    return `${styles["grid-container"]} ${styles[`videos-${numberOfVideos}`]}`;
  };

  const getVideoItemClass = (index: number) => {
    if (numberOfVideos === 3 && index === 2) {
      return styles["video-item-3-last"];
    }
    return "";
  };
  return (
    <>
      <Column fillWidth paddingX="l">
        <div
          style={{
            padding: "0px 20px",
            margin: "0",
          }}
        >
          <h1
            style={{
              margin: 0,
            }}
          >
            {heading}
          </h1>
        </div>
        <div className={getGridContainerClass()}>
          <Background
            style={{
              position: "absolute",
              inset: 0,
            }}
            gradient={{
              display: true,
              opacity: 40,
              x: 50,
              y: 50,
              width: 40,
              height: 40,
              tilt: false,
              colorStart: "comet-color",
              colorEnd: effects.gradient.colorEnd,
            }}
          />
          {videos.map((video, index) => (
            <VideoCard
              key={video}
              url={video}
              className={getVideoItemClass(index)}
            />
          ))}
        </div>
      </Column>
    </>
  );
}
