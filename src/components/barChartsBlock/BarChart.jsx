import BtnLinkToCompany from '../../components/BtnLinkToCompany';

const BarChart = ({company}) => {
    return (
        <div>
            <BtnLinkToCompany key={company} name={company} disable={true}/>
        </div>
    )
}

export default BarChart;