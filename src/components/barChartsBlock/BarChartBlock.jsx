import BarChart from "./BarChart";

import './barChartBlock.scss';

const BarChartBlock = ({selectedCompanies}) => {
    return (
        <div className="listOfBarCharts">
            {selectedCompanies.map((company) => (
                <BarChart company={company} key={company}/>
            ))}
        </div>
    )
}

export default BarChartBlock;