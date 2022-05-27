import BannerTwo from '../components/Banners/BannerTwo/BannerTwo';
import SkillOne from '../components/Skills/SkillOne/SkillOne';
import PortfolioOne from '../components/Portfolios/PortfolioTwo/PortfolioTwo';
import MoveTop from '../components/MoveTop/MoveTop';

const About = () => {
    return (
        <>
            {/* Page Banner section  */}
            <BannerTwo pageTitle="About Us" title="About" />

            {/*Skill Section  */}
            <SkillOne />


            {/*Portfolio Section  */}
            <PortfolioOne /> 
            
            {/* Move to top Section  */}
            <MoveTop path="/about" />

        </>
    );
};

export default About;