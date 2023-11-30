import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

type QRCodeScannerProps = {
  isOpen: boolean;
  onScanned: (data: string) => void;
  onClose: () => void;
};

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ isOpen, onScanned, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const enableScanner = async () => {
      if (isOpen) {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        requestAnimationFrame(scanQRCode);
      }
    };

    enableScanner();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current && isOpen) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context?.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
          if (imageData) {
              const code = jsQR(imageData.data, imageData.width, imageData.height, {
                  inversionAttempts: 'dontInvert',
                });
                console.log("scanQEcode", code)

          if (code) {
            onScanned(code.data);
            onClose();
          }
        }
      }
      requestAnimationFrame(scanQRCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <video ref={videoRef} autoPlay playsInline muted className=""></video>
      <canvas ref={canvasRef} className="h-full  absolute "></canvas>
      <button onClick={onClose} className="absolute top-5 right-5 text-white">Close</button>
    </div>
  );
};

export default QRCodeScanner;
