const mongoose = require("mongoose");
const cities = require("./cities");
const {places,descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/MadhuDB';
mongoose.connect('mongodb://localhost:27017/MadhuDB', {
    connectTimeoutMS: 30000,
})
.then(() => {
    console.log("MongoDB connected!");
})
.catch(err => {
    console.log("connection error:", err);
});

const sample = array =>array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // your User Id
            author: '6724fc3e8f3b2471ccc68176',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque libero ex exercitationem consequatur id. Mollitia autem veritatis eum, vitae, recusandae quos exercitationem numquam asperiores consequuntur laboriosam voluptatem, iste quia nisi.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhvbxi277/image/upload/v1731240143/YelpCamp/m40yid65gpwgq3ixogah.webp',
                    filename: 'YelpCamp/m40yid65gpwgq3ixogah',
                  },
                  {
                    url: 'https://res.cloudinary.com/dhvbxi277/image/upload/v1731240143/YelpCamp/imtpfsowd8zbxiebeigp.webp',
                    filename: 'YelpCamp/imtpfsowd8zbxiebeigp',
                  },
                  {
                    url: 'https://res.cloudinary.com/dhvbxi277/image/upload/v1731240143/YelpCamp/sqeeikqmpj1apwzl8dwl.webp',
                    filename: 'YelpCamp/sqeeikqmpj1apwzl8dwl',
                  }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() =>{
    mongoose.connection.close();
})
