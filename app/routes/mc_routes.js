let ObjectID = require('mongodb').ObjectID;
const cardsInfo = require('../../cardsInfo');

module.exports = function(app, db) {

    // update cards
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = { name: req.body.name, info: req.body.info };
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(user);
            } 
        });
    });

    // get cards
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item.info);
            }
        });
    });

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

    // add new user (if not exists)
    app.post('/users', (req, res) => {
        const user = { name: req.body.name, info: cardsInfo };
        db.collection('users').insert(user, (err, result) => {
            if (err) { 
              res.send({ 'error': 'An error has occurred' }); 
            } else {
              res.send(result.ops[0]);
            }
        });
    });
};