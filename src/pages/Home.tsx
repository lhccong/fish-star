import { FC, useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';
import SettingsPanel from '../components/SettingsPanel';
import { searchVideos, getVideoDetail } from '../utils/api';

type ApiSource = 'heimuer' | 'ffzy' | 'custom';

const Home: FC = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; name: string } | null>(null);
    const [episodes, setEpisodes] = useState<string[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [currentSource, setCurrentSource] = useState<ApiSource>('heimuer');
    const [customApi, setCustomApi] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 从 localStorage 加载设置
        const savedSource = (localStorage.getItem('currentSource') as ApiSource) || 'heimuer';
        const savedCustomApi = localStorage.getItem('customApi') || '';
        setCurrentSource(savedSource);
        setCustomApi(savedCustomApi);
    }, []);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        try {
            const data = await searchVideos(query, currentSource, customApi);
            if (data.code === 400) {
                alert(data.msg);
                return;
            }
            setVideos(data.list || []);
        } catch (error) {
            alert('搜索失败，请稍后重试');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectVideo = async (id: string, name: string) => {
        setIsLoading(true);
        try {
            const episodes = await getVideoDetail(id, currentSource, customApi);
            setEpisodes(episodes);
            setSelectedVideo({ id, name });
        } catch (error) {
            alert('获取视频详情失败，请稍后重试');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlayVideo = (url: string) => {
        window.open(`https://hoplayer.com/index.html?url=${url}&autoplay=true`, '_blank');
    };

    const handleSourceChange = (source: ApiSource, newCustomApi: string) => {
        setCurrentSource(source);
        setCustomApi(newCustomApi);
        localStorage.setItem('currentSource', source);
        localStorage.setItem('customApi', newCustomApi);
    };

    return (
        <div className="page-bg min-h-screen text-white">
            {/* 设置按钮 */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-white hover:bg-gray-100 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-2 transition-colors shadow-sm"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </button>
            </div>
            {/* 视频详情弹窗 */}
            {selectedVideo && (
                <VideoDetail
                    title={selectedVideo.name}
                    episodes={episodes}
                    onClose={() => setSelectedVideo(null)}
                    onPlay={handlePlayVideo}
                />
            )}
            {/* 主内容区域 */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center mb-12">
                    <h1 className="text-5xl font-bold gradient-text mb-12">视频搜索</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {isLoading && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-[#111] p-8 rounded-lg border border-[#333] flex items-center space-x-4">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white text-lg">加载中...</p>
                        </div>
                    </div>
                )}

                {videos.length > 0 && (
                    <VideoList videos={videos} onSelectVideo={handleSelectVideo} />
                )}
            </div>

            {/* 设置面板 */}
            <SettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentSource={currentSource}
                customApi={customApi}
                onSourceChange={handleSourceChange}
            />


        </div>
    );
};

export default Home; 