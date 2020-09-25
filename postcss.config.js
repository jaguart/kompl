// Note that this is REQUIRED by postcss so must NOT use ES6 Module syntax.
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
            zindex: false,  // DONT replace z-index with 1 when using advanced!
            // preset: 'advanced', // 2byte diff??
        }),
    ],
};
