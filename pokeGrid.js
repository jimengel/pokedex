
Vue.component('poke-grid', {
    data: function () {
	return {
	}
    },
    props: [ 'results', 'type_value', 'the_search' ],
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
		console.log( "THE ITEM1 ---" , event );
		//index = event.path[0].id;
		index = event.srcElement.id;
		console.log( "THE Index1 ---" , index );
		console.log( "POKEMON1 = %o", this.results[index]);
		console.log( "POKEMON1 =", this.results[index].name);
		console.log( "POKEMON1 =", this.results[index].isFavorite);
		toggleFavorite( this.results[index] );
		this.results[index].isFavorite = !this.results[index].isFavorite;
	    }
	    catch( error ) {
		console.log( error )
	    }
	},
	showDetails: function( event ) {
	    try {
		console.log( "THE ITEM2 -----" , event );
		//index = event.path[0].id;
		index = event.srcElement.id;
		console.log( "THE Index2 ---" , index );
		console.log( "POKEMON2 = %o", this.results[index]);
		console.log( "POKEMON2 =", this.results[index].name);
		console.log( "POKEMON2 =", this.results[index].isFavorite);
		
//		this.results[index].isFavorite = !this.results[index].isFavorite;
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
                     <li v-bind:class="{ gridLi: true }"  >
                       <div class="w3-card">  
                        <div class="w3-container">
                         <img :src="theItem.image" height="100px" width="100px" class="w3-circle" :id="index" v-on:click="showDetails"></img>
                         {{theItem.name}}
                         <div class="w3-container">
                           <p >{{ groupTypes( theItem.types) }}</p>
                           <span class="w3-circle" :id="index" :style="showFav(theItem)" v-on:click="toggleFavorite" >&hearts;</span>
                         </div>
                         </div>
                       </div>
                     </li>
                   </template>
                 </ol>
               </div>`
});


