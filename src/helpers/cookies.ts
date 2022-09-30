import Cookies from 'js-cookie';
import { CookieValue } from '../context';

function removeBlackSpaces(value: string) {
    return value.replaceAll(' ', '_');
}
export function saveCookies(cookies: CookieValue[]) {
    cookies.forEach((cookie) => {
        const keys = Object.keys(cookie);
        const name = removeBlackSpaces(cookie[keys[0]]);
        const value = cookie[keys[1]];
        if(name !== '' && value.trim() !== ''){
            Cookies.set(name, value);
        }
    });
}
export function clearCookies(cookies: CookieValue[]) {
    cookies.forEach((cookie) => {
        const keys = Object.keys(cookie);
        const name = removeBlackSpaces(cookie[keys[0]]);
        const value = cookie[keys[1]];
        if(name !== '' && value.trim() !== ''){
            Cookies.set(name, value);
        }
    });
}
