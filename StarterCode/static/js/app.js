// Step 1
// 1. Use D3 library to read in samples.json
function getSamples(id) {
    d3.json("samples.json").then(sampleData =>{
        console.log(sampleData)

        var ids = sampleData.samples[0].otu_ids;
        console.log(ids)

        var sampleValues = sampleData.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)

        var labels = sampleData.samples[0].otu_labels.slice(0, 10);
        console.log(labels)

// 2. Create horizontal bar chart with a dropdown menu to dispaly the top 10 OTUs found in that individual
    // sample_calues => vales for bar chart
    // out_ids => labels for bar chart
    // out_labels => hovertext for chart

        var top_otu = (sampleData.samples[0].otu_ids.slice(0,10)).reverse();

        var otu_id = top_otu.map(d => "OTU" + d);
        console.log(`OTU IDs: ${otu_id}`)

        var labels = sampleData.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU labels: ${labels}`)

        var trace = {
            x: sampleValues,
            y: otu_id,
            text: labels,
            marker: {
                color: 'blue'},
            type: "bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU's",
            yaxis: {
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30,
            }
        };
        
    Plotly.newPlot("bar", data, layout);


// 3. Create a bubble chart that displays each sample.
    // otu_ids => x values
    // sample_values => y values
    // sample_values => marker size
    // otu_ids => marker colors
    // otu_labels => text values

        var trace1 = {
            x: sampleData.samples[0].otu_ids,
            y: sampleData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids
            },
            text: sampleData.samples[0].otu_lables
        };

        var layout_2 = {
            xaxis: {title: "OUT ID"},
            height: 600,
            width: 1000
        };

        var data1 = [trace1];


    Plotly.newPlot("bubble", data1, layout_2);



    });
}

// 4. Display the sample metadata; individual's demographic information
function demographicInformation(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(result).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key [1] + "\n"); 
        });
    })
}

function eventChange(id) {
    getSamples(id);
    demographicInformation(id);
}

// 5. Display each key-value pair fro the metadata Json object somewhere on the page.

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getSamples(data.names[0]);
        demographicInformation(data.names[0]);
    });
}

init();






// 6. Update all of the plots anytime that a new sample is selected
// Advanced Challenge Assignment
    //  Adapt the gauge chart to the plot the weekly washing frequency of the indicidual
    // modify the example gauge code 
    // Update the chart whenever a new sample is selected





