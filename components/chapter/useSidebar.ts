"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sidebar-collapsed";

export function useSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "true") setCollapsed(true);
        } catch {
            // localStorage unavailable
        }
    }, []);

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
