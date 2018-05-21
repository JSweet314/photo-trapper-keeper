exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(function () {
      return knex('photos').insert([
        {title: '1 amazing photo!', url: 'https://i.imgur.com/MA2D0.jpg'},
        { title: '2 amazing photos!', url: 'https://i.imgur.com/JXetxQh.jpg'},
        { title: '3 amazing photos!', url: 'https://i.imgur.com/TUQvrsV.jpg'}
      ]);
    });
};
