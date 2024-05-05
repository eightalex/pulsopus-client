import { ABOUT_ROUTE, METHODOLOGY_ROUTE, USER_CASES_ROUTE } from "@/constants/routes.ts";

export const navLabelByPath: Record<string, string> = {
    [ABOUT_ROUTE]: "About as",
    [METHODOLOGY_ROUTE]: "Methodology",
    [USER_CASES_ROUTE]: "User cases",
};

export const navDisabledByPath: Record<string, boolean> = {
    [ABOUT_ROUTE]: true,
    [METHODOLOGY_ROUTE]: true,
    [USER_CASES_ROUTE]: true,
};

export const navLinks: string[] = [
    ABOUT_ROUTE,
    METHODOLOGY_ROUTE,
    USER_CASES_ROUTE,
];