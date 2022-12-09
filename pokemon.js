var baseUrl  = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon"
var typesUrl = "https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types"


const getDetails = async( theItem ) =>{
    console.log( "THE ITEM DETAILS" , theItem )
    var resp
    try {
	const resp = await axios.get(baseUrl + '/' + theItem.id, {responseType: 'json', params: {}})
	console.log( "----------", resp.data )
	mySimpleApp.details = resp.data;
	mySimpleApp.savedView = mySimpleApp.showIt;
	mySimpleApp.showIt = 'DETAILS';
    } 
    catch( error ) {
	console.log( error )
	alert( "Problem getting data from server. Server " + baseUrl + '/' + theItem.id );
	return ;
    };
}

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
	if (  mySimpleApp.$data.theFavorite == "true" ) {
	    console.log( "Before" )
	    //mySimpleApp.getInitialPokeData( this.type_value, this.the_search, true)
	    mySimpleApp.getInitialPokeData( this.typeValue, this.theSearch, true)
	    console.log( "After" )
	}
    } 
    catch( error ) {
	console.log( error )
	alert( "Problem posting data from server. Server " + baseUrl + '/' + theItem.id );
	return ;
    };
}

function clearAll(  ) {
//    this.typeValue = '',
//    this.theSearch = '',
//    this.theFavorite = '' 
    mySimpleApp.getInitialPokeData( this.typeValue, this.theSearch)
    document.getElementById("TYPE").value = "All"
    document.getElementById("FAV").value = "All"
    document.getElementById("VIEW").value = "GRID"
    mySimpleApp.showIt = "GRID"
    document.getElementById("SEARCH").value = ""
}

Vue.config.errorHandler = function(err, vm, info) {
  //console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}


var mySimpleApp = new Vue({
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
//    components: {
//        PokeHeader: pokeHeader
//    },
    methods: {
//	onClick: function (e) {
//	    var clickedElement = e.target;
//	    console.log( clickedElement );
//	},
	toggleFavorite: function( theItem ) {
	    console.log( "THE ITEM" , theItem )
	},
	async getInitialPokeData( theType, theSearch, theFavorite) {
	    console.log( "----" + theType)
	    console.log( "----" + theSearch)
	    if ( theType == 'All' ) {
		theType = undefined
	    }

//	    if ( theType == undefined ) {
//		theType = ""
//	    }
//	    if ( theSearch == undefined ) {
//		theSearch = ""
//	    }
//	    if ( theFavorite == undefined ) {
//		theSearch = ""
//	    }
	    var getSize = 20
	    var count = 0;
	    try {
		this.results = [];
		console.log( "----first" , getSize,  count, "-", theSearch, "-",theType, "-", theFavorite, "-")
		resp = await axios.get(baseUrl, {responseType: 'json', params: {limit:getSize,  offset: count, search: theSearch, type: theType, isFavorite: theFavorite }})
		//this.results.push( ...resp.data.items );
		this.results = resp.data.items;

		count = getSize
		console.log( "number = " + resp.data.count )
		for ( i = 1; i < (resp.data.count / getSize); i++) {
		console.log( "----subsequent" , getSize,  count, theSearch, theType, theFavorite)
		    //console.log( "count = " + count )
		    resp = await axios.get(baseUrl, {responseType: 'json', params: {limit: getSize,  offset: count, search: theSearch, type: theType, isFavorite: theFavorite }})
		    this.results.push( ...resp.data.items );
		    count = count + getSize
		}
		console.log( "2------", this.results );

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


mySimpleApp.getInitialPokeData( "", "" );
mySimpleApp.getPokeTypes();






//      methods: {
//	async getInitialPokeData() {
//            axios.get(baseUrl, {responseType: 'json'}).then(response => {
//		//this.results = JSON.parse( "{" + response.data + " }");
//		theData = JSON.stringify(response.data);
//		this.results = theData;
//		console.log( "%o", this.results )
//	    })
//	    .catch( error=> {
//		alert( "Problem getting data from server. Server " + baseUrl );
//		return ;
//    	    });



	    //            axios.get(jenkinsStatusDataUrl).then(response => {
//		fileContents = response.data;
//		//console.log( "GOT HERE");
//		this.job_driver = fileContents.split( "\n" );
//        })
