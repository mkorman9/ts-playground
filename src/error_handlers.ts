process.on('SIGINT', async () => {
    console.log('Exiting');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled rejection: ${reason} ${p}`);
});
