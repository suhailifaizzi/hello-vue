var computedProperties = new Vue({
    el: '#computed-properties',
    data: {
        message: 'Initial message',
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('')
        }
    }
})

var computedCachedUnlessChanged = new Vue({
    el: '#computed-cached-unless-changed',
    computed: {                                             // Won't change until reactive value changes, always take from cached
        computedDateNow: function() {
            return Date.now()
        }
    },
    methods: {
        methodsDateNow: function() {
            return Date.now()
        }
    }
})

var computedAndWatch = new Vue({
    el: '#computed-and-watch',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    // Watcher will watch any changes to first name and last name and pass them will generate new fullname. ANY CHANGES means DO NOT need function CALL.
    watch: {
        firstName: function(val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function(val) {
            this.fullName = this.firstName + ' ' + val
        }
    },
    computed: {
        getFullName: function() {
            return this.firstName + ' ' + this.lastName
        },
        // Is this valid? Changing fullname
        setFullName: function(value) {
            this.fullname = value
        }
    }
})

var computerSetters = new Vue ({
    el: '#computed-setters',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            // Getter
            get: function() {
                return this.firstName + ' ' + this.lastName
            },
            //Setter
            set: function(val) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})

var watchers = new Vue({
    el: '#watchers',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        //Whener question changes, this function will run
        question: function(newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        // _.debounce is a function provided by lodash to limit how
        // often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function() {
            if(this.question.indexOf('?') === -1) {
                this.answer = 'Question usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function(response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function(error) {
                    vm.answer = 'Error! Could not reach the API. ' + error 
                })
        }
    }
})