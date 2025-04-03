export type ApiSite = {
    api: string;
    name: string;
    detail: string;
};

export type ApiSites = {
    [key: string]: ApiSite;
};

export const API_SITES: ApiSites = {
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