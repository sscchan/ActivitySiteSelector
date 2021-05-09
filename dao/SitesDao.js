const Redis = require("ioredis");
const client = new Redis(process.env.REDIS_URL);

const SEED_SITES_DATA = [
    {"name": "Adelaide", "latitude": -34.9285, "longitude": 138.6007},
    {"name": "Mt Barker", "latitude": -35.0732, "longitude": 138.8576},
];

async function seedDatabaseData() {
    let sites = await getSites();
    if (sites.length > 0) {
        console.log("Some site data already exists in Redis database, skipping seeding operation.");
    } else {
        console.log("Seeding initial site data to Redis database.");
        for (seedSite of SEED_SITES_DATA) {
            const isSeedSiteAlreadyInDatabase = await client.exists(seedSite.name);
            if (!isSeedSiteAlreadyInDatabase) {
                console.log("Seeding " + seedSite.name + " Entry");
                await addSite(seedSite.name, seedSite.latitude, seedSite.longitude);
            }
        }
        console.log("Completed initial site data seed to Redis database.")
    }
}

async function addSite(name, latitude, longitude) {
    console.log(`Inserting ${name} with (${latitude},${longitude}) to the database.`)
    await client.set(name, JSON.stringify({
        "name": name,
        "latitude": latitude,
        "longitude": longitude 
    }))
}

async function deleteSite(name) {
    console.log(`Removing ${name} site if it exists.`)
    await client.del(name);
}

async function getSites() {
    console.log("Retrieving list of sites from Redis database.");
    let sites = [];

    let keys = await client.keys('*');
    for (key of keys) {
        const retrievedValueString = await client.get(key);
        if (retrievedValueString !== null) {
            const retrievedValue = JSON.parse(retrievedValueString);
            sites.push(retrievedValue);
        }
    }

    return sites;
}

function disconnectDatabase() {
    client.disconnect();
}

seedDatabaseData();

exports.addSite = addSite;
exports.getSites = getSites;
exports.deleteSite = deleteSite;
exports.disconnectDatabase = disconnectDatabase;