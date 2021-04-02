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

## Problems Solved
In part for my future self, and in part to help others who need clear instructions as I do, here are solutions to a few geometric problems that need solving to direct an autonomous vehicle on a map.

The solution to this problem is very simple if we measure the vehicle's heading angle compared to the target waypoint, as explained below. This gives an angle off to the left or off to the right that the vehicle can correct for. This simulation uses a quack approximation to rotate the vehicle, but in real life the rudder of a boat or steering of a car would use a PID controller with a setpoint of 0 degrees (no error) and an input of the actual deviation off the target in degrees.

A better algorithm would include the concept of track, meaning that a line between both the previous and the next waypoint would be established, and the vehicle's distance from that line would give the error. This would help protect from deviations caused by wind or current. A simple way to achieve this is to simply include more waypoints along the path.

### How to Project a Point from a Location by Degree
To predict where a vehicle is going, one must first project that vehicle's current heading vector on the map. Solution from <a href="https://math.stackexchange.com/q/143932/769532">Calculate point, given x, y, angle, and distance</a> on Stack Overflow.

{{<highlight javascript>}}
// Project a point from a certain location at a certain angle.
// Returns the other point needed to complete this line.
// https://math.stackexchange.com/a/143946/769532
// x = distance * cos(θ), y = distance * sin(θ)
function projectPoint(location, angle, distance) {
    distance = distance * .00001 // This factor needs adjustment
    angle = degreesToRadians(angle)

    let latitude = location.latitude + (distance * Math.cos(angle))
    let longitude = location.longitude + (distance * Math.sin(angle))

    return {"latitude": latitude, "longitude": longitude}
}
{{</highlight>}}

This function may be slightly inaccurate because it assumes the earth is flat, but it is sufficient for our needs.

### How to Calculate Angle Between Two Geographic Coordinates
To predict whether a vehicle is heading in the right direction, one would need to find the angle between the vehicle and the target location. Is it really possible to calculate the angle between only two points? In fact, there is a third point: north. Technically, this is known as finding the bearing from one coordinate to the next.

For example, suppose a vehicle's next waypoint is due north relative to the vehicle. In that case, the waypoint's bearing relative to the vehicle is 0 degrees. If the waypoint were due east, its bearing to the vehicle would be 90 degrees. If it were due west, 180 degrees, and so forth.

Code below is inspired from an answer on Stack Overflow: <a href="https://stackoverflow.com/a/18738281/4682228">Calculate angle between two Latitude/Longitude points</a>. Because coordinates in degrees must be converted to radians, a little function `locationToRadians()` converts a location `{latitude, longitude}` to radians.

{{<highlight javascript>}}
// Find the bearing between two coordinates.
function bearingBetweenCoordinates(location1, location2) {
    location1 = locationToRadians(location1)
    location2 = locationToRadians(location2)

    let longitudeDifference = location2.longitude - location1.longitude
    let y = Math.sin(longitudeDifference) * Math.cos(location2.latitude)
    let x = Math.cos(location1.latitude) * Math.sin(location2.latitude)
            - Math.sin(location1.latitude) * Math.cos(location2.latitude)
            * Math.cos(longitudeDifference)
    
    let bearing = Math.atan2(y, x)
    bearing = radiansToDegrees(bearing)
    bearing = (bearing + 360) % 360

    return bearing
}

// Convert a location in degrees to a location in radians.
function locationToRadians(location) {
    return {latitude: degreesToRadians(location.latitude),
            longitude: degreesToRadians(location.longitude)}
}

// Convert degrees to radians.
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180)
}
{{</highlight>}}

### How to Calculate Angle Between Direction and Destination Point
When traveling with a vehicle to a waypoint, one would like to know whether the vehicle's direction is correct. A simple way to do this is to draw a line ahead of the vehicle: this is the vehicle's heading. Heading is calculated in degrees away from north, where 90.0 is east, 180.0 is south, etc. The location the vehicle wants to reach also has an angle: the bearing from the vehicle to that point.

To find how far away the vehicle is pointing, simply subtract heading from bearing. That is, if the vehicle is heading 30 degrees north, and the target location's bearing is 30 degrees, then `30.0 - 30.0 == 0`, meaning that the vehicle is heading straight towards the target.

If the vehicle were heading 25 degrees north, but the target's bearing is still 30 degrees, then `heading - bearing == 25.0 - 30.0 == -5.0`. The vehicle is pointing -5 degrees to the target's left. If the result were +5 degrees, the vehicle would be pointing to the target's right.

The code to find this heading error is shown below, as inspired from a <a href="https://stackoverflow.com/a/54820295/4682228">snippet on Stack Overflow</a>:

{{<highlight javascript>}}
// Find how many degrees right or left one heading is to the next.
// Left degrees are negative and right degrees are positive.
// Always returns the shortest angle.
function headingError(bearing, heading) {
    // Get both angles; these add to 360 degrees
    let leftAngle = bearing - heading
    let rightAngle = heading - bearing

    // Non-negative
    if(leftAngle < 0)
        leftAngle += 360
    if(rightAngle < 0)
        rightAngle += 360
    
    // Return the smallest and negative for left
    return leftAngle < rightAngle ? -leftAngle : rightAngle
}
{{</highlight>}}

### Calculating Distance between Two Locations on Earth
To know whether a vehicle has arrived to its waypoint requires measuring distance. One may also want to know the path's total length.

Accurately finding two distances on earth requires including the earth's sphericity. To test this function's accuracy, try inputting two cities with a known distance between them.

Of course, for our purposes, one could assume the earth is flat, but this is more fun. Code shamelessly taken from <a href="https://stackoverflow.com/a/365853/4682228">Calculate distance between 2 GPS coordinates</a> on Stack Overflow:

{{<highlight javascript>}}
// Find distance between two locations in meters.
function distanceInMetersOnEarth(location1, location2) {
    let earthRadiusM = 6371000;

    let dLat = degreesToRadians(location2.latitude - location1.latitude);
    let dLon = degreesToRadians(location2.longitude - location1.longitude);

    let lat1 = degreesToRadians(location1.latitude);
    let lat2 = degreesToRadians(location2.latitude);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2)
          * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusM * c;
}
{{</highlight>}}