export function toggleFullscreen(isFullscreen: boolean, setIsFullscreen: (value: boolean) => void) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }