"use client"

import type React from "react"
import { Input, Button, Tag, Row, Col, Card, Avatar, Tabs } from "antd"
import { SearchOutlined, ClockCircleOutlined, UserOutlined, PlayCircleFilled, StarOutlined } from "@ant-design/icons"
import "./Anime.css"

const { TabPane } = Tabs

const Anime: React.FC = () => {
    // Episodes data
    const episodes = Array.from({ length: 12 }, (_, i) => i + 1)

    return (
        <div className="movie-container">
            {/* Header with search */}
            <div className="header">
                <Input placeholder="搜索" prefix={<SearchOutlined />} className="search-input" />
                <div className="header-right">
                    <Button type="text" icon={<ClockCircleOutlined />}>
                        查看记录
                    </Button>
                    <Avatar icon={<UserOutlined />} className="user-avatar" />
                </div>
            </div>

            {/* Movie details section */}
            <Card className="movie-card">
                <Row gutter={24}>
                    <Col xs={24} md={16}>
                        <div className="title-section">
                            <div className="red-bar"></div>
                            <h1 className="movie-title">棋士</h1>
                        </div>

                        <div className="tags-section">
                            <Tag>2025</Tag>
                            <Tag>内地</Tag>
                            <Tag>悬疑 / 犯罪</Tag>
                        </div>

                        <div className="details-section">
                            <h3>内详</h3>

                            <div className="detail-item">
                                <span className="detail-label">导演:</span>
                                <span className="detail-value">房远</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">主演:</span>
                                <span className="detail-value">王宝强 陈明昊 陈永胜 王智 李乃文</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">备注:</span>
                                <span className="detail-value update-text">更新至12集</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">影评:</span>
                                <div className="platform-icons">
                                    <div className="platform-icon icon-iqiyi"></div>
                                    <div className="platform-icon icon-youku"></div>
                                    <div className="platform-icon icon-tencent"></div>
                                    <div className="platform-icon icon-mgtv"></div>
                                    <div className="platform-icon icon-bilibili"></div>
                                    <div className="platform-icon icon-pptv"></div>
                                    <div className="platform-icon icon-sohu"></div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <Button type="primary" icon={<PlayCircleFilled />} className="play-button">
                                    立即播放
                                </Button>
                                <Button icon={<StarOutlined />} className="collect-button">
                                    收藏
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <div className="poster-container">
                            <img src="/placeholder.svg?height=400&width=280" alt="棋士海报" className="movie-poster" />
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Episodes section */}
            <div className="episodes-section">
                <h2 className="episodes-title">选集播放</h2>

                <div className="episodes-grid">
                    {episodes.map((ep) => (
                        <Button key={ep} className="episode-button">
                            第{String(ep).padStart(2, "0")}集
                        </Button>
                    ))}
                </div>

                <div className="quality-tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                <span className="quality-tab active">
                  魔都云<sup className="quality-badge">12</sup>
                </span>
                            }
                            key="1"
                        />
                        <TabPane
                            tab={
                                <span className="quality-tab">
                  非凡云<sup className="quality-badge">12</sup>
                </span>
                            }
                            key="2"
                        />
                        <TabPane
                            tab={
                                <span className="quality-tab">
                  优质云<sup className="quality-badge">12</sup>
                </span>
                            }
                            key="3"
                        />
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Anime

