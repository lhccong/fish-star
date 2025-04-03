import { FC } from 'react';

interface VideoDetailProps {
    title: string;
    episodes: string[];
    onClose: () => void;
    onPlay: (url: string, episode: number) => void;
}

const VideoDetail: FC<VideoDetailProps> = ({ title, episodes, onClose, onPlay }) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center">
            <div className="bg-white p-8 rounded-lg w-11/12 max-w-4xl border border-gray-200 max-h-[80vh] flex flex-col shadow-xl">
                <div className="flex justify-between items-center mb-6 flex-none">
                    <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                    >
                        &times;
                    </button>
                </div>
                <div className="overflow-auto flex-1 min-h-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {episodes.map((url, index) => (
                            <button
                                key={index}
                                onClick={() => onPlay(url, index + 1)}
                                className="px-4 py-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-500 rounded-lg transition-colors text-center text-gray-700 hover:text-blue-600"
                            >
                                第{index + 1}集
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail; 