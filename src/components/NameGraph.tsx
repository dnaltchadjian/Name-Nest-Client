import { HStack, Show, Text } from "@chakra-ui/react";
import { BarChart } from "@mui/x-charts";
import { NameUtil } from "../util/NameUtil";


interface Props {
    nameObject: FirstName;
}

function NameGraph({ nameObject }: Props) {
    
    var dataset = [];
    var index = 0;
    var maxValue = 0;
    var minValue = 1;
    var drawGraph = false;
    var soloCountry, soloScore, soloPower;
    
    /**
     * Collect the information required for a graph, tracking the max and min values of the population distribution.
     * If there is only 1 entry in the country map, a graph will not be drawn.
     */
    for (const [country, score] of Object.entries(nameObject.countryMap)) {
        const powScore =  Math.pow(2, score);
        dataset[index] = {country: NameUtil.getCountryLabel(country), countryAbbr: NameUtil.getCountryAbbr(country), score: powScore};
        if (powScore < minValue) {
            minValue = powScore;
        }
        if (powScore > maxValue) {
            maxValue = powScore;
        }
        soloCountry = NameUtil.getCountryLabel(country);
        soloScore = powScore;
        soloPower = score;
        if (index > 0) {
            drawGraph = true;
        }
        index++;
        
    }

    if (!drawGraph) {
        return (
            <>
                <HStack width="fit-content">
                    <Text fontSize="sm"> This name is typically found in {soloCountry}, with a distribution of about {soloScore}% of the population.</Text>
                </HStack>
            </>
        );
    }

    var width = 800;
    if (dataset.length * 30 > width) {
        width = dataset.length * 30;
    }

    var graphColor: [string, string];
    if (nameObject.gender.match("M")) {
        graphColor = ['#89BAAB', '#666a86'];
    } else if (nameObject.gender.match("F")) {
        graphColor = ['#BA8A9D', '#74477F'];
    } else {
        graphColor = ['#DDAB6A', '#ff7f11'];
    }

    const valueFormatter = (value: number | null) => `${value}%`;

    return (
        <>
            <Show above="sm">
                <HStack>
                    <BarChart dataset={dataset}
                        xAxis={[{
                            scaleType: "band", dataKey: "country",
                            tickLabelStyle: {
                                angle: -45,
                                textAnchor: 'end',
                                fontSize: 14,
                            },
                        }]}
                        yAxis={[{
                            colorMap: {
                                type: 'continuous',
                                color: graphColor,
                                min: minValue,
                                max: maxValue
                            },
                            
                        }]}
                        sx={{
                            fontFamily: 'Nunito',
                            "& .MuiChartsLegend-series text": { fontSize: "1.4em !important" },
                            "& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.3em" }
                        }}
                        margin={{
                            left: 100,
                            right: 0,
                            bottom: 180
                        }}
                        
                        series={[{dataKey: "score", label: "Name frequency (% of the population)", color: graphColor[0], valueFormatter}]}
                        width={width}
                        height={400}
                    />
                </HStack>
            </Show>
            <Show below="sm">
                <HStack>
                <BarChart dataset={dataset}
                    xAxis={[{
                        scaleType: "band", dataKey: "countryAbbr",
                        tickLabelStyle: {
                            angle: -45,
                            textAnchor: 'end',
                            fontSize: 12,
                        },
                    }]}
                    yAxis={[{
                        colorMap: {
                            type: 'continuous',
                            color: graphColor,
                            min: minValue,
                            max: maxValue
                        },
                    }]}
                    sx={{
                        fontFamily: 'Nunito',
                        "& .MuiChartsLegend-series text": { fontSize: "1.4em !important", padding: 0 },
                        "& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.3em" }
                    }}
                    margin={{
                        left: 40,
                        right: 0,
                        bottom: 50,
                        top: 50
                    }}
                    
                    series={[{dataKey: "score", label: "Frequency (%)", color: graphColor[0], valueFormatter}]}
                    width={300}
                    height={300}
                />
                </HStack>
            </Show>
        </>
    );
}

export default NameGraph;