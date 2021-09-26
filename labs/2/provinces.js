var app = new Vue({
    el: '#app',
    data: {
        provinces: []
    },
    methods: {
        getProvinces: function() {
            fetch('data.php', {method: 'GET',})
                .then( response => response.json())
                .then( json => {this.provinces = json})
        },
        getCantons: function(province) {
            console.log(province);
        },
        getDistricts: function(province, canton) {
            console.log(province);
            console.log(canton);
        }
    },
    mounted: function () {
        this.getProvinces();
    }
})