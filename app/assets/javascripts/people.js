document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: '',
      newPersonBio: '',
      errors: [],
      nameFilter: '',
      sortAttribute: 'name',
      sortAscending: true
    },
    mounted: function () {
      $.get('/api/v1/people.json', function(peopleResponse) {
        this.people = peopleResponse;
      }.bind(this));
    },
    computed: {
      modifiedPeople: function() {
        return this.people.sort(function(person1, person2) {
          if (this.sortAscending) {
            return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);
          } else {
            return person2[this.sortAttribute].localeCompare(person1[this.sortAttribute]);
          }
        }.bind(this));
      }
    },
    methods: {
      setSortAttribute: function(inputAttribute) {
        if (inputAttribute !== this.sortAttribute) {
          this.sortAscending = true;
        } else {
          this.sortAscending = !this.sortAscending;
        }
        this.sortAttribute = inputAttribute;
      },
      isValidPerson: function(inputPerson) {
        return inputPerson.name.indexOf(this.nameFilter) !== -1
      },
      toggleBio: function(person) {
        person.bioVisible = !person.bioVisible;
      },
      addPerson: function() {
        this.errors = [];
        var params = {
                      name: this.newPersonName,
                      bio: this.newPersonBio
                      };
        $.post('/api/v1/people.json', params, function(newPerson){
          this.people.push(newPerson);
          this.newPersonName = '';
          this.newPersonBio = '';
        }.bind(this)).fail(function(response) {
          this.errors = (response.responseJSON.errors);
        }.bind(this));                  
      },
      deletePerson : function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    }
  });
});