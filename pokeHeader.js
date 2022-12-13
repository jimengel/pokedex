Vue.component('poke-header', {
    data: function () {
	return {
	    typeValue: '',
	    theSearch: undefined,
	    theFavorite: '',
	    getFavorite: undefined,
	    theView: ''
	}
    },
    props: [ 'results', 'showit', 'types' ],
    methods: {
	changeType: function( ) {
	    pokeApp.$data.typeValue = this.typeValue 
	    //console.log( "----type" , this.typeValue, "-", this.theSearch,  "-", this.getFavorite, "-")
	    pokeApp.getInitialPokeData( this.typeValue, this.theSearch, this.getFavorite)
	},
	changeSearch: function( ) {
	    //console.log( "----search" , this.typeValue, this.theSearch, this.getFavorite)
	    pokeApp.$data.theSearch = this.theSearch
	    pokeApp.getInitialPokeData( this.typeValue, this.theSearch, this.getFavorite)
	},
	changeView: function( ) {
	    if ( this.theView == 'GRID' ) {
		pokeApp.$data.showIt = 'GRID';
	    } else {
		pokeApp.$data.showIt = 'LIST';
	    }
	},
	showAllFav: function( ) {
	    if ( this.theFavorite == 'All' ) {
		this.getFavorite = undefined;
	    } else {
		this.getFavorite = "true"
	    }
	    pokeApp.$data.theFavorite = this.getFavorite
	    pokeApp.$data.theSearch   = this.typeSearch
	    pokeApp.$data.typeValue   = this.typeValue
	    pokeApp.$data.pagePosition = 0;
	    pokeApp.getInitialPokeData( this.typeValue, this.theSearch, this.getFavorite)
	    //console.log( "---ALL" , this.typeValue, this.theSearch, this.getFavorite)
	}
    },
    template: ` <div>
                <div class="w3-row">
                    <input id="SEARCH" class="w3-input w3-border w3-col m2" type="text" placeholder="Regex Search" v-model="theSearch" @change="changeSearch()">
                    <select id="FAV" class="w3-select w3-col m2" name="fav" v-model="theFavorite" @change="showAllFav()">
                      <option value="" disabled selected>Favorites/All</option>
                      <option value="All" selected>All</option>
                      <option value="Favorites" >Favorites</option>
                    </select>
                    
                    <select id="TYPE" class="w3-select w3-col m2" name="option" v-model="typeValue" @change="changeType()">
                      <option value="" disabled selected>Types</option>
                      <option value="All" >All</option>
                      <option v-for="theType in types"  >{{theType}}</option>
                    </select>

                    <select id="VIEW" class="w3-select w3-col m2" name="fav" v-model="theView" @change="changeView()">
                      <option value="" disabled selected>View</option>
                      <option value="GRID" selected>Grid</option>
                      <option value="LIST" >List</option>
                    </select>
  	            <button class="w3-bar-item w3-button w3-red w3-round-large" onclick="clearAll()">Clear All</button>
                </div>
                </div>`
});


//<button class="w3-bar-item w3-button" onclick="pokeApp.$data.showIt = 'ALL'">All</button>
//<button class="w3-bar-item w3-button" onclick="pokeApp.$data.showIt = 'FAVORITE'">Favorites</button><br>
//     <button class="w3-button w3-col m2" onclick="changeToList()">List View</button>
//     <button class="w3-button w3-col m2" onclick="changeToGrid()">Grid View</button>
