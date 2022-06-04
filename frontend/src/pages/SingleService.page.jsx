import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import SingleServiceContent from '../components/SingleServiceContent/SingleService';
import singleServiceImage from '../assets/images/service-details/1.jpg'
import Platform from '../components/Platform/Platform';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import Pricing from '../components/Pricing/Pricing';
import GridImageOne from '../assets/images/service-details/2.jpg';
import GridImageTwo from '../assets/images/service-details/3.jpg';
import GridImageThree from '../assets/images/service-details/4.jpg';
import CallToActionThree from '../components/CallToActions/CallToActionThree/CallToActionThree';
import MoveTop from '../components/MoveTop/MoveTop';
const gridImages = [GridImageOne, GridImageTwo, GridImageThree];

const service = {
    title: 'Expert solution For newsletter Services',
    description: `
        <p>
            <span>M</span>ost managed services firms offer only outsourcing or project management support. What makes our Managed Solutions different
            is that we provide costum newsletter that combine highly regarded consulting solutions and technologies with a vast network of experienced tools in delevring your best attention.
        </p>
        <p>
        A newsletter is a printed or electronic report containing news concerning the activities of a business or an organization that is sent to its members, customers, employees or other subscribers. Newsletters generally contain one main topic of interest to its recipients. A newsletter may be considered grey literature. E-newsletters are delivered electronically via e-mail and can be viewed as spamming if e-mail marketing is sent unsolicited.

        The newsletter is the most common form of serial publication.[5] About two-thirds of newsletters are internal publications, aimed towards employees and volunteers, while about one-third are external publications, aimed towards advocacy or special interest groups
        </p>
    `,
    image: singleServiceImage
}

const SingleService = () => {
    return (
        <>
            {/* Page Banner section  */}
            <BannerTwo pageTitle="Service Details" title="Digital news" />

            {/* Single Service Details section  */}
            <SingleServiceContent singleDetails={service} />

            {/* Platform section  */}
            {/* <Platform /> */}

            {/* Grid Image section  */}
            <ImageGrid images={gridImages} />

            {/* Pricing Section  */}
            <Pricing />

            {/* Call To Action Section  */}
            {/* <CallToActionThree /> */}

            {/* Move to top Section  */}
            <MoveTop/>

        </>
    );
};

export default SingleService;