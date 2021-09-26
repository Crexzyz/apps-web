var app = new Vue({
    el: '#app',
    data: {
        provinces: [],
        selectedProvince: null,
        cantons: [],
        districts: []
    },
    methods: {
        getProvinces: function() {
            fetch('data.php', {method: 'GET',})
                .then( response => response.json())
                .then( json => {this.provinces = json})
        },
        getCantons: function() {
            fetch('data.php', {method: 'POST', body: JSON.stringify({type: "canton", province: this.selectedProvince})})
                .then( response => response.json())
                .then( json => {this.cantons = json});

            this.districts = [];

        },
        getDistricts: function(cantonOption) {
            selectedCanton = cantonOption.target.value;
            fetch('data.php', {method: 'POST', body: JSON.stringify({type: "district", province: this.selectedProvince, canton: selectedCanton})})
                .then( response => response.json())
                .then( json => {this.districts = json})
        }
    },
    mounted: function () {
        this.getProvinces();
    }
})