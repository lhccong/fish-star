import { FC, useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] text-white px-6 py-4 rounded-l-lg focus:outline-none focus:border-white transition-colors"
                    placeholder="搜索你喜欢的视频..."
                />
                <button
                    type="submit"
                    className="px-8 py-4 bg-white text-black font-medium rounded-r-lg hover:bg-gray-200 transition-colors"
                >
                    搜索
                </button>
            </div>
        </form>
    );
};

export default SearchBar; 