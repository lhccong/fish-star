import { FC } from 'react';
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
    if (!isOpen) return null;

    return (
        <div className="settings-panel fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-6 z-40 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold gradient-text">设置</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    &times;
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        选择采集站点
                    </label>
                    <select
                        value={currentSource}
                        onChange={(e) => onSourceChange(e.target.value as ApiSource, customApi)}
                        className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        {Object.entries(API_SITES).map(([key, site]) => (
                            <option key={key} value={key}>
                                {site.name} ({key})
                            </option>
                        ))}
                        <option value="custom">自定义接口</option>
                    </select>
                </div>

                {currentSource === 'custom' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            自定义接口地址
                        </label>
                        <input
                            type="text"
                            value={customApi}
                            onChange={(e) => onSourceChange(currentSource, e.target.value)}
                            className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="请输入接口地址..."
                        />
                    </div>
                )}

                <div className="mt-4">
                    <p className="text-xs text-gray-500">
                        当前站点代码：<span className="text-gray-700">{currentSource}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel; 