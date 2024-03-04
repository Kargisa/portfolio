export const writeCookie= (name: string, value: string, ttl: number, path: string) =>{
    const d = new Date();
    d.setTime(d.getTime() + ttl * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=${path};SameSite=Strict`;
}