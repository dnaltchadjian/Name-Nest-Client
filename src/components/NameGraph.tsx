import { HStack } from "@chakra-ui/react";
import { BarChart } from "@mui/x-charts";


interface Props {
    nameObject: FirstName;
}

function NameGraph({ nameObject }: Props) {
    
    var dataset = [{}];
    var index = 0;
    var maxValue = 0;
    var minValue = 1;
    
    for (const [country, score] of Object.entries(nameObject.countryMap)) {
        const powScore =  Math.pow(2, score);
        dataset[index] = {country: country, score: powScore};
        if (powScore < minValue) {
            minValue = powScore;
        }
        if (powScore > maxValue) {
            maxValue = powScore;
        }
        index++;
    }

    var height = 200;
    if (dataset.length * 20 > height) {
        height = dataset.length * 20;
    }

    var graphColor: [string, string];
    if (nameObject.gender.match("M")) {
        graphColor = ['green', 'blue'];
    } else if (nameObject.gender.match("F")) {
        graphColor = ['pink', 'purple'];
    } else {
        graphColor = ['yellow', 'orange'];
    }
    
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
            series={[{dataKey: "score", label: "Name frequency (% of the population)"}]}
            layout="horizontal"
            width={900}
            height={height}
        />
        </HStack>
        </>
    );
}

export default NameGraph;