Charleston Tour Guide App


Value Statement - A single source for city exploration.

Technologies
Java/Spring
Angular/Ionic
Google Map APIs

MVP Features
Choice mode
Prefab mode
Plotted Map
Geofence
Description
Sidetrack/pit stop

GUIDED TOURS

USER STORY - “Home View”

A user will be able to select a pre defined adventure or choose their own adventure  in order to select their desired experience.
Whichever option is selected that corresponding view will display

Assumption:
None

Acceptance Criteria:
If user can select an option

Wire Frames:

Size: 0

USER STORY - “Prefab View”

A user will be able to select an experience from a predefined list of experiences
A user will be able to select an item from the list to view more information about the experience in a modal.
A user will be able to select a button to start the desired experience.
A user will be able to close the modal and select another item.
The user’s selected experience will then be displayed in the “Experience View”
Will need “Experience” & “Locations” data structures

Assumptions:
Predefined data is available


Acceptance Criteria:
A user can select a prefab and view details in a modal.
A user can select a prefab and it displays in the Experience view
A user can close the modal and select another item.
Data structures exist (tables, categories, etc.)
Routes will be available to return all predefined data

Wire Frames:

Size: 8

USER STORY - “Choice View”

A user will be provided with categories from which they can build their own adventures.
Will provide a list of categories
User will select three categories (can be different or the same)
Random lists of each category are returned and one choice from each list is displayed in a slider view.
If a user does not like a choice, they can swipe left to scroll through the options.
User will confirm selections, and the Experience View displays.

Assumptions:
Categories exist
Locations exist
Experiences exist

Acceptance Criteria:
User must be able to make three choices
User must be able to make 3 different choices
User must be able to select the same category more than once.
User must be able to swipe through list of category items.
User must be able to confirm and start experience.

Size: 8

USER STORY - “Map View”

A user will be provided with a tour that’s mapped out with descriptive data
Will provide a map that contains every location and is linked together in numerical order.
Will provide name, location number, hours, website,  and address for each point on the map.
Will provide a details view button once a user has visited that location (broken geofence).

Assumptions:
Data available
Google Maps available
User’s location is available
Routes available

Acceptance Criteria:
Map displays with all points of interest
Map displays details when a pin is selected
Each pin has a name, number, and address in details.
Each pin has a details button when location has been visited.

Wire Frames:

Size: 13

USER STORY - “Details View”

A user will be able to view detailed information about each location in order to better know the location.
Will provide images, quick facts, and a detailed description for each location.
Will provide a button to return to map view.
Text to speech for description.


Assumptions:
Data available
Location available
Geofence event triggers


Acceptance Criteria:
Details display when a user crosses a geofence.
Details button displays on map pin view when a user crosses a geofence
All details information is populated.

Wire Frames:

Size: 8

USER STORY - “App Menu”

A user will be able to leave the current running experience and start a new one.
Menu will have a new experience button that will cancel the current experience and return them to the home view.
Menu will have a near me button that will display the near me view.

Assumptions:
Near me view exists
Routes exist

Acceptance Criteria:
When a user selects the new experience button, the current experience ends and user is returned to home view.
Previous experience is closed/deleted in the database.
When a user selects the near me button, the near me view displays.

Wire Frames:

Size: 5

USER STORY - “Near Me View”

A user will be able to view things that are near them based on a selected category.
Will be based on a user’s current location, and will return matches in our database within a predefined radius.
User can select which things they want to appear (categories).
User can select a point on the map and get information about the location.

Assumptions:
Google Maps Api
Geolocation
Data available
Routes available

Acceptance Criteria:
User will be able to select the near me button at any time and view the near me view.
User will be able to select any location that appears on the map near them and view details about it.


Wire Frames:

Size: 8


Stretch Goals:
Step by step directions to any point on the map.
User location plotted on map.
More control and options for user choice.
Push notifications appear when any geofence is crossed (freeform mode), select which types of things you want to be notified about.
More locations, more details, broader scope.
Authentication/User login
Able to create and share experiences
Rate locations or experiences

NOTES :

Home screen to choose a pre-fixed experience or create your own experience
If pre-fixed is chosen then user will have list of thematic experiences to choose from
If a build experience is chosen, then user will be able to choose 3 things and we will build an experience for them
Once those have been chosen, it will transition into the Experience View
Experience View will have a Map View
Map View will have a plotted course of all the locations selected
User can click on a location to get it’s address and name
The Experience View will have a Detail View
Detail View will trigger when a geofence is hit
Detail View will have an image, quick facts, and long form description we may or may not read to the user
