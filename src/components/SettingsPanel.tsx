import { FC } from 'react';
import { Modal, Select, Input, Space } from 'antd';
import { API_SITES } from '../config/constants';

type ApiSource = 'heimuer' | 'ffzy' | 'custom';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    currentSource: ApiSource;
    customApi: string;
    onSourceChange: (source: ApiSource, customApi: string) => void;
}

const SettingsPanel: FC<SettingsPanelProps> = ({
    isOpen,
    onClose,
    currentSource,
    customApi,
    onSourceChange,
}) => {
    return (
        <Modal
            title="设置"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        选择采集站点
                    </label>
                    <Select
                        value={currentSource}
                        onChange={(value) => onSourceChange(value as ApiSource, customApi)}
                        style={{ width: '100%' }}
                    >
                        {Object.entries(API_SITES).map(([key, site]) => (
                            <Select.Option key={key} value={key}>
                                {site.name} ({key})
                            </Select.Option>
                        ))}
                        <Select.Option value="custom">自定义接口</Select.Option>
                    </Select>
                </div>

                {currentSource === 'custom' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            自定义接口地址
                        </label>
                        <Input
                            value={customApi}
                            onChange={(e) => onSourceChange(currentSource, e.target.value)}
                            placeholder="请输入接口地址..."
                        />
                    </div>
                )}

                <div className="mt-4">
                    <p className="text-xs text-gray-500">
                        当前站点代码：<span className="text-gray-700">{currentSource}</span>
                    </p>
                </div>
            </Space>
        </Modal>
    );
};

export default SettingsPanel; 