export type Config = {
    github: {
        owner: string | null;
        repo: string | null;
        token: string | null;
    }
}

export function saveConfig(config: Config) {
    if (!config.github.owner
        || !config.github.repo
        || !config.github.token
    ) {
        throw new Error("Incomplete config can not be saved.");
    }

    localStorage.setItem('markdiary.github.owner', config.github.owner);
    localStorage.setItem('markdiary.github.repo', config.github.repo);
    localStorage.setItem('markdiary.github.token', config.github.token);
}

export function loadConfig(): Config {
    return {
        github: {
            owner: localStorage.getItem('markdiary.github.owner'),
            repo: localStorage.getItem('markdiary.github.repo'),
            token: localStorage.getItem('markdiary.github.token')
        }
    }
}
