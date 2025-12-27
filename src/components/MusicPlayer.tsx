"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { WEDDING_DATA } from "../data";
import { isAssetsCached } from "../utils/assetCache";

interface MusicPlayerProps {
    isOpened: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpened }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isReturningVisitor, setIsReturningVisitor] = useState(false);

    const musicUrl = WEDDING_DATA.music?.url;
    const hasMusic = musicUrl && musicUrl.length > 0;

    // Check if user is a returning visitor (assets already cached)
    useEffect(() => {
        setIsReturningVisitor(isAssetsCached());
    }, []);

    // Auto-play music only for returning visitors when invitation is opened
    useEffect(() => {
        if (isOpened && hasMusic && audioRef.current && isReturningVisitor) {
            const playMusic = async () => {
                try {
                    await audioRef.current?.play();
                    setIsMusicPlaying(true);
                } catch (err) {
                    console.log("Music autoplay blocked:", err);
                    setIsMusicPlaying(false);
                }
            };
            playMusic();
        }
    }, [isOpened, hasMusic, isReturningVisitor]);

    // Toggle music play/pause
    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isMusicPlaying) {
            audioRef.current.pause();
            setIsMusicPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsMusicPlaying(true);
            }).catch((err) => {
                console.log("Music play blocked:", err);
            });
        }
    };

    // Don't render if no music URL is configured
    if (!hasMusic) return null;

    return (
        <>
            {/* Audio Element */}
            <audio ref={audioRef} src={musicUrl} loop preload="auto" />

            {/* Floating Music Control Button */}
            {isOpened && (
                <button
                    onClick={toggleMusic}
                    className="fixed bottom-6 right-6 z-[60] w-10 h-10 bg-white/90 backdrop-blur-md border border-stone-200 rounded-full flex items-center justify-center text-stone-900 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label={isMusicPlaying ? "Pause Music" : "Play Music"}
                >
                    {isMusicPlaying ? (
                        <div className="relative">
                            <Pause size={20} className="text-stone-900" />
                        </div>
                    ) : (
                        <Music
                            size={20}
                            className="text-stone-400 group-hover:text-stone-900 transition-colors"
                        />
                    )}
                    {/* Pulse ring for playing state */}
                    {isMusicPlaying && (
                        <span className="absolute inset-0 rounded-full border-2 border-stone-400 animate-ping opacity-30"></span>
                    )}
                </button>
            )}
        </>
    );
};

export default MusicPlayer;
