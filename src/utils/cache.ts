import { type Post } from "../types";

interface CacheItem<T> {
    data: T;
    timestamp: number;
}

class Cache<T> {
    private cache: Map<string, CacheItem<T>> = new Map();
    private ttl: number;

    constructor(ttl: number = 5 * 60 * 1000) {
        this.ttl = ttl;
    }

    set(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    get(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        const isExpired = Date.now() - item.timestamp > this.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    has(key: string): boolean {
        const item = this.cache.get(key);
        if (!item) return false;

        const isExpired = Date.now() - item.timestamp > this.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    getSize(): number {
        return this.cache.size;
    }

    getKeys(): string[] {
        return Array.from(this.cache.keys());
    }
}

export const postsCache = new Cache<Post[]>();
export const postCache = new Cache<Post>();
export const commentsCache = new Cache<Comment[]>();

import { useState, useEffect } from "react";

interface UseCacheOptions<T> {
    cacheKey: string;
    fetchFn: () => Promise<T>;
    ttl?: number;
    enabled?: boolean;
}

export function useCache<T>({
    cacheKey,
    fetchFn,
    ttl = 5 * 60 * 1000,
    enabled = true,
}: UseCacheOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {

                const tempCache = new Cache<T>(ttl);
                const cachedData = tempCache.get(cacheKey);
                if (cachedData) {
                    setData(cachedData);
                    setLoading(false);
                    return;
                }

                const freshData = await fetchFn();
                tempCache.set(cacheKey, freshData);
                setData(freshData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ошибка загрузки");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cacheKey, fetchFn, ttl, enabled]);

    return { data, loading, error };
}