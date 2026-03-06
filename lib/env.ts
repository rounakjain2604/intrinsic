function readEnv(name: string): string | null {
    const value = process.env[name];
    return value && value.length > 0 ? value : null;
}

export function getRequiredEnv(name: string): string {
    const value = readEnv(name);

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export function getAppUrl(): string {
    const explicitUrl = readEnv("NEXT_PUBLIC_APP_URL");
    if (explicitUrl) {
        return explicitUrl;
    }

    const vercelUrl = readEnv("VERCEL_URL");
    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }

    return "http://localhost:3000";
}