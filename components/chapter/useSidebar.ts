"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "sidebar-collapsed";

export function useSidebar() {
    const [collapsed, setCollapsed] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored === "true";
        } catch {
            return false;
        }
    });

    const toggle = useCallback(() => {
        setCollapsed((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, String(next));
            } catch {
                // localStorage unavailable
            }
            return next;
        });
    }, []);

    return { collapsed, toggle } as const;
}
