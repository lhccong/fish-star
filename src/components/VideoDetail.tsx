import { FC } from 'react';
import { Modal, Button } from 'antd';

interface VideoDetailProps {
    title: string;
    episodes: string[];
    onClose: () => void;
    onPlay: (url: string, episode: number) => void;
}

const VideoDetail: FC<VideoDetailProps> = ({ title, episodes, onClose, onPlay }) => {
    return (
        <Modal
            title={title}
            open={true}
            onCancel={onClose}
            footer={null}
            width={800}
            className="video-detail-modal"
        >
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {episodes.map((url, index) => (
                    <Button
                        key={index}
                        onClick={() => onPlay(url, index + 1)}
                        className="w-full"
                    >
                        第{index + 1}集
                    </Button>
                ))}
            </div>
        </Modal>
    );
};

export default VideoDetail; 