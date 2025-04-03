import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// 静态文件服务
app.use(express.static('public'));

// API 站点配置
const API_SITES = {
    heimuer: {
        api: 'https://json.heimuer.xyz',
        name: '黑木耳',
        detail: 'https://heimuer.tv',
    },
    ffzy: {
        api: 'http://ffzy5.tv',
        name: '非凡影视',
        detail: 'http://ffzy5.tv',
    },
};

// 搜索接口
app.get('/api/search', async (req, res) => {
    const searchQuery = req.query.wd;
    const source = req.query.source || 'heimuer';
    const customApi = req.query.customApi || '';

    try {
        const apiUrl = customApi
            ? customApi
            : API_SITES[source].api + '/api.php/provide/vod/?ac=list&wd=' + encodeURIComponent(searchQuery);
        
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('API 请求失败');
        }

        const data = await response.text();
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(400).json({
            code: 400,
            msg: '搜索服务暂时不可用，请稍后再试',
            list: [],
        });
    }
});

// 详情接口
app.get('/api/detail', async (req, res) => {
    const id = req.query.id;
    const source = req.query.source || 'heimuer';
    const customApi = req.query.customApi || '';
    
    const detailUrl = `https://r.jina.ai/${
        customApi ? customApi : API_SITES[source].detail
    }/index.php/vod/detail/id/${id}.html`;

    try {
        const response = await fetch(detailUrl);
        const html = await response.text();

        let matches = [];
        if (source === 'ffzy') {
            matches = html.match(/(?<=\$)(https?:\/\/[^"'\s]+?\/\d{8}\/\d+_[a-f0-9]+\/index\.m3u8)/g) || [];
            matches = matches.map(link => link.split('(')[1]);
        } else {
            matches = html.match(/\$https?:\/\/[^"'\s]+?\.m3u8/g) || [];
            matches = matches.map(link => link.substring(1));
        }

        res.json({
            episodes: matches,
            detailUrl: detailUrl,
        });
    } catch (error) {
        res.status(500).json({
            error: '获取详情失败'
        });
    }
});

// 首页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 