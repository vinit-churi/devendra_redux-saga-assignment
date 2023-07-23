import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ContributionChart = ({ data }) => {
    const options = {
        title: {
            text: "My chart",
        },
        series: [
            {
                data: [1, 2, 3],
            },
        ],
    };
    return (
        <div>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
};

export default ContributionChart;
