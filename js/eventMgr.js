/**
* Event manager
* @class
*/
function EventManager(){
	
	var _events = new Array();
	var _eventElement = document.getElementById("events");
	
	var _offsetTop = 30; // Calendar offset from top
	var _offsetLeft = 86; // Calendar offset from left
	var _maxWidth = 600; // Max width of an event
		
	/**
	* Creates a new event from an event object
	* @param {Object} eventConfig Config object with the events id, start time and end time
	*/
	this.createEvent = function( eventConfig )
	{
		var event = new Event( eventConfig );
		
		_events.push(event);
	}
	
	/**
	* Loads all the events into the manager
	* @param {Array} eventArray An arry of eventConfig objects
	*/
	this.loadEvents = function( eventArray )
	{	
		// Clear any existing events
		this.clearEvents();
		
		// Create events from each config object passed
		for(var i in eventArray)
		{
			this.createEvent( eventArray[i] );
		}
		
		this.sortEvents();
	}
	
	/**
	* Clears any loaded events
	*/
	this.clearEvents = function()
	{	
		_events = new Array();
		_eventElement.innerHTML = "";
	}
	
	/**
	* Sorts the events by their start time
	*/
	this.sortEvents = function()
	{
		_events.sort(
			function compare(a,b) {
				if (a.start < b.start)
					return -1;
				if (a.start > b.start)
					return 1;
				return 0;
			}
		)
	}
	
	/**
	* Renders the events on the calendar
	*/
	this.renderEvents = function()
	{	
		var eventLength = _events.length;
		var eventElements = document.createDocumentFragment();
		
		// For each event
		for( var i = 0; i < eventLength; i++ )
		{
			var event = _events[i];
			
			// If we havent already rendered this event
			if(!event.rendered)
			{			
				// Find all events in this range
				var eventsInRange = this.findEventsByRange( event );
				
				// Find the available width
				var availWidth = this.calculateMaxWidth( event );
								
				// Event cursor
				var eventCursor = 0;
				
				var inRangeLength = eventsInRange.length;
				
				for(var j = 0; j < inRangeLength; j++)
				{
					var curEvent = _events[eventsInRange[j]];
							
					// If this event isnt already rendered
					if( !curEvent.rendered )
					{
						curEvent.height = curEvent.duration;
						curEvent.width = (availWidth != 0) ? ( _maxWidth - availWidth ) : ( _maxWidth / eventsInRange.length );
						curEvent.top = (curEvent.start + _offsetTop);
						curEvent.left = _offsetLeft + ( eventCursor * curEvent.width );																					
						
						// If the duration is less than 30, collapse text to single line
						if( event.duration < 30 )
						{
							// Make the event a single line event
							event.ui.container.className = "event single";
						}
						
						// Render the event
						curEvent.ui.container.style['height'] = curEvent.height + "px";
						curEvent.ui.container.style['width'] = curEvent.width + "px";
						curEvent.ui.container.style['top'] = curEvent.top + "px";
						curEvent.ui.container.style['left'] = curEvent.left + "px";
						
						// Mark it as rendered
						curEvent.rendered = true;
						
						// Append to a docFragment to build the calendar
						eventElements.appendChild(curEvent.ui.container);
						
						eventCursor++
					
					}				
				}			
			}

		}
		
		// Append the docFragment with the events
		_eventElement.appendChild(eventElements);

	}

	/**
	* Returns an array of indexes of any events in a specified range
	* @param {Object} curEvent The Event object to find adjacent events for
	*/
	this.findEventsByRange = function( curEvent )
	{
		var start = curEvent.start;
		var end = curEvent.end;
		
		var eventsInRange = new Array();
		
		eventsLength = _events.length
		
		// Check for other events in that time range
		for(var i = 0; i < eventsLength; i++)
		{
			var event = _events[i];
			
			// If another event starts or ends in the range of our event
			if( event.start >= start && event.start <= end ||
				event.end >= start && event.end <= end)
			{				
				if(!event.rendered)
				{
					eventsInRange.push( i ) ;
				}
			}
		}
		
		return eventsInRange;
	}
	
	/**
	* Calculates the maximum width of an event based on rendered events
	* @param {Object} curEvent The Event object to find maximum adjacent width for
	*/	
	this.calculateMaxWidth = function( curEvent )
	{
		var width = 0;
		
		var start = curEvent.start;
		var end = curEvent.end;
		
		var eventsInRange = new Array();

		// Check for other events in that time range
		for(var i in _events)
		{
			var event = _events[i];
			
			// If another event starts in the range of our event
			if( 
				event.start >= start && event.start <= end || // If something starts  
				event.end >= start && event.end <= end || // If something ends
				start >= event.start && start <= event.end // If something between
			)
			{				
				if( event.rendered )
				{
					width += event.width;
				}
				
			}
		}
		
		return width;
	}
	
}