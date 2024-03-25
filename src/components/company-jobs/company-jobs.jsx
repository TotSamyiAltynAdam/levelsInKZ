import './company-jobs.scss' 

export default function CompanyJobs() {
    return (
        <div className="main__jobs">
            <div className="compenent__title">
                <p>Open Jobs</p>
            </div>
            <hr/>
            <div className="job__links">
                <div className="link">
                    <a href="#">Technical Account Manager, Google Cloud Consulting</a>
                    <p>Google • Bengaluru, Karnataka, India</p>
                </div>

                <div className="link">
                    <a href="#">Senior Software Engineer, Machine Learning, Technology</a>
                    <p>Google • Cracow, Małopolskie, Poland</p>
                </div>

                <div className="link">
                    <a href="#">Cloud Technical Solutions Engineer, Google Workspace</a>
                    <p>Google • Mountain View, CA</p>
                </div>

                <div className="link">
                    <a href="#">Technical Account Manager, Google Cloud Consulting</a>
                    <p>Google • Bengaluru, Karnataka, India</p>
                </div>

            </div>
        </div>
    )
}
