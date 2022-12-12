var baseUrl  = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon"
var typesUrl = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types"


// Get the details of the particular pokemon
const getDetails = async( theItem ) =>{
    console.log( "THE ITEM DETAILS" , theItem )
    var resp
    try {
	const resp = await axios.get(baseUrl + '/' + theItem.id, {responseType: 'json', params: {}})
	//console.log( "----------", resp.data )
	pokeApp.details = resp.data;
	pokeApp.savedView = pokeApp.showIt;
	pokeApp.showIt = 'DETAILS';
    } 
    catch( error ) {
	console.log( error )
	alert( "Problem getting data from server. Server " + baseUrl + '/' + theItem.id );
	return ;
    };
}

// When selecting a pokemon tp be/not be a favotite toggle the setting
const toggleFavorite = async( theItem ) =>{
    console.log( "THE POST setting " , theItem )
    var resp
    try {
	if ( theItem.isFavorite == true ) {
	    console.log( baseUrl + '/' + theItem.id + '/unfavorite' )
	    const resp = await axios.post(baseUrl + '/' + theItem.id + '/unfavorite');
	} else {
	    console.log( baseUrl + '/' + theItem.id + '/favorite' )
	    const resp = await axios.post(baseUrl + '/' + theItem.id + '/favorite')
	}
	if (  pokeApp.$data.theFavorite == "true" ) {
	    pokeApp.getInitialPokeData( this.typeValue, this.theSearch, true)
	}
    } 
    catch( error ) {
	console.log( error )
	alert( "Problem posting data from server. Server " + baseUrl + '/' + theItem.id );
	return ;
    };
}

// Clear all tweaked setting, like type, favorite and view and set it to the loading baseline
function clearAll(  ) {
    pokeApp.getInitialPokeData( this.typeValue, this.theSearch)
    document.getElementById("TYPE").value = "All"
    document.getElementById("FAV").value = "All"
    document.getElementById("VIEW").value = "GRID"
    pokeApp.showIt = "GRID"
    document.getElementById("SEARCH").value = ""
}

Vue.config.errorHandler = function(err, vm, info) {
  //console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}

// The main vue app.
var pokeApp = new Vue({
    el: '#mainapp',
    data: {
        results: [],
	details: {},
	types: [],
	showIt: 'GRID',
	savedView: '',
	theItem: {},
	typeValue: '',
	theSearch: '',
	theFavorite: ''
    },
    methods: {
	toggleFavorite: function( theItem ) {
	    console.log( "THE ITEM" , theItem )
	},
	async getInitialPokeData( theType, theSearch, theFavorite) {
	    if ( theType == 'All' ) {
		theType = undefined
	    }
	    var getSize = 20
	    var count = 0;
	    try {
		this.results = [];
		//console.log( "----first" , getSize,  count, "-", theSearch, "-",theType, "-", theFavorite, "-")
		resp = await axios.get(baseUrl, {responseType: 'json', params: {limit:getSize,  offset: count, search: theSearch, type: theType, isFavorite: theFavorite }})
		this.results = resp.data.items;

		count = getSize
		//console.log( "number = " + resp.data.count )
		for ( i = 1; i < (resp.data.count / getSize); i++) {
		    console.log( "----subsequent" , getSize,  count, theSearch, theType, theFavorite)
		    resp = await axios.get(baseUrl, {responseType: 'json', params: {limit: getSize,  offset: count, search: theSearch, type: theType, isFavorite: theFavorite }})
		    this.results.push( ...resp.data.items );
		    count = count + getSize
		}

	    }
	    catch( error ) {
		alert( "Problem getting data from server. Server " + baseUrl );
		return ;
    	    };

	},
	async getPokeTypes( ) {
	    try {
		resp = await axios.get(typesUrl, {responseType: 'json', })
		this.types = resp.data;
		console.log( "types %o", this.types);

	    }
	    catch( error ) {
		alert( "Problem getting data from server. Server " + baseUrl );
		return ;
    	    };

	}
    }
})


pokeApp.getInitialPokeData( "", "" );
pokeApp.getPokeTypes();

