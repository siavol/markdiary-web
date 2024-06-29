import { saveConfig, loadConfig } from './config-storage';

const testGithub = {
    owner: 'grut',
    repo: 'dairy',
    token: 'secret'
};
const testCommitter = {
    author: 'I am Grut!',
    email: 'grut@galaxy.com'
};

describe('[saveConfig]', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should throw when github owner is empty', () => {
        expect(() => saveConfig({
            github: {
                ...testGithub,
                owner: null,
            },
            committer: {
                ...testCommitter
            }
        })).toThrow();
    });

    test('should throw when github repo is empty', () => {
        expect(() => saveConfig({
            github: {
                ...testGithub,
                repo: null
            },
            committer: {
                ...testCommitter
            }
        })).toThrow();
    });

    test('should throw when github token is empty', () => {
        expect(() => saveConfig({
            github: {
                ...testGithub,
                token: null
            },
            committer: {
                ...testCommitter
            }
        })).toThrow();
    });

    test('should save config to local storage', () => {
        saveConfig({
            github: {
                ...testGithub,
            },
            committer: {
                ...testCommitter
            }
        });

        expect(localStorage.getItem('markdiary.github.owner')).toEqual('grut');
        expect(localStorage.getItem('markdiary.github.repo')).toEqual('dairy');
        expect(localStorage.getItem('markdiary.github.token')).toEqual('secret');
    });
});

describe('[loadConfig]', () => {
    beforeAll(() => {
        saveConfig({
            github: {
                ...testGithub,
            },
            committer: {
                ...testCommitter
            }
        });
    });

    test('should load config from local storage', () => {
        var config = loadConfig();

        expect(config).toEqual({
            github: {
                owner: 'grut',
                repo: 'dairy',
                token: 'secret'
            },
            committer: {
                author: 'I am Grut!',
                email: 'grut@galaxy.com'
            }
        });
    });
});
