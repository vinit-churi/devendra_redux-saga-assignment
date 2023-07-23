import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import Octokit from "@octokit/rest";
import { octokit } from "./api";
import axios from "axios";

const CommitChart = ({ owner, repoName }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Function to fetch commit data from GitHub API using Octokit
        const fetchCommitsData = async () => {
            // const octokit = new Octokit();
            try {
                const response = await octokit.request(
                    "GET /repos/{owner}/{repo}/commits",
                    {
                        owner: owner,
                        repo: repoName,
                        headers: {
                            "X-GitHub-Api-Version": "2022-11-28",
                        },
                    }
                );
                console.log("look here", response);
                // Process the fetched commit data
                const commits = response.data;
                const commitCounts = {};
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

                commits.forEach((commit) => {
                    const commitDate = new Date(commit.commit.author.date);
                    if (commitDate >= sixMonthsAgo) {
                        const dateString = commitDate
                            .toISOString()
                            .split("T")[0];
                        commitCounts[dateString] =
                            (commitCounts[dateString] || 0) + 1;
                    }
                });

                const dates = Object.keys(commitCounts);
                const data = dates.map((date) => commitCounts[date]);

                setChartData(data);
            } catch (error) {
                console.error("Error fetching commit data:", error);
            }
        };

        fetchCommitsData();
    }, [owner, repoName]);

    // Highcharts configuration object
    const options = {
        title: {
            text: "Commit Chart for the Last 6 Months",
        },
        xAxis: {
            categories: [
                "6 months ago",
                "5 months ago",
                "4 months ago",
                "3 months ago",
                "2 months ago",
                "Last month",
            ],
        },
        yAxis: {
            title: {
                text: "Number of Commits",
            },
        },
        series: [
            {
                name: "Commits",
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CommitChart;
