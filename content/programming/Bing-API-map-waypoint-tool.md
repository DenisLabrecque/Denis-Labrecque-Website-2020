---
title: "Waypoint Tool"
subtitle: "Draw a path and export the waypoint coordinates to a JSON file."
headline: "Path tool using the Bing Maps API to get coordinates and create a set of waypoints."
image: "Waypoint_Map_Bing.jpg"
date: 2021-03-31T00:00:00-00:00
ctaLink: "/programming/waypointMapTool.html"
ctaTitle: "Full-page View"
draft: false
---
This tool was created with the purpose of programming a vehicle to follow waypoints using an Arduino microcontroller paired to a GPS module.

<iframe src="/programming/waypointMapTool.html" style="width:100%; height: 500px; border: none;"></iframe>

## Creating and Loading Waypoints
* **To create a waypoint path:** click on the map.
* **To remove a waypoint:** click on the waypoint and click *remove*.
* **To move a waypoint:** click and drag it.
* **To save or erase coordinates:** right-click the map; the location name is the point of interest nearest to the first waypoint, and that is the file's default name.
* **To load coordinates from a file:** right-click the map to load a JSON file and view the path on the map. The file must be an array of latitudes and longitudes as explained below.
* **To add a vehicle:** right-click the map and click *place*. A small bot will happily move around the waypoints with a simple algorithm at a fixed speed.

{{< image "Waypoint_Tool_vehicle.gif" "Vehicle following waypoints on map" >}}

To make editing easier, use the <a href="/programming/waypointMapTool.html">full-page view</a>.

### Output JSON
This map uses the <a href="https://www.bing.com/api/maps/sdkrelease/mapcontrol/isdk">Bing Maps API</a> to add events that allow the user to create waypoints. The output file is a JSON array in the following format:

{{<highlight javascript>}}
[{
    "latitude": 45.66026005547925,
    "longitude": -73.84635072708129,
    "altitude": 0,
    "altitudeReference": -1
},
{
    ...
}]
{{</highlight>}}

Each node in the array represents a waypoint, ordered from the first waypoint to the last. At the moment, only the `latitude` and `longitude` properties are used, the rest being complimentary information received from <a href="https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/pushpin-class">`Pushpin.getLocation()`</a>.

### How to Calculate Angle Between Two Geographic Coordinates
Is it really possible to calculate the angle between only two points? In fact, there is a third point: North. Technically, this is known as finding the bearing from one coordinate to the next.

Code below is from an answer from Stack Overflow: [Calculate angle between two Latitude/Longitude points]("https://stackoverflow.com/a/18738281/4682228").

{{<highlight javascript>}}
// Find the bearing between two coordinates.
function angleFromCoordinate(point1, point2) {
    point1 = locationToRadians(point1)
    point2 = locationToRadians(point2)

    let longitudeDifference = point2.longitude - point1.longitude
    let y = Math.sin(longitudeDifference) * Math.cos(point2.latitude)
    let x = Math.cos(point1.latitude) * Math.sin(point2.latitude) - Math.sin(point1.latitude) * Math.cos(point2.latitude) * Math.cos(longitudeDifference)
    
    let bearing = Math.atan2(y, x)
    bearing = radiansToDegrees(bearing)
    bearing = (bearing + 360) % 360

    return bearing
}
{{</highlight>}}

{{<highlight javascript>}}
// Find how many degrees right or left one heading is to the next.
// Left degrees are negative and right degrees are positive.
// Always returns the shortest angle.
function calculateError(heading1, heading2) {
    let left = heading1 - heading2
    let right = heading2 - heading1

    if(left < 0)
        left += 360
    if(right < 0)
        right += 360
    
    return left < right ? -left : right
}
{{</highlight>}}