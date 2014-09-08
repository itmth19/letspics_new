angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff',nationality:'American' },
    { id: 1, name: 'G.I. Joe',nationality:'American' },
    { id: 2, name: 'Miss Frizzle',nationality:'American' },
    { id: 3, name: 'Ash Ketchum',nationality:'American' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Searchlist', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var searchlist = [
    { id: 0, nationality: 'American', gender:'male',nation_img:'img/america.png' },
    { id: 1, nationality: 'American',gender:'female',nation_img:'img/america.png' },
    { id: 2, nationality: 'Vietnamese',gender:'male',nation_img:'img/vietnam.png' },
    { id: 3, nationality: 'Vietnamese',gender:'female',nation_img:'img/vietnam.png' },
    { id: 4, nationality: 'Brazil', gender:'male',nation_img:'img/brazil.png' },
    { id: 5, nationality: 'Brazil',gender:'female',nation_img:'img/brazil.png' },
    { id: 6, nationality: 'Nepal',gender:'male',nation_img:'img/nepal.png' },
    { id: 7, nationality: 'Nepal',gender:'female',nation_img:'img/nepal.png' }
  ];

  return {
    all: function() {
      return searchlist;
    },
    get: function(id) {
      // Simple index lookup
      return searchlist[id];
    }
  }
});

