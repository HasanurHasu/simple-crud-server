const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());;
app.use(express.json());

// hasanurhasu127

// kVk68oTatmjuxG7P




const uri = "mongodb+srv://hasanurhasu127:kVk68oTatmjuxG7P@cluster0.7dcoggr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const usersCollection = client.db('usersDB').collection('users')

        app.get('/users', async(req, res) => {
            const cursor = usersCollection.find();
            const results = await cursor.toArray();
            res.send(results)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            console.log('please delete from database', id);
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
});

app.listen(port, () => {
    console.log(`SIMPLE CRUD is running on port, ${port}`);
})
