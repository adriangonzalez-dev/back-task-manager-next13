"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAvatar = void 0;
const avatars = [
    'Peanut', 'Simon', 'Abby', 'Rascal', 'Sasha', 'Boo', 'Lola', 'Sophie', 'Cuddles', 'Spooky',
    'Max', 'Lilly', 'Tiger', 'Molly', 'Kitty', 'Mimi', 'Milo', 'Luna', 'Snowball', 'Leo'
];
const randomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
};
exports.randomAvatar = randomAvatar;
