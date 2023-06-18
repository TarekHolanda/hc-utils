import createCache from "@emotion/cache";

export default function MyEmotionCache() {
    return createCache({ key: "css", prepend: true });
}
