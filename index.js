const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

// conect to the database
const db = knex(knexConfig.development);

//endpoints
server.get('/', (req, res) => {
	res.send('api working');
});

// add whatever to whatever table
server.post('/api/:table', (req, res) => {
	const body = req.body;
	db(req.params.table)
		.insert(body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// list whatever
server.get('/api/:table', (req, res) => {
	db(req.params.table)
		.then(things => {
			res.status(200).json(things);
		})
		.catch(err => res.status(500).json(err));
});

//list whatever by ID with an added student tag
server.get('/api/:table/:id/students', (req, res) => {
	const id = req.params.id;
	db('students')
		.where({cohort_id: id})
		.then(thing => {
			res.status(200).json(thing);
		})
		.catch(err => res.status(500).json(err));
});

//list whatever by ID
server.get('/api/:table/:id', (req, res) => {
	const {id} = req.params;
	const {table} = req.params;
	console.log(table, id);
	if (table === 'students') {
		db(table)
			.join('cohorts', 'students.cohort_id', '=', 'cohorts.id')
			.select('students.id', 'students.name', {cohort :'cohorts.name'})
			.where({'students.id' : id})
			.then(thing => {
				res.status(200).json(thing);
			})
			.catch(err => res.status(500).json(err));
	} else {
		db(table)
			.where({id})
			.then(thing => {
				res.status(200).json(thing);
			})
			.catch(err => res.status(500).json(err));
	}
});

// delete whatever
server.delete('/api/:table/:id', (req, res) => {
	const id = req.params.id;
	db(req.params.table)
		.where({id: id})
		.del()
		.then(thing => {
			res.status(200).json(thing);
		})
		.catch(err => res.status(500).json(err));
});

// update whatever
server.put('/api/:table/:id', (req, res) => {
	const id = req.params.id;
	db(req.params.table)
		.where({id: id})
		.update(req.body)
		.then(thing => {
			res.status(200).json(thing);
		})
		.catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
