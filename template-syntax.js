var bindId = new Vue({
    el: '#bind-id',
    data: {
        dynamicId: 1
    },
    methods: {
        incrementId: function(dynamicId) {
            this.dynamicId += 1
        }
    }
})