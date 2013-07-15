/**
* Event
* @class
*/
function Event( eventConfig ){

	this.id;
	this.title;
	this.location;
	
	this.start;
	this.end;
	this.duration;
	
	this.rendered = false;
	
	this.ui = {};
				
	/**
	* Initialize the event
	*/
	this.init = function( eventConfig )
	{
		if( typeof eventConfig == 'object' )
		{
			this.id = eventConfig.id;
			this.title = eventConfig.title;
			this.location = eventConfig.location;
			
			this.start = eventConfig.start;
			this.end = eventConfig.end;
			this.duration = this.end - this.start;
			
			// Build the DOM elements
			this.buildUI();
		}
	}
		
	/**
	* Builds the Event's DOM elements that make up its ui
	*/
	this.buildUI = function()
	{
		// Container
		this.ui.container = document.createElement("div");
		this.ui.container.className = "event";
		this.ui.container.id = this.id;
		
		// Content area
		this.ui.content = document.createElement("div");
		this.ui.content.className = "content";
		
		// Title
		this.ui.title = document.createElement("div");
		this.ui.title.className = "title";
		this.ui.title.innerHTML = ( this.title ) ? this.title : "Event " + this.id;
		
		// Location
		this.ui.location = document.createElement("div");
		this.ui.location.className = "location";
		this.ui.location.innerHTML = ( this.location ) ? this.location : "Location " + this.id;
		
		// Build the DOM
		this.ui.container.appendChild( this.ui.content );
		this.ui.content.appendChild( this.ui.title );
		this.ui.content.appendChild( this.ui.location );		
	}
	
	// Self-initialize
	this.init( eventConfig );
}
