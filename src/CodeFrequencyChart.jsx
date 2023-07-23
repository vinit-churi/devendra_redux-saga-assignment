import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import Octokit from "@octokit/rest";
// import axios from "axios";
import { octokit } from "./api";

const CodeFrequencyChart = ({ owner, repoName }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Function to fetch code frequency data from GitHub API using Octokit
        const fetchCodeFrequencyData = async () => {
            try {
                const response = await octokit.request(
                    "GET /repos/{owner}/{repo}/stats/code_frequency",
                    {
                        owner: owner,
                        repo: repoName,
                        headers: {
                            "X-GitHub-Api-Version": "2022-11-28",
                        },
                    }
                );
                console.log("look here closely", response);
                // Process the fetched code frequency data for the last 6 months
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

                const codeFrequency = response.data;
                const codeAdditionsData = codeFrequency
                    .filter((entry) => {
                        const entryDate = new Date(entry[0] * 1000); // Convert timestamp to Date object
                        return entryDate >= sixMonthsAgo;
                    })
                    .map((entry) => [entry[0] * 1000, entry[1]]); // Extract timestamp and additions only

                setChartData(codeAdditionsData);
            } catch (error) {
                console.error("Error fetching code frequency data:", error);
            }
        };

        fetchCodeFrequencyData();
    }, [owner, repoName]);

    // Highcharts configuration object
    const options = {
        title: {
            text: "Code Additions Chart for the Last 6 Months",
        },
        xAxis: {
            type: "datetime",
        },
        yAxis: {
            title: {
                text: "Code Additions",
            },
        },
        series: [
            {
                name: "Code Additions",
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CodeFrequencyChart;
