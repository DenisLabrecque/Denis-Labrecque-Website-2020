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
* **To create a path:** click on the map.
* **To save coordinates or erase the shape:** right-click the map; the location name varies based on where you click.
* **To load coordinates from a file:** righ-click the map to load a JSON file and view the path (still in development, doesn't work yet).

To make editing easier, use the <a href="/programming/waypointMapTool.html">full-page view</a>.

### Output JSON
This map uses the Bing Maps API to add events that allow the user to create waypoints. The output file is a JSON array in the following format:

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

Each node in the array represents a waypoint, ordered from the first waypoint placed to the last.