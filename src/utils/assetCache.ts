/**
 * Asset Cache Utility
 * Preloads and caches all images and videos for faster subsequent visits
 */

const CACHE_NAME = 'wedding-assets-v1';
const CACHE_KEY = 'wedding-assets-cached';

// Collect all asset URLs from WEDDING_DATA
export const getAllAssetUrls = (weddingData: any): string[] => {
    const urls: string[] = [];

    // Hero assets
    if (weddingData.hero?.videoUrl) urls.push(weddingData.hero.videoUrl);
    if (weddingData.hero?.posterUrl) urls.push(weddingData.hero.posterUrl);

    // Couple photos
    if (weddingData.couple?.groom?.photoUrl) urls.push(weddingData.couple.groom.photoUrl);
    if (weddingData.couple?.bride?.photoUrl) urls.push(weddingData.couple.bride.photoUrl);

    // Schedule images
    weddingData.schedule?.forEach((event: any) => {
        if (event.imageMain) urls.push(event.imageMain);
        if (event.imageDetail) urls.push(event.imageDetail);
    });

    // Love Story assets
    if (weddingData.loveStory?.videoUrl) urls.push(weddingData.loveStory.videoUrl);
    if (weddingData.loveStory?.posterUrl) urls.push(weddingData.loveStory.posterUrl);

    // Gallery images
    weddingData.gallery?.forEach((item: any) => {
        if (item.src) urls.push(item.src);
    });

    // Footer background
    if (weddingData.footer?.backgroundImage) urls.push(weddingData.footer.backgroundImage);

    // Background music
    if (weddingData.music?.url) urls.push(weddingData.music.url);

    return urls;
};

// Check if assets are already cached
export const isAssetsCached = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(CACHE_KEY) === 'true';
};

// Mark assets as cached
export const markAssetsCached = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, 'true');
    }
};

// Preload a single image
const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to continue loading other assets
        img.src = url;
    });
};

// Preload a single video (just fetch metadata, not full download)
const preloadVideo = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve();
        video.onerror = () => resolve();
        video.src = url;
    });
};

// Preload a single audio file
const preloadAudio = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.onloadedmetadata = () => resolve();
        audio.onerror = () => resolve();
        audio.src = url;
    });
};

// Main function to preload all assets with progress callback
export const preloadAllAssets = async (
    urls: string[],
    onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
    const total = urls.length;
    let loaded = 0;

    const promises = urls.map(async (url) => {
        try {
            // Determine asset type and preload accordingly
            if (url.match(/\.(mp4|webm|mov)(\?|$)/i)) {
                await preloadVideo(url);
            } else if (url.match(/\.(mp3|wav|ogg|m4a)(\?|$)/i)) {
                await preloadAudio(url);
            } else {
                await preloadImage(url);
            }
        } catch (e) {
            // Silently fail for individual assets
        } finally {
            loaded++;
            onProgress?.(loaded, total);
        }
    });

    await Promise.all(promises);
    markAssetsCached();
};

// Clear cache (for development/testing)
export const clearAssetsCache = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CACHE_KEY);
    }
};
