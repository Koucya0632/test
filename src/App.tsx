import { useRef, useState } from "react";
import PlanetScene from "./PlanetScene";
import "./App.css";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showEyes, setShowEyes] = useState(true);
  const [eyesDisappearing, setEyesDisappearing] = useState(false);

  const handleEyesClick = async () => {
    const video = videoRef.current;
    if (video && video.paused) {
      try {
        // 開始眼睛消失動畫
        setEyesDisappearing(true);
        
        // 延遲播放影片，讓動畫完成
        setTimeout(async () => {
          await video.play();
          setShowEyes(false);
          console.log("影片播放成功，眼睛消失");
        }, 1000); // 1秒後開始播放影片
        
      } catch (error) {
        console.log("影片播放失敗:", error);
        setEyesDisappearing(false);
      }
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className="container">
      {/* 背景影片 */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted
        playsInline 
        className="background-video"
        onClick={handleVideoClick}
      >
        <source src="/space.mp4" type="video/mp4" />
      </video>

      {/* 眼睛覆蓋層 */}
      {showEyes && (
        <div className={`eyes-overlay ${eyesDisappearing ? 'disappearing' : ''}`} onClick={handleEyesClick}>
          <div className="eye-container">
            <div className="eye left-eye">
              <div className="eyeball">
                <div className="pupil"></div>
              </div>
            </div>
            <div className="eye right-eye">
              <div className="eyeball">
                <div className="pupil"></div>
              </div>
            </div>
          </div>
          <div className="click-hint">點擊眼睛開始探索太空</div>
        </div>
      )}

      {/* Three.js 星球 */}
      <div className="canvas-wrapper">
        <PlanetScene />
      </div>
    </div>
  );
}