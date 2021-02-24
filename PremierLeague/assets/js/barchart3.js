// set the dimensions and margins of the graph
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20
    },
    width = 960 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.3);

var x = d3.scaleLinear()
    .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// format the data
// data.forEach(function(d) {
//     d.sales = +d.sales;
// });
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden");

d3.csv("assets/data/bar3.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.Goals = +d.Goals;
    });

    data.sort(function(a, b) {
        return a.Goals - b.Goals;
    });


    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d) {
        return d.Goals;
    })])
    y.domain(data.map(function(d) {
        return d.Players;
    }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {
            return x(d.Goals);
        })
        .attr("y", function(d) {
            return y(d.Players);
        })
        .attr("height", y.bandwidth())
        // .on("mouseover", function(d) {
        //     return tooltip.text(d.Players + " has been a Top-8 team for " + d.Goals + " seasons!").style("visibility", "visible");
        // })
        .on("mouseover", function(d, i) {
            d3.select("#player").attr("src", d.Image)
                .attr("width", 600);
            d3.select("#info").text("Top " + (14 - i) + " scorer: " + d.Players + '\n' +
                                "Goals: " + d.Goals)
                                .attr("position","absolute");
            d3.select(this).style("fill", "#e90052");
        })
        // .on("mousemove", function() {
        //     return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        // })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "#360D3A");
        });

    // svg.selectAll(".rect").data(data)
    //     .enter().append("image")
    //     // .attr('xlink:href', "https://cdn.dribbble.com/users/4140/screenshots/2901037/epl-icon_2x.jpg")
    //     .attr('xlink:href', function(d) {
    //         return d.Image
    //     })
    //     .attr("x", function(d) {
    //         return x(d.Goals) - 20;
    //     })
    //     .attr("y", function(d) {
    //         return y(d.Players);
    //     })
    //     .attr("width", y.bandwidth())
    //     .attr("height", y.bandwidth());

    svg.selectAll(".rect").data(data)
        .enter().append("text")
        .attr("x", function(d) {
            return 20;
        })
        .attr("y", function(d) {
            return y(d.Players) + y.bandwidth() / 2;
        })
        .style("fill", "#00ff85")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("position", "absolute")
        .attr("dy", ".35em")
        .text(function(d) { return d.Players; });

    svg.selectAll(".rect").data(data)
        .enter().append("text")
        .attr("x", function(d) {
            return x(d.Goals) - 35;
        })
        .attr("y", function(d) {
            return y(d.Players) + y.bandwidth() / 2;
        })
        .style("fill", "#00ff85")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("position", "absolute")
        .attr("dy", ".35em")
        .text(function(d) { return d.Goals; });

    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));
    //
    // // add the y Axis
    // svg.append("g")
    //     .call(d3.axisLeft(y));

    function handleMouseOver(d, i) {
        d3.select(this).attr({
            x: x(d.Goals) - 120,
            y: y(d.Players) - 100,
            width: 200,
            height: 200
        });
    }

    function handleMouseOut(d, i) {
        d3.select(this).attr({
            x: x(d.Goals) - 20,
            y: y(d.Players),
            width: y.bandwidth(),
            height: y.bandwidth()
        });
    }
});
