import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialUser = null;

if (browser) {
    initialUser = localStorage.getItem('user');
}

export const user = writable(initialUser);

if (browser) {
    user.subscribe(value => {
        if (value) {
            localStorage.setItem('user', value);
        } else {
            localStorage.removeItem('user');
        }
    });
}

