import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import SettingsPanel from '../components/SettingsPanel';
import { searchVideos } from '../utils/api';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

type ApiSource = 'heimuer' | 'ffzy' | 'custom';

const Home: FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState<any[]>([]);
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

    const handleSelectVideo = (id: string, name: string) => {
        navigate(`/video/${id}/${encodeURIComponent(name)}`);
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
                <Button
                    type="text"
                    icon={<SettingOutlined className="text-white text-xl" />}
                    onClick={() => setIsSettingsOpen(true)}
                    className="hover:bg-white/10 transition-colors duration-200"
                />
            </div>

            {/* 主内容区域 */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center justify-center mb-16">
                    <h1 className="text-6xl font-bold gradient-text mb-8 tracking-tight">视频搜索</h1>
                    <div className="w-full max-w-2xl">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>

                {isLoading && (
                    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                        <div className="bg-[#111] p-6 rounded-xl border border-[#333] flex items-center space-x-4 shadow-lg">
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white text-base">加载中...</p>
                        </div>
                    </div>
                )}

                {videos.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <VideoList videos={videos} onSelectVideo={handleSelectVideo} />
                    </div>
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