import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);

let count = 0;

console.log(`\n\t   enter a bsid to begin:`);

rl.question('\t   > ', (bsid) => {
    console.log('\tbsid entered! enter a game ID:');

    rl.question('\n\t   > ', (id) => {
        console.log('\n\tepic, botting...');

        setInterval(() => {
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
                console.log(`\tsent play request <> now at ${count} requests!`);
            }).catch(() => console.log(`\tcurrently rate limited (or some other err occured).`));
        }, 20);
    });
});