
declare module '*.json' {
    const value : any;
    export default value;
}

declare module '*.svg' {
    const content : any;
    export default content;
}

declare module 'why-did-you-update' {
    const value : any;
    export const whyDidYouUpdate : any;
    export default value;
}

declare const INDEXEDDBNAME : string;
declare const INDEXEDDBVERSION : string;
declare const API_URL : string;
declare const ASSET_BASE : string;
