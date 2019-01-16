
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Bob Dole', cohort_id: 1},
        {name: 'Bob Dole jr', cohort_id: 1},
        {name: 'bOb DoLe tHe 3Rd', cohort_id: 3}
      ]);
    });
};
