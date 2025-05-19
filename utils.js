export const GITHUB_PAGES_DIRECTORY = '/AnimeCentral/';
export const IS_ON_GITHUB_PAGES = await import('fs').then((fs) => {
    return fs.existsSync(GITHUB_PAGES_DIRECTORY);
});