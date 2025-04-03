import { API_SITES, ApiSites } from '../config/constants';

export type Category = {
  type_id: number;
  type_name: string;
  type_pid: number;
};

export type Video = {
  type_name: string;
  vod_actor: string;
  vod_area: string;
  vod_content: string;
  vod_director: string;
  vod_id: number;
  vod_lang: string;
  vod_name: string;
  vod_pic: string;
  // 播放地址格式为 名称1$url1#名称2$url2#...
  vod_play_url: string;
  vod_score: number;
  vod_year: string;
};

const proxyUrl = (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

export const searchVideos = async (query: string, source: keyof ApiSites = 'heimuer', customApi?: string) => {
    const apiUrl = customApi
        ? customApi
        : API_SITES[source].api + '/api.php/provide/vod/?ac=list&wd=' + encodeURIComponent(query);
    
    try {
        const response = await fetch(proxyUrl(apiUrl));
        if (!response.ok) {
            throw new Error('API 请求失败');
        }
        return await response.json();
    } catch (error) {
        return {
            code: 400,
            msg: '搜索服务暂时不可用，请稍后再试',
            list: [],
        };
    }
};

export const getVideoDetail = async (id: string, source: keyof ApiSites = 'heimuer', customApi?: string) => {
    const detailUrl = customApi
        ? customApi
        : API_SITES[source].detail + `/index.php/vod/detail/id/${id}.html`;
    
    try {
        const response = await fetch(proxyUrl(detailUrl));
        const html = await response.text();

        let matches = [];
        if (source === 'ffzy') {
            matches = html.match(/(?<=\$)(https?:\/\/[^"'\s]+?\/\d{8}\/\d+_[a-f0-9]+\/index\.m3u8)/g) || [];
            matches = matches.map(link => link.split('(')[1]);
        } else {
            matches = html.match(/\$https?:\/\/[^"'\s]+?\.m3u8/g) || [];
            matches = matches.map(link => link.substring(1));
        }

        return matches;
    } catch (error) {
        throw new Error('获取视频详情失败');
    }
};

// 获取API URL，客户端使用重写规则，服务器端直接请求
const getApiUrl = (path: string) => {
    // 服务器端环境直接请求
    return `https://heimuer.tv/api.php/${path}`;
};

// 获取分类列表
export const getCategories = async () => {
  try {
    const url = getApiUrl("provide/vod/?ac=list&pagesize=1");

    console.log("Fetching categories from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: { class: Category[] } = await response.json();
    return data["class"] || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // 返回空数组避免整个应用崩溃
  }
};

// 按分类获取视频
export const getVideosByCategory = async ({
  categoryId,
  page = 1,
  pagesize = 10,
}: {
  categoryId: number;
  page?: number;
  pagesize?: number;
}) => {
  try {
    const url = getApiUrl(
      `provide/vod/?ac=videolist&pg=${page}&pagesize=${pagesize}&t=${categoryId}`
    );

    console.log(`Fetching videos for category ${categoryId} from:`, url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: { list: Video[] } = await response.json();
    return data["list"] || [];
  } catch (error) {
    console.error(`Error fetching videos for category ${categoryId}:`, error);
    return []; // 返回空数组避免整个应用崩溃
  }
};

export const getVideosBySearch = async ({
  categoryId,
  keyword,
  page = 1,
  pagesize = 10,
}: {
  categoryId?: number;
  keyword?: string;
  page?: number;
  pagesize?: number;
}) => {
  try {
    let url = getApiUrl(
      `provide/vod/?ac=videolist&pg=${page}&pagesize=${pagesize}`
    );

    if (categoryId) {
      url += `&t=${categoryId}`;
    }

    if (keyword) {
      url += `&wd=${encodeURIComponent(keyword)}`;
    }

    console.log(`Fetching videos for search from:`, url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: { list: Video[] } = await response.json();
    return data["list"] || [];
  } catch (error) {
    console.error(`Error fetching videos for search:`, error);
    return []; // 返回空数组避免整个应用崩溃
  }
};
