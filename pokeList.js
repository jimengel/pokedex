
Vue.component('poke-list', {
    data: function () {
	return {
	}
    },

    props: [ 'results' ],
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
		index = event.srcElement.id;
		toggleFavorite( this.results[index] );
		this.results[index].isFavorite = !this.results[index].isFavorite;
	    }
	    catch( error ) {
		console.log( error )
	    }
	},
	showDetails: function( event ) {
	    try {
		index = event.srcElement.id;
		getDetails( this.results[index] );
	    }
	    catch( error ) {
		console.log( error )
	    }
	}
    },
    template: `<div>
                 <ol>
                   <template v-for="(theItem, index) in this.results" >
                     <li>
                       <div class="w3-card">  
                         <img :src="theItem.image" height="100px" width="100px" class="w3-circle pointer" :id="index" v-on:click="showDetails"></img>
                         {{theItem.name}}
                         <div class="w3-container">
                           <p >{{ groupTypes( theItem.types) }}</p>
                           <span class="w3-circle pointer" :id="index" :style="showFav(theItem)" v-on:click="toggleFavorite" >&hearts;</span>
                         </div>
                       </div>
                     </li>
                   </template>
                 </ol>
               </div>`


});

