module.exports = async function(context, commands) {
    await commands.navigate('https://kiosk-sit3.qa.spdigital.sg/payment/services');

    await commands.wait.byTime(1000);

    const decryptionData = await commands.js.run(`
            const decryptMeasures = performance.getEntriesByType('measure')
            .filter(e => e.name.startsWith('decryption-'))
            .map(m => ({
              name: m.name.replace('decryption-', ''),
              duration: m.duration
            }));
            
            const grouped = {};
            decryptMeasures.forEach(m => {
            if (!grouped[m.name]) grouped[m.name] = [];
            grouped[m.name].push(m.duration);
            });
            
            const summary = {};
            for (const [name, durations] of Object.entries(grouped)) {
            const total = durations.reduce((a, b) => a + b, 0);
            summary[name] = {
              count: durations.length,
              avg: total / durations.length,
              min: Math.min(...durations),
              max: Math.max(...durations),
              durations
            };
            }
            
            return summary;
            `);

    console.log("Start calculate metrics", decryptionData)
};
