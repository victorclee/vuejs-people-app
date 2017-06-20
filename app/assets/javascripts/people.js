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
        var params = {
                      name: this.newPersonName,
                      bio: this.newPersonBio
                      };
        $.post('/api/v1/people.json', params, function(newPerson){
          this.people.push(newPerson);
          this.newPersonName = '';
          this.newPersonBio = '';
        }.bind(this));                  
      },
      deletePerson : function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    }
  });
});