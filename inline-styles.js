var classBinding = new Vue ({
    el: '#class-binding',
    data: {
        isActive: true,
        error: null
/**
 *      classObject: {
 *          isActive: true,
 *          hasError: false
 *      }
 *  */  
    },
    computed: {
        classObject: function() {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
})

var arraySyntax = new Vue ({
    el: '#array-syntax',
    data: {
        isActive: false,
        activeClass: 'active',
        errorClass: 'text-danger'
    }
})

var styleBinding = new Vue ({
    el: '#style-binding',
    data: {
        styleObject: {
            color: 'red',
            fontSize: 30,
            message: 'This is a message.'
        }
    }
})