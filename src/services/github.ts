import { Buffer } from 'buffer';
import { Config } from "./config-storage";

export async function writeFileContent(title: string, content: string, timestamp: Date, config: Config) {
    const owner = config.github.owner;
    const repo = config.github.repo;
    const token = config.github.token;
    
    const author = 'Ilya Shestakov';
    const email = 'siavol@gmail.com';

    const { fullYear, month, day, time } = dateParts(timestamp);

    const folder = 'journal';
    const filePath =  [ fullYear, month, `${fullYear}${month}${day}-${time}.md` ].join('/');

    const markdown = `# ${title}\n${content}`;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}/${filePath}`;
    const headers = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        message: `${fullYear}${month}${day}-${time}`,
        committer: {
            name: author,
            email: email
        },
        content: Buffer.from(markdown).toString('base64')
    });

    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    return data;
}

function dateParts(date: Date) {
    const fullYear = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}${minutes}`;

    return {
        fullYear: fullYear,
        month: month,
        day: day,
        time: time
    };
}
