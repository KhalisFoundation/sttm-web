import React, { useState, useRef, useEffect } from 'react';
import { SilenceDetector, createAudioAnalyser } from './utils/silence';

interface MicIconProps {
  isRecording: boolean;
  fill?: string;
  width?: string | number;
  height?: string | number;
  onTranscriptionResult?: (result: { ascii: string; unicode: string }) => void;
  onError?: (error: string) => void;
  onRecordingStateChange: (
    isRecording: boolean,
    stream: MediaStream | null
  ) => void;
}

const MicIcon: React.FC<MicIconProps> = ({
  isRecording,
  fill = '#666',
  width = '1.2em',
  height = '1.2em',
  onTranscriptionResult,
  onError,
  onRecordingStateChange,
  ...props
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const silenceDetectorRef = useRef<SilenceDetector | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const { audioContext, analyser } = createAudioAnalyser(stream);
      audioContextRef.current = audioContext;

      const silenceDetector = new SilenceDetector(
        analyser,
        {
          onSilenceDetected: () => {
            stopRecording();
          },
        },
        {
          threshold: 0.03,
          durationMs: 1500,
        }
      );
      silenceDetectorRef.current = silenceDetector;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setIsProcessing(true);
        processAudio();
      };

      mediaRecorder.start();
      silenceDetector.start();

      onRecordingStateChange(true, stream);
    } catch (err) {
      console.error(err);
      onError?.('Microphone access denied.');
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

    if (silenceDetectorRef.current) {
      silenceDetectorRef.current.stop();
      silenceDetectorRef.current.destroy();
      silenceDetectorRef.current = null;
    }

    try {
      mediaRecorder.stop();
    } catch (err) {
      console.debug('Error stopping recorder:', err);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    onRecordingStateChange(false, null);
  };
  const processAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (!base64Audio) {
          onError?.('Failed to process audio');
          setIsProcessing(false);
          onRecordingStateChange(false, null);
          return;
        }

        try {
          const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audioData: base64Audio }),
          });

          const data = await response.json();
          if (data.status === 'success') {
            onTranscriptionResult?.(data.transcriptInitials);
          } else {
            onError?.(data.message || 'Transcription failed');
          }
        } catch (err) {
          onError?.('Network error');
        } finally {
          setIsProcessing(false);
          onRecordingStateChange(false, null);
        }
      };

      reader.readAsDataURL(audioBlob);
    } catch (err) {
      onError?.('Failed to process audio');
      setIsProcessing(false);
      onRecordingStateChange(false, null);
    }
  };

  useEffect(() => {
    if (!isRecording) stopRecording();
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (silenceDetectorRef.current) {
        silenceDetectorRef.current.destroy();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleClick = () => {
    if (isProcessing) return;
    if (isRecording) stopRecording();
    else startRecording();
  };

  if (isProcessing) {
    return (
      <button
        type="button"
        style={{ color: 'inherit' }}
        disabled
        onClick={handleClick}
        title="Processing audio..."
      >
        <svg
          fill={fill}
          width={width}
          height={height}
          viewBox="0 0 24 24"
          {...props}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="2s"
              values="0 31.416;15.708 15.708;0 31.416"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="2s"
              values="0;-15.708;-31.416"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </button>
    );
  }

  if (isRecording) {
    return (
      <button type="button" onClick={handleClick} title="Stop recording">
        <svg fill={fill} width={width} height={height} viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} title="Start recording">
      <svg fill={fill} width={width} height={height} viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
      </svg>
    </button>
  );
};

export default MicIcon;
