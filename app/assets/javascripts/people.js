document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: '',
      newPersonBio: ''
    },
    mounted: function () {
      $.get('/api/v1/people.json', function(peopleResponse) {
        this.people = peopleResponse;
      }.bind(this));
    },
    methods: {
      toggleBio: function(person) {
        person.bioVisible = !person.bioVisible;
      },
      addPerson: function() {
        var newPerson = {
                          name: this.newPersonName,
                          bio: this.newPersonbio,
                          bioVisible: false
                          };
        this.people.push(newPerson);
        this.newPersonName = '',
        this.newPersonBio = ''
      },
      deletePerson : function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    }
  });
});