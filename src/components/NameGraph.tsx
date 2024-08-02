import { HStack, Text } from "@chakra-ui/react";
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
        dataset[index] = {country: country, score: powScore};
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
                <Text> This name is typically found in {soloCountry}, with a distribution of about {soloScore}% of the population.</Text>
            </HStack>
            </>
        );
    }

    var height = 200;
    if (dataset.length * 30 > height) {
        height = dataset.length * 30;
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
        <HStack>
        <BarChart dataset={dataset}
            yAxis={[{
                scaleType: "band", dataKey: "country",
            }]}
            xAxis={[{
                colorMap: {
                    type: 'continuous',
                    color: graphColor,
                    min: minValue,
                    max: maxValue
                }
            }]}
            sx={{
                fontFamily: 'Nunito',
            }}
            series={[{dataKey: "score", label: "Name frequency (% of the population)", color: graphColor[0], valueFormatter}]}
            layout="horizontal"
            width={500}
            height={height}
        />
        </HStack>
        </>
    );
}

export default NameGraph;