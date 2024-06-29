import { saveConfig, loadConfig } from './config-storage';

describe('[saveConfig]', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should throw when github owner is empty', () => {
        expect(() => saveConfig({
            github: {
                owner: null,
                repo: 'dairy',
                token: 'secret'
            }
        })).toThrow();
    });

    test('should throw when github repo is empty', () => {
        expect(() => saveConfig({
            github: {
                owner: 'grut',
                repo: null,
                token: 'secret'
            }
        })).toThrow();
    });

    test('should throw when github token is empty', () => {
        expect(() => saveConfig({
            github: {
                owner: 'grut',
                repo: 'dairy',
                token: null
            }
        })).toThrow();
    });

    test('should save config to local storage', () => {
        saveConfig({
            github: {
                owner: 'grut',
                repo: 'dairy',
                token: 'secret'
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
                owner: 'grut',
                repo: 'dairy',
                token: 'secret'
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
            }
        });
    });
});
