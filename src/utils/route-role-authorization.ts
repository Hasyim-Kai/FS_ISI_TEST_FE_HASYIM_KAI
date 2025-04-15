import { Path } from "@/router";

export const UserRoutes: Path[] = [
]

export function isRouteAuthorized(pathname: string): boolean {
    for (const route of UserRoutes) {
        const regex = new RegExp(`^${route.replace(/:\w+/, "(.+)")}$`);
        if (regex.test(pathname)) {
            return true;
        }
    }
    return false;
}