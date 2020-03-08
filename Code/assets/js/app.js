// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Set initial parameters
//Set a variable to store the chart data
var Data = null;
//Set the default x-axis label
var chosenXAxis = "Poverty";
//Set the default y-axis label
var chosenYAxis = "Obesity";
var xAxisLabels = ["poverty", "age", "income"];
var yAxisLabels = ["obesity", "smokes", "healthcare"];
var labelsTitle = { "pverty": "In Poverty (%)",
                    "age": "Age (Median)",
                    "income": "Household Income (Median)",
                    "obesity": "Obese (%)",
                    "smokes": "Smokes (%)",
                    "healthcare": "Lacks Healthcare (%)"};
var axisPadding = 20;

// function used for updating xy-scale var upon click on axis label
function xScale(Data, chosenAxis, xy) {
    var axisRange = (xy === "x") ? [0, width]:[height, 0]

    // create scales
    var LinearScale = d3.scaleLinear()
      .domain([d3.min(Data, d => d[chosenAxis]) * 0.8,
        d3.max(Data, d => d[chosenAxis]) * 1.2
      ])
      .range(axisRange);
  
    return LinearScale;
  
  }
  
  // function used for updating xyAxis var upon click on axis label
  function renderAxes(newScale, Axis, xy) {
    var posAxis =  (xy === "x") ? d3.axisBottom(newScale):d3.axisLeft(newScale);
  
    xAxis.transition()
      .duration(1000)
      .call(posAxis);
  
    return Axis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newScale, chosenAxis, xy) {

    circlesGroup.selectAll("circle")
      .transition()
      .duration(1000)
      .attr(`c${xy}`, d => newScale(d[chosenAxis]));

    circlesGroup.selectAll("text")
      .transition()
      .duration(1000)
      .attr(`c${xy}`, d => newScale(d[chosenAxis]));
  
    return circlesGroup;
  }

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([-8, 0])
      .html(function(d) {
        return (`${d.state}<br>${chosenXAxis}: ${d[chosenXAxis]}<br>${chosenYAxis}: ${d[chosenYAxis]}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }

// function to update the scatter plot based on selected axis
function updateChart() {
    var value = d3.select(this).attr("value");
    var xy = xAxisLabels.includes(value) ? "x":"y";
    var circlesGroup = d3.selectAll("#circlesGroup");
    var axis = (xy ==="x") ? d3.select("#xAxis"):d3.select("#yAxis");
    chosenAxis = (xy === "x") ? chosenXAxis:chosenYAxis;

    if 
}