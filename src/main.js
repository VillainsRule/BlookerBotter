import axios from 'axios';
import readline from 'node:readline';

const rl = readline.createInterface(process.stdin, process.stdout);

let count = 0;
let successful = 0;
let failed = 0;

console.log(`\n   enter a bsid to begin:`);

rl.question('   > ', (bsid) => {
    console.log('\n   bsid entered! enter a game ID:');

    rl.question('   > ', async (id) => {
        console.log('\n   botting...\n');

        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            axios.post('https://play.blooket.com/api/playersessions/solo', {
                gameMode: 'Defense',
                questionSetId: id
            }, {
                headers: {
                    cookie: bsid,
                    referer: 'https://play.blooket.com/solo?id=' + id,
                    'referrer-policy': 'strict-origin-when-cross-origin'
                }
            }).then(() => {
                count++;
                successful++;

                console.log(`   sent play request <> now at ${successful} successful requests!`);
            }).catch(() => {
                count++;
                failed++;

                console.log(`   error occurred fetching. probably ratelimits.`);
            });

            await new Promise((r) => setTimeout(r, 64));
        }
    });
});

process.on('SIGINT', () => {
    console.log(`\n   botting session ended! successful: ${successful}, failed: ${failed}, total: ${count}`);
    process.exit();
});