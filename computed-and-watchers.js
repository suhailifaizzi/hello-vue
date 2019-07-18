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