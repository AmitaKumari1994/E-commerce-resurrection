import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Abhinav Shukla',
        email: 'Abhinav.shukla@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },

    {
        name: 'Amita kumari',
        email: 'Amita.kumari@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },

    {
        name: 'Ayaan Shukla',
        email: 'Ayaan.shukla@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
]

export default users;