exports.up = function(knex, Promise) {
	//make channges
	return knex.schema
		.createTable('cohorts', tbl => {
			//primary key
			tbl.increments(); //defaults to a column named id, autoincrements

			//other feilds
			tbl.text('name', 128);

			// time stamps
			tbl.timestamps(true, true);

			//constraints
			tbl.unique('name', 'uq_cohors_name'); //makes name unique
		})
		.createTable('students', tbl => {
			//primary key
			tbl.increments(); //defaults to a column named id, autoincrements

			//other feilds
			tbl.text('name', 128);

			//other feilds
			tbl.integer('cohort_id')
				.unsigned()
				.references('id')
				.inTable('cohorts');

			// time stamps
			tbl.timestamps(true, true);

			//constraints
			tbl.unique('name', 'uq_student_name'); //makes name unique
		});
};

exports.down = function(knex, Promise) {
	//undo changes
	return knex.schema
		.dropTableIfExists('cohorts')
		.dropTableIfExists('students');
};
