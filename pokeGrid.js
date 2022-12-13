
Vue.component('poke-grid-list', {
    data: function () {
	return {
	    pagePosition: 0,
	    maxPageCount: 99,
	    
	}
    },
    props: [ 'results', 'pageresults', 'count' ],
    methods: {
	groupTypes: function( typeList ) {
	    var types = ""
	    for (var i = 0, j = typeList.length; i < j; i++) {
		types = types + typeList[i]  + ", ";
	    }
	    return types.slice(0, -2)
	},
	showFav: function( theItem ) {
	    var style = "font-size:175%;color:red; opacity: 20%";
	    if ( theItem.isFavorite == true ) {
		style = "font-size:175%;color:red"; 
	    }
	    return style;
	},
	toggleFavorite: function ( event ) {
	    try {
		var index = Number( event.srcElement.id );
		index = index + (this.pagePosition * 20)
		toggleFavorite( this.results[index] );
		this.results[index].isFavorite = !this.results[index].isFavorite;
	    }
	    catch( error ) {
		console.log( error )
	    }
	},
	showDetails: function( event ) {
	    try {
		var index = Number( event.srcElement.id );
		index = index + (this.pagePosition * 20)
		getDetails( this.results[index] );
	    }
	    catch( error ) {
		console.log( error )
	    }
	},
	numPages: function( theCount ) {
	    count = Math.trunc( theCount / 20 )
	    if ( theCount % 20 > 0 ) count++
	    this.maxPageCount = count;
	    return count;
	},
	selectPage: function( pageNum ) {
	    //this.pagePosition = pokeApp.$data.pageResults;
	    //this.$forceUpdate
	    if ( pageNum == -1000 ) {
		this.pagePosition = this.pagePosition - 1;
	    } else if ( pageNum == 1000 ) {
		this.pagePosition = this.pagePosition + 1;
	    } else { 
		this.pagePosition = pageNum;
	    }

	    if ( this.pagePosition < 0 ) {
		this.pagePosition = 0
	    }
	    if ( this.pagePosition > this.maxPageCount - 1 ) {
		this.pagePosition = this.maxPageCount - 1
	    }

	    firstPage = this.pagePosition * 20;
	    lastPage  = firstPage + 20
	    pokeApp.$data.pageResults = pokeApp.$data.results.slice( firstPage, lastPage);
	    pokeApp.$data.pagePosition = this.pagePosition;
	    this.$forceUpdate
	    return; 
	},
	highlightPage: function( thePage ) {
	    var style = "";
	    if ( thePage == this.pagePosition ) {
		style = "background: green"; 
	    }
	    return style;
	},
	gridOrList: function( ) {
	    var style = "";
	    if ( pokeApp.$data.showIt == 'GRID' ) {
		style = "display: block; width: 25%; float: left;"; 
	    }
	    if ( pokeApp.$data.showIt == 'LIST' ) {
		style = ""; 
	    }
	    return style;
	},

	
    },

    template: `<div>
		 <div style="text-align: center;" class="w3-bar">
		   <a href="#" v-on:click="selectPage( -1000 )" class="w3-button">&laquo;</a>
                   <template v-for="(theItem, index) in numPages(this.count)" >
		     <a href="#" v-on:click="selectPage( index )" :style="highlightPage( index )" class="w3-button">{{index}} </a>
		   </template>
		   <a href="#" v-on:click="selectPage( 1000 )" class="w3-button">&raquo;</a>
		 </div>
                 <ol>
                   <template v-for="(theItem, index) in this.pageresults" >
		     <li  :style="gridOrList()" >
                       <div class="w3-card">  
                        <div class="w3-container">
                         <img :src="theItem.image" height="100px" width="100px" class="w3-circle pointer" :id="index" v-on:click="showDetails"></img>
                         {{theItem.name}}
                         <div class="w3-container">
                           <p >{{ groupTypes( theItem.types) }}</p>
                           <span class="w3-circle pointer" :id="index" :style="showFav(theItem)" v-on:click="toggleFavorite" >&hearts;</span>
                         </div>
                         </div>
                       </div>
                     </li>
                   </template>
                 </ol>
		 
               </div>`
});


