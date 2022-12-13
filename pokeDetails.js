

Vue.component('poke-details', {
    data: function () {
	return {
	    saveItem: {}
	}
    },
    props: [ 'details', 'results' ],
    methods: {
	groupTypes: function( typeList ) {
	    if ( typeList == undefined ) {
		return ""
	    }
	    var types = ""
	    for (var i = 0; i < typeList.length; i++) {
		types = types + typeList[i]  + ", ";
	    }
	    return types.slice(0, -2)
	},
	showFav: function( theItem ) {
	    if ( theItem == undefined ) {
		return ""
	    }
	    var style = "font-size:175%;color:red; opacity: 20%";
	    if ( theItem.isFavorite == true ) {
		style = "font-size:175%;color:red"; 
	    }
            return style;
	},
	toggleFavorite: function ( event ) {
	    try {
		index = Number(event.srcElement.id) - 1;
		toggleFavorite( this.details );
		this.details.isFavorite = !this.details.isFavorite;
	    }
	    catch( error ) {
		console.log( error )
	    }
	}
    },

    template: ` <div>
 		  <button class="w3-button w3-round-large w3-red" onclick="pokeApp.$data.showIt = pokeApp.$data.savedView">Back</button>
		  <h1><b>{{details.name}}</b></h1>
		  <div class="w3-row">
		    <div class="w3-col m5">
		      <img :src="details.image">
		    </div>
		    <div class="w3-col m4">
                      <div class="w3-card" style="width:75%">
			<header class="w3-container w3-blue">
			  <h2>Stats</h2>
			</header>
			<div class="w3-container">
			  <span> CP = {{details.maxCP}}</span><br>
			  <span> HP = {{details.maxHP}} </span><br>
			  <span> Height = {{details.height.minimum}} - {{details.height.maximum}} </span><br>
			  <span> Weight = {{details.weight.minimum}} - {{details.weight.maximum}} </span><br>
			  <span> Types  = {{ groupTypes( details.types) }}</span>
			</div>
                      </div>
		    </div>
		  </div>

                  <span class="w3-circle pointer" :id="details.number" :style="showFav(details)" v-on:click="toggleFavorite" >&hearts;</span>
                  <audio id="pokeSound" :src="details.sound" preload="auto"></audio>
                  <button onclick="document.getElementById('pokeSound').play();">Play sound</button>

                  <h3>Evolutions</h3>
                  <div class="w3-row">
                    <template v-for="tEvo in details.previousEvolutions" >
		      <div class="w3-col m2">
			<div class="w3-card" >
                          <img :src="tEvo.image" height="100px" width="100px">
                          <h4><b>{{tEvo.name}}</b></h4>
                          <span class="w3-circle" :style="showFav(tEvo)" >&hearts;</span>
			</div>
		      </div>
                    </template>     
                  </div>
		  
                </div>`
});


