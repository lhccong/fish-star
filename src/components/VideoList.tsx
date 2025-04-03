import { FC } from 'react';
import { Card, Row, Col } from 'antd';

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
        <Row gutter={[16, 16]}>
            {videos.map((video) => (
                <Col span={6} key={video.vod_id}>
                    <Card
                        hoverable
                        onClick={() => onSelectVideo(video.vod_id, video.vod_name)}
                        className="h-full"
                    >
                        <Card.Meta
                            title={video.vod_name}
                            description={
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">{video.type_name}</p>
                                    <p className="text-gray-400 text-sm">{video.vod_remarks}</p>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default VideoList; 