import { writable } from 'svelte/store';

const savedUser = localStorage.getItem('user');

export const user = writable(savedUser ? JSON.parse(savedUser) : '');

user.subscribe(value => {
    if (value) {
        localStorage.setItem('user', JSON.stringify(value));
    } else {
        localStorage.removeItem('user');
    }
});
