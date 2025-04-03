import { FC, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (value: string) => {
        if (value.trim()) {
            onSearch(value.trim());
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <Input.Search
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSearch={handleSearch}
                placeholder="搜索视频..."
                allowClear
                enterButton={
                    <div className="flex items-center justify-center">
                        <SearchOutlined className="mr-1" />
                        <span>搜索</span>
                    </div>
                }
                size="large"
                className="rounded-full [&_.ant-input]:bg-white/10 [&_.ant-input]:border-gray-500/50 [&_.ant-input]:text-white [&_.ant-input]:placeholder:text-white/50 [&_.ant-input:hover]:border-gray-400 [&_.ant-input:focus]:border-gray-300 [&_.ant-input:focus]:shadow-[0_0_0_2px_rgba(255,255,255,0.1)] [&_.ant-input-search-button]:bg-gradient-to-r [&_.ant-input-search-button]:from-[#F9DDD6] [&_.ant-input-search-button]:to-[#F5C6B8] [&_.ant-input-search-button]:border-none [&_.ant-input-search-button]:text-gray-800 [&_.ant-input-search-button:hover]:from-[#F5C6B8] [&_.ant-input-search-button:hover]:to-[#F9DDD6] [&_.ant-input-search-button:hover]:text-gray-900 [&_.ant-input-search-button:active]:scale-95 [&_.ant-input-search-button:active]:shadow-inner"
            />
        </div>
    );
};

export default SearchBar; 