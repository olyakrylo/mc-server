let ObjectID = require('mongodb').ObjectID;
const cardsInfo = require('../../cardsInfo');

module.exports = function(app, db) {

    app.get('/users/ping', (_, res) => {
        res.send('ping');
    })

    // update cards
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                const user = { name: req.body.name, info: req.body.info, password: item.password };
                db.collection('users').update(details, user, (err, result) => {
                    if (err) {
                        res.send({'error':'An error has occurred'});
                    } else {
                        res.send(user);
                    } 
                });
            } 
        });
    });

    // auth
    app.post('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { "_id": new ObjectID(id), "password": req.body.password };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                if (item) {
                    res.send(item.info);
                } else {
                    res.send([])
                }
            }
        })
    })

    //reg
    app.post('/users', (req, res) => {
        const { name, password } = req.body;
        const user = { name: name, password: password, info: cardsInfo };
        db.collection('users').insert(user, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                let newUser = result.ops[0];
                res.send({
                    id: newUser._id,
                    info: newUser.info
                });
            }
        });
    })

    // get all users
    app.get('/users', (req, res) => {
        db.collection('users').find().toArray((err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result.map(x => {
                    return {
                        name: x.name,
                        id: x._id
                    }
                }))
            }
        })
    })
};