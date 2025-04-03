import { useState } from "react"
import { Input, Button, Tag, Badge, Tabs, Row, Col, Space, Tooltip } from "antd"
import {
    SearchOutlined,
    PlayCircleOutlined,
    PauseOutlined,
    SoundOutlined,
    SettingOutlined,
    FullscreenOutlined,
    HistoryOutlined,
    DownloadOutlined,
    ExclamationCircleOutlined,
    ShareAltOutlined,
    SortAscendingOutlined,
} from "@ant-design/icons"
import "./Variety.css"

export default function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentEpisode, setCurrentEpisode] = useState("01")
    const [currentSource, setCurrentSource] = useState("魔都云")

    // 模拟视频源
    const sources = [
        { key: "魔都云", label: "魔都云", badge: 2 },
        { key: "非凡云", label: "非凡云", badge: 2 },
        { key: "优酷云", label: "优酷云", badge: 2 },
    ]

    // 模拟剧集
    const episodes = Array.from({ length: 12 }, (_, i) => {
        const num = String(i + 1).padStart(2, "0")
        return { key: num, label: `第${num}集` }
    })

    // 模拟标签
    const tags = ["电视剧", "2025", "内地", "悬疑", "犯罪"]

    const handleEpisodeClick = (episode: string) => {
        setCurrentEpisode(episode)
        setIsPlaying(true)
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="video-player-container">
            {/* 顶部搜索栏 */}
            <div className="header">
                <div className="search-bar">
                    <Input placeholder="搜索" prefix={<SearchOutlined />} className="search-input" />
                </div>

                <div className="user-controls">
                    <Button type="text" icon={<HistoryOutlined />}>
                        观看记录
                    </Button>
                    <div className="user-avatar"></div>
                </div>
            </div>

            {/* 主要内容区 */}
            <div className="variety-content">
                {/* 视频播放区 */}
                <div className="video-player">
                    <div className="video-header">
                        <div className="now-playing">正在播放：《棋士》 第{currentEpisode}集 - 悬疑云</div>
                    </div>

                    <div className="video-container">
                        <div className="video-overlay">
                            <PlayCircleOutlined className="big-play-button" />
                        </div>

                        <div className="video-controls">
                            <Button
                                type="text"
                                icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                                onClick={handlePlayPause}
                                className="control-button"
                            />
                            <Button type="text" icon={<SoundOutlined />} className="control-button" />
                            <div className="time-display">00:00 / 01:02:55</div>
                            <div className="right-controls">
                                <Button type="text" icon={<SettingOutlined />} className="control-button" />
                                <Button type="text" icon={<FullscreenOutlined />} className="control-button" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 右侧信息面板 */}
                <div className="info-panel">
                    <div className="title-section">
                        <h2>棋士</h2>
                    </div>

                    <div className="tags-section">
                        {tags.map((tag) => (
                            <Tag key={tag} className="video-tag">
                                {tag}
                            </Tag>
                        ))}
                    </div>

                    <div className="source-section">
                        <div className="section-title">选集播放</div>
                        <Tabs
                            activeKey={currentSource}
                            onChange={setCurrentSource}
                            items={sources.map((source) => ({
                                key: source.key,
                                label: (
                                    <Badge count={source.badge} offset={[5, 0]}>
                                        <span className={currentSource === source.key ? "active-source" : ""}>{source.label}</span>
                                    </Badge>
                                ),
                            }))}
                        />
                    </div>

                    <div className="episodes-section">
                        <Row gutter={[8, 8]}>
                            {episodes.map((episode) => (
                                <Col span={8} key={episode.key}>
                                    <Button
                                        className={`episode-button ${currentEpisode === episode.key ? "active-episode" : ""}`}
                                        onClick={() => handleEpisodeClick(episode.key)}
                                    >
                                        {episode.label}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className="bottom-controls">
                        <Space size="large">
                            <Tooltip title="排序">
                                <Button type="text" icon={<SortAscendingOutlined />}>
                                    排序
                                </Button>
                            </Tooltip>
                            <Tooltip title="下载">
                                <Button type="text" icon={<DownloadOutlined />}>
                                    下载
                                </Button>
                            </Tooltip>
                            <Tooltip title="报错">
                                <Button type="text" icon={<ExclamationCircleOutlined />}>
                                    报错
                                </Button>
                            </Tooltip>
                            <Tooltip title="分享">
                                <Button type="text" icon={<ShareAltOutlined />}>
                                    分享
                                </Button>
                            </Tooltip>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    )
}

