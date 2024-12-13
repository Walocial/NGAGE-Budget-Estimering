export default class CacheService {
    public static Save(key: string, value: unknown, ttlHours: number): void {
      const expiry = new Date(
        new Date().setHours(new Date().getHours() + ttlHours)
      );
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
      localStorage.setItem(this.dateKey(key), JSON.stringify(expiry));
    }
  
    public static Load<T>(key: string): T | undefined {
      const expiry = localStorage.getItem(this.dateKey(key));
      if (!expiry || Date.parse(JSON.parse(expiry)) < Date.now())
        return undefined;
      const value = localStorage.getItem(this.getKey(key));
      if (!value) return undefined;
      return JSON.parse(value) as T;
    }
  
    static dateKey(key: string): string {
      return this.getKey(key) + "-exp";
    }
  
    static getKey(key: string): string {
      return key;
    }
  }
  