"use client";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface PlayerProps {
  poster?: string;
  autoPlay?: boolean;
  src: string;
  onInit?: (player: HTMLVideoElement | null) => void;
}

const calculateVolume = (
  clientX: number,
  left: number,
  width: number
): number => {
  const x = clientX - left;
  const volume = x / width;

  if (volume > 1) {
    return 1;
  }
  if (volume < 0) {
    return 0;
  }

  return volume;
};

const ambilight = true;
const FRAMERATE = 30;
let ambilightInterval: number | null = null;

const Player: FC<PlayerProps> = ({ poster, autoPlay, src, onInit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const ambilightRef = useRef<HTMLCanvasElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [fullscren, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [scrubbingVolume, setScrubbingVolume] = useState(false);
  const [scrubbingTimeline, setScrubbingTimeline] = useState(false);

  const play = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  }, [playerRef]);

  const pause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  }, [playerRef]);

  const toggleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (fullscren && document.fullscreenElement != null) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  }, [containerRef, fullscren]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen((prev) => {
        if (document.fullscreenElement) {
          return true;
        }

        return false;
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleVolumeChange = useCallback(
    (event: MouseEvent) => {
      if (volumeRef.current) {
        const rect = volumeRef.current.getBoundingClientRect();
        const volume = calculateVolume(event.clientX, rect.left, rect.width);

        if (scrubbingVolume) {
          event.preventDefault();
          setVolume(volume);
        }
      }
    },
    [volumeRef, setVolume, scrubbingVolume]
  );

  const toggleScrubbingVolume = useCallback(
    (event: MouseEvent) => {
      if (volumeRef.current) {
        const rect = volumeRef.current.getBoundingClientRect();
        const volume = calculateVolume(event.clientX, rect.left, rect.width);

        const isScrubbing = (event.buttons & 1) === 1;
        setScrubbingVolume(() => isScrubbing);

        if (!isScrubbing) {
          setVolume(volume);
        }

        handleVolumeChange(event);
      }
    },
    [volumeRef, handleVolumeChange]
  );

  const handleDocumentMouseMove = useCallback(
    (e: MouseEvent) => {
      if (scrubbingVolume) {
        handleVolumeChange(e);
      }
    },
    [scrubbingVolume, handleVolumeChange]
  );

  const handleDocumentMouseUp = useCallback(
    (e: MouseEvent) => {
      if (scrubbingVolume) {
        toggleScrubbingVolume(e);
      }
    },
    [scrubbingVolume, toggleScrubbingVolume]
  );

  useEffect(() => {
    const volumeElement = volumeRef.current;

    if (volumeElement) {
      volumeElement.addEventListener("mousemove", handleVolumeChange);
      volumeElement.addEventListener("mousedown", toggleScrubbingVolume);
      document.addEventListener("mouseup", handleDocumentMouseUp);
      document.addEventListener("mousemove", handleDocumentMouseMove);
    }

    return () => {
      if (volumeElement) {
        volumeElement.removeEventListener("mousemove", handleVolumeChange);
        volumeElement.removeEventListener("mousedown", toggleScrubbingVolume);
        document.removeEventListener("mouseup", handleDocumentMouseUp);
        document.removeEventListener("mousemove", handleDocumentMouseMove);
      }
    };
  }, [
    volumeRef,
    play,
    pause,
    handleVolumeChange,
    handleDocumentMouseMove,
    handleDocumentMouseUp,
    toggleScrubbingVolume,
  ]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const playerElement = playerRef.current;

    const onClick = (event: MouseEvent) => {
      const element = event.target as HTMLVideoElement;

      if (element.paused) {
        play();
      } else {
        pause();
      }
    };

    const onTimeUpdate = () => {
      if (timelineRef.current) {
        const { currentTime, duration } = playerRef.current as HTMLVideoElement;
        const percentage = currentTime / duration;

        timelineRef.current.style.setProperty(
          "--progress-position",
          `${percentage}`
        );
      }
    };

    if (playerElement) {
      playerElement.addEventListener("click", onClick);

      playerElement.addEventListener("play", () => {
        setPlaying(true);
      });

      playerElement.addEventListener("pause", () => {
        setPlaying(false);
      });

      playerElement.addEventListener("timeupdate", onTimeUpdate);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("click", onClick);

        playerElement.removeEventListener("play", () => {
          setPlaying(true);
        });

        playerElement.removeEventListener("pause", () => {
          setPlaying(false);
        });

        playerElement.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
  }, [playerRef, play, pause]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target) {
        if (
          (event.target as any).nodeName === "INPUT" ||
          (event.target as any).nodeName === "TEXTAREA"
        ) {
          return;
        }
      }

      switch (event.key.toLowerCase()) {
        case "k":
          if (playing) {
            pause();
          } else {
            play();
          }
          break;

        case "f":
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [playing, play, pause, toggleFullscreen]);

  // Ambilight
  const repaintAmbilight = useCallback(() => {
    if (ambilightRef.current && playerRef.current) {
      const canvas = ambilightRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const width = canvas.width;
        const height = canvas.height;

        context.drawImage(playerRef.current, 0, 0, width, height);
      }
    }
  }, [playerRef, ambilightRef]);

  const startAmbilight = useCallback(() => {
    ambilightInterval = window.setInterval(repaintAmbilight, 1000 / FRAMERATE);
  }, [repaintAmbilight]);

  const stopAmbilightRepaint = useCallback(() => {
    if (ambilightInterval) {
      clearInterval(ambilightInterval);
    }
  }, []);

  useEffect(() => {
    const playerElement = playerRef.current;

    if (ambilight) {
      repaintAmbilight();

      playerElement?.addEventListener("play", startAmbilight);
      playerElement?.addEventListener("ended", stopAmbilightRepaint);
      playerElement?.addEventListener("seeked", repaintAmbilight);
      playerElement?.addEventListener("load", repaintAmbilight);
    }

    return () => {
      if (ambilight) {
        playerElement?.removeEventListener("play", startAmbilight);
        playerElement?.removeEventListener("ended", stopAmbilightRepaint);
        playerElement?.removeEventListener("seeked", repaintAmbilight);
        playerElement?.removeEventListener("load", repaintAmbilight);
      }
    };
  }, [repaintAmbilight, startAmbilight, stopAmbilightRepaint]);

  // Timeline
  const handleTimelineUpdate = useCallback(
    (e: MouseEvent) => {
      const rect = timelineContainerRef.current?.getBoundingClientRect();
      if (rect) {
        const precent =
          Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

        timelineRef.current?.style.setProperty(
          "--preview-position",
          `${precent}`
        );

        if (scrubbingTimeline) {
          timelineRef.current?.style.setProperty(
            "--progress-position",
            `${precent}`
          );
        }
      }
    },
    [timelineRef, timelineContainerRef, scrubbingTimeline]
  );

  const toggleScrubbingTimeline = useCallback(
    (e: MouseEvent) => {
      const rect = timelineContainerRef.current?.getBoundingClientRect();
      if (rect) {
        const precent =
          Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

        const isScrubbing = (e.buttons && 1) === 1;

        setScrubbingTimeline(() => {
          return (e.buttons && 1) === 1;
        });

        if (isScrubbing) {
          pause();
        } else {
          if (playerRef.current) {
            playerRef.current.currentTime =
              (playerRef.current?.duration || 0) * precent;
          }
          play();
        }
      }

      handleTimelineUpdate(e);
    },
    [handleTimelineUpdate, pause, play]
  );

  const handleTimelineMouseUp = useCallback(
    (e: MouseEvent) => {
      if (scrubbingTimeline) {
        toggleScrubbingTimeline(e);
      }
    },
    [scrubbingTimeline, toggleScrubbingTimeline]
  );

  const handleTimelineMouseMove = useCallback(
    (e: MouseEvent) => {
      if (scrubbingTimeline) {
        handleTimelineUpdate(e);
      }
    },
    [scrubbingTimeline, handleTimelineUpdate]
  );

  useEffect(() => {
    const timelineContainerElem = timelineContainerRef.current;

    timelineContainerElem?.addEventListener("mousemove", handleTimelineUpdate);
    timelineContainerElem?.addEventListener(
      "mousedown",
      toggleScrubbingTimeline
    );
    document.addEventListener("mouseup", handleTimelineMouseUp);
    document.addEventListener("mousemove", handleTimelineMouseMove);

    return () => {
      timelineContainerElem?.removeEventListener(
        "mousemove",
        handleTimelineUpdate
      );
      timelineContainerElem?.removeEventListener(
        "mousedown",
        toggleScrubbingTimeline
      );
      document.removeEventListener("mouseup", handleTimelineMouseUp);
      document.removeEventListener("mousemove", handleTimelineMouseMove);
    };
  }, [
    handleTimelineUpdate,
    handleTimelineMouseUp,
    handleTimelineMouseMove,
    toggleScrubbingTimeline,
  ]);

  useEffect(() => {
    if (playerRef.current) {
      onInit?.(playerRef.current);
    }
  }, [onInit]);

  useEffect(() => {
    setPlaying(autoPlay ?? false);
  }, [autoPlay]);

  return (
    <div className="relative">
      <div
        className={`relative w-full bg-[#000] ${
          !fullscren && "rounded-3xl"
        } overflow-hidden group/player-container text-white`}
        ref={containerRef}
      >
        <div className="invisible opacity-0 absolute bottom-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.05)] backdrop-blur-[6px] p-4 group-hover/player-container:opacity-100 group-hover/player-container:visible transition-opacity duration-300 ease-in-out">
          <div
            ref={timelineContainerRef}
            className="group/timeline absolute bottom-full left-0 w-full h-1 cursor-pointer flex items-end"
          >
            <div
              ref={timelineRef}
              style={
                {
                  "--preview-position": 0,
                  "--progress-position": 0,
                } as CSSProperties
              }
              className="relative bg-[rgba(255,255,255,0.1)] h-[2px] group-hover/timeline:h-full w-full group-hover/timeline:before:block before:hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:right-[calc(100%-var(--preview-position)*100%)] before:bg-[rgba(255,255,255,0.1)] before:h-full after:absolute after:left-0 after:top-0 after:bottom-0 after:right-[calc(100%-var(--progress-position)*100%)] after:bg-primary after:h-full"
            >
              <div className="opacity-0 group-hover/timeline:opacity-100 absolute h-[200%] -top-1/2 -translate-x-1/2 left-[calc(var(--progress-position)*100%)] bg-white-400 rounded-full aspect-square z-20"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {playing ? (
                <button
                  className="cursor-pointer outline-0 border-none bg-transparent text-white-400 hover:text-white"
                  onClick={pause}
                >
                  <PauseIcon className="w-6 h-6" />
                </button>
              ) : (
                <button
                  className="cursor-pointer outline-0 border-none bg-transparent text-white-400 hover:text-white"
                  onClick={play}
                >
                  <PlayIcon className="w-6 h-6" />
                </button>
              )}

              <div
                className={`group/volume-control flex items-center ${
                  scrubbingVolume ? `w-24` : `w-6`
                } hover:w-24 transition-[width] duration-300 ease-in-out`}
              >
                <button
                  className="cursor-pointer outline-0 border-none bg-transparent text-white-400 hover:text-white"
                  onClick={() => {
                    setVolume((prev) => {
                      if (prev === 0) {
                        return 1;
                      }

                      return 0;
                    });
                  }}
                >
                  {volume === 0 ? (
                    <SpeakerXMarkIcon className="w-6 h-6" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6" />
                  )}
                </button>

                <div
                  className={`ml-2 w-16 relative inline-block cursor-pointer ${
                    scrubbingVolume ? `opacity-100` : `opacity-0`
                  } group-hover/volume-control:opacity-100 transition-opacity`}
                >
                  <div
                    className="bg-white-200 w-full h-1 rounded-full"
                    ref={volumeRef}
                  >
                    <div
                      className="absolute bottom-0 left-0 bg-primary rounded-full h-full before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-1 before:w-2 before:h-2 before:rounded-full before:bg-white-400"
                      style={{
                        width: `${volume * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="cursor-pointer outline-0 border-none bg-transparent text-white-400 hover:text-white"
              onClick={toggleFullscreen}
            >
              {fullscren ? (
                <ArrowsPointingInIcon className="w-6 h-6" />
              ) : (
                <ArrowsPointingOutIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <video
          preload="none"
          autoPlay={autoPlay}
          poster={poster}
          ref={playerRef}
          src={src}
          className="w-full h-full object-contain"
        />
      </div>
      {ambilight && (
        <canvas
          ref={ambilightRef}
          className="absolute top-0 left-0 right-0 bottom-0 -z-10 w-full h-full blur-[300px] opacity-50"
        />
      )}
    </div>
  );
};

export default Player;
