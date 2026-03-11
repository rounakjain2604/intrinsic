import { currentUser } from "@clerk/nextjs/server";

function getAdminEmails() {
    const raw = process.env.CONTENT_ADMIN_EMAILS ?? "";
    return raw
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export async function isContentAdmin() {
    const adminEmails = getAdminEmails();
    if (adminEmails.length === 0) {
        return false;
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase();

    return Boolean(email && adminEmails.includes(email));
}

export function hasConfiguredContentAdmins() {
    return getAdminEmails().length > 0;
}
