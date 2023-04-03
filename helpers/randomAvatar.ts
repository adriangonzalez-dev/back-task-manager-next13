const avatars =[
    'Peanut','Simon','Abby','Rascal','Sasha','Boo','Lola','Sophie','Cuddles','Spooky',
    'Max','Lilly','Tiger','Molly','Kitty','Mimi','Milo','Luna','Snowball','Leo'
]

export const randomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);

    return avatars[randomIndex];
}