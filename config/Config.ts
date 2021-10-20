const SERVER = {
    dev: 'http://localhost:3000',
    production: ''
};

export const SERVER_ORIGIN = process.env.NODE_ENV === 'production' ? SERVER.production : SERVER.dev;