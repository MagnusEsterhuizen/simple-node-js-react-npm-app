
//react
import React from "react";

//nivo
import { ResponsivePie } from "@nivo/pie"

//elements
import SpinnerLoader from "./../../elements/SpinnerLoader/SpinnerLoader";

//presentation
/**
 * (Presentation Component) Shows a donut Chart of Skills
 * @param data  - data objects
 * - data[chartData] - data object for chart
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DonutChart = ({ data, control, render, ...props }) => {
    const { chartData } = data;

    return <>
        <ResponsivePie
            data={chartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={3}
            cornerRadius={3}
            colors={{ scheme: "purples" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#777777"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor={{ from: "color" }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#777777"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: "ruby"
                    },
                    id: "dots"
                },
                {
                    match: {
                        id: "c"
                    },
                    id: "dots"
                },
                {
                    match: {
                        id: "go"
                    },
                    id: "dots"
                },
                {
                    match: {
                        id: "python"
                    },
                    id: "dots"
                },
                {
                    match: {
                        id: "scala"
                    },
                    id: "lines"
                },
                {
                    match: {
                        id: "lisp"
                    },
                    id: "lines"
                },
                {
                    match: {
                        id: "elixir"
                    },
                    id: "lines"
                },
                {
                    match: {
                        id: "javascript"
                    },
                    id: "lines"
                }
            ]}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000"
                            }
                        }
                    ]
                }
            ]}
        />
    </>
}

//container
/**
 * (Container Component) Shows a donut Chart of Skills
 * @param chartData - data object for chart
 * @param props - props extra
 * @return JSX component
 */
export default ({ chartData, ...props }) => {
    if (chartData === undefined) {
        chartData = [
            {
                "id": "python",
                "label": "python",
                "value": 41,
            },
            {
                "id": "javascript",
                "label": "javascript",
                "value": 124,
            },
            {
                "id": "stylus",
                "label": "stylus",
                "value": 354,
            },
            {
                "id": "rust",
                "label": "rust",
                "value": 587,
            },
            {
                "id": "sass",
                "label": "sass",
                "value": 107,
            }
        ];
    }

    if (chartData[0].value) {
        return DonutChart({
            data: {
                chartData
            },
            control: {},
            render: {}
        })
    }
    else {
        return <SpinnerLoader />
    }
}