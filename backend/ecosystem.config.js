module.exports = {
    apps: [
        {
            name: 'backend-instance-newer',
            script: './dist/server.js',
            instances: 1,
            watch: true,
            ignore_watch: ['log', 'node_modules', 'uploads'],
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
