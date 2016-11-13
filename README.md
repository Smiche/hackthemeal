# hackthemeal hackathon project
## Team rand0m
_Aleksandar, Andrei, Maksim_
### Data analytics challenge
_Our solution is focused on improving the efficiency of food restaurants._

### Inefficiencies(problems):
- Recipe decisions
- Time spent in line

### Proposed solutions:
- Tracking of food tray state
- Recipe suggestion based on prediction
- Data gathering and visualization

### Algorithms and technologies
- Predictive analytics, based on linear regression model
- Front-end AngularJS
- Back-end Play Framework(in Scala flavour)

![](https://upload.wikimedia.org/wikipedia/commons/3/3a/Linear_regression.svg?raw=true)
![](http://www.pixhost.org/show/995/35191808_uqfcgir4wd8.jpg?raw=true)
### Impact
- Less food wasted
- Better customer turnout
- Improved efficiency of indoor logistics

# Documentation
- nodejs required
- jdk, scala (a bit of luck)
- bower
- gulp

Run for development
```sh
npm install
sbt run
gulp serve
```

Build for production
```sh
gulp build
sbt packageBin
```

Main structure:
backend - server with routes and logic(backend folder)
frontend - visualization and less logic(infoview folder, backend/public/trayupdate)

The MIT License (MIT)
=====================

Copyright © `2016` `Andrei, Aleksandar, Maksim`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
