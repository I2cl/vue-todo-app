import Vue from 'vue/dist/vue.esm';
import axios from 'axios';


var filters = {
  open: function (tasks) {
    return tasks.filter(function (task) {
      return task.status == 1
    })
  },
  doing: function (tasks) {
    return tasks.filter(function (task) {
      return task.status == 2
    })
  },
  closed: function (tasks) {
    return tasks.filter(function (task) {
      return task.status == 3
    })
  }
}

Vue.component('task-card', {
  props: ['task'],
  template: `<div class="card">
  <div class="card-content">
  {{ task.name }}
  </div>
  <footer class="card-footer">
  <div class="card-footer-item">
  {{ task.assignee }}
  </div>
  <div class="card-footer-item">
  {{ task.mandays }} 日間でお願いします
  </div>
  </footer>
  <footer class="card-footer">
  <a class="card-footer-item" @click="decrementStatus(task)">◀︎</a>
  <a class="card-footer-item" @click="incrementStatus(task)">▶︎</a>
  </footer>
  </div>`,
  methods: {
    incrementStatus: function (task) {
      if(1 <= task.status && task.status <= 2) {
        task.status++
      }
    },
    decrementStatus: function (task) {
      if(2 <= task.status && task.status <= 3) {
        task.status--
      }
    }
  }
})

new Vue({
  el: '#board',
  data: {
    tasks: [],
    newTaskName: '',
    newTaskAssignee: null,
    newTaskMandays: null,
    todos: [],
  },
  computed: {
    tasksOpen: function () {
      return filters.open(this.tasks)
    },
    tasksDoing: function () {
      return filters.doing(this.tasks)
    },
    tasksClosed: function () {
      return filters.closed(this.tasks)
    },
    getTodos: function(){
      var self = this;
      axios.get("/api/todos/")
        .then(function(response) {
          self.tasks = response.data
          console.log(response);
        });
    },
  },
  methods: {
    addTask () {
      this.tasks.push({ name: this.newTaskName, status: 1, assignee: this.newTaskAssignee, mandays: this.newTaskMandays })
      axios.post('/api/todos', { todo: { name: this.newTaskName, assignee: this.newTaskAssignee, mandays: this.newTaskMandays, status: 1 } })
    },
  },
  mounted: function () {
    this.getTodos
  },
})
