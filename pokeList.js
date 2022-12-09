
Vue.component('poke-list', {
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
                     <li>
                       <div class="w3-card">  
                         <img :src="theItem.image" height="100px" width="100px" class="w3-circle" :id="index" v-on:click="showDetails"></img>
                         {{theItem.name}}
                         <div class="w3-container">
                           <p >{{ groupTypes( theItem.types) }}</p>
                           <span class="w3-circle" :id="index" :style="showFav(theItem)" v-on:click="toggleFavorite" >&hearts;</span>
                         </div>
                       </div>
                     </li>
                   </template>
                 </ol>
               </div>`


});





//    template: ` <div>
//                 <ol>
//                   <li v-for="theItem in this.results" >
//                    <div class="w3-card" style="width:75%;">  
//                     <div class="w3-row">
//                         <div class="w3-col m2">
//                           <img :src="theItem.image" height="100px" width="100px" ></img>
//                         </div>
//                         <div class="w3-col m3">
//                           {{theItem.name}}
//                           <p >{{ groupTypes( theItem.types) }}</p>
//           	   	   <button class="w3-button"  onclick="toggleFavorite( 'theItem' )">
//                             <span :style="showFav(theItem)" >&hearts;</span>
//                           </button>
//                         </div>
//                     </div>
//                    </div>
//                   </li>
//                 </ol>
//                </div>`


Vue.component('poke-hello', {
    template: ` <div> HELLo
                </div>`
});

