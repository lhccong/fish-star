import { FC } from 'react';

interface Video {
    vod_id: string;
    vod_name: string;
    type_name: string;
    vod_remarks: string;
}

interface VideoListProps {
    videos: Video[];
    onSelectVideo: (id: string, name: string) => void;
}

const VideoList: FC<VideoListProps> = ({ videos, onSelectVideo }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
                <div
                    key={video.vod_id}
                    className="card-hover bg-white rounded-lg overflow-hidden cursor-pointer p-6 h-fit shadow-sm hover:shadow-md"
                    onClick={() => onSelectVideo(video.vod_id, video.vod_name)}
                >
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{video.vod_name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{video.type_name}</p>
                    <p className="text-gray-400 text-sm">{video.vod_remarks}</p>
                </div>
            ))}
        </div>
    );
};

export default VideoList; 