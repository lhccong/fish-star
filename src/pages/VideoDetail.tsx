import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoDetail } from '../utils/api';
import { Button, Card, List, Spin, Typography } from 'antd';
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const VideoDetail: FC = () => {
    const { id, name } = useParams();
    const navigate = useNavigate();
    const [episodes, setEpisodes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoDetail = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const episodes = await getVideoDetail(id, 'heimuer', '');
                setEpisodes(episodes);
                // 自动播放第一集
                if (episodes.length > 0) {
                    setCurrentVideoUrl(episodes[0]);
                }
            } catch (error) {
                console.error('获取视频详情失败：', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoDetail();
    }, [id]);

    const handlePlayVideo = (url: string) => {
        setCurrentVideoUrl(url);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* 顶部导航栏 */}
            <div 
                className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            >
                <div className="h-full max-w-[1200px] mx-auto px-6 flex items-center">
                    <Button 
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        style={{ marginRight: 16 }}
                    >
                        返回
                    </Button>
                    <Title level={4} style={{ margin: 0 }}>
                        {decodeURIComponent(name || '')}
                    </Title>
                </div>
            </div>

            {/* 主要内容区域 */}
            <div className="max-w-[1200px] mx-auto px-6 pt-20">
                <div style={{ display: 'flex', gap: 24 }}>
                    {/* 左侧视频播放器 */}
                    <div style={{ width: '70%' }}>
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: 8,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                            }}
                            bodyStyle={{ padding: 0 }}
                        >
                            {currentVideoUrl ? (
                                <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                                    <iframe
                                        src={`https://hoplayer.com/index.html?url=${currentVideoUrl}&autoplay=true`}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: 'none'
                                        }}
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div style={{ 
                                    width: '100%', 
                                    paddingTop: '56.25%', 
                                    position: 'relative',
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        <Typography.Text type="secondary">暂无可播放视频</Typography.Text>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* 右侧选集列表 */}
                    <div style={{ width: '30%' }}>
                        <Card
                            title="选集列表"
                            bordered={false}
                            style={{ 
                                position: 'sticky',
                                top: 80,
                                borderRadius: 8,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                            bodyStyle={{
                                height: 'calc(100vh - 180px)',
                                overflowY: 'auto',
                                padding: 16
                            }}
                        >
                            <Spin spinning={isLoading}>
                                <List
                                    grid={{ column: 2, gutter: 8 }}
                                    dataSource={episodes}
                                    renderItem={(url, index) => (
                                        <List.Item key={index}>
                                            <Button
                                                type={currentVideoUrl === url ? 'primary' : 'default'}
                                                onClick={() => handlePlayVideo(url)}
                                                style={{
                                                    width: '100%',
                                                    height: 36,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 8
                                                }}
                                            >
                                                <span>第 {index + 1} 集</span>
                                                {currentVideoUrl === url && <PlayCircleOutlined />}
                                            </Button>
                                        </List.Item>
                                    )}
                                />
                            </Spin>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail; 