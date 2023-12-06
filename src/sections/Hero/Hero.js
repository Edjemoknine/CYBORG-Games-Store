import Buttons from "../../components/Buttons/Buttons";
import "./Hero.css";
import logo from "../../images/banner-bg.jpg";
import { SectionWrapper } from "../../components";

const Hero = ({ images, isLoading }) => {
  if (isLoading) return "loading....";
  return (
    <SectionWrapper>
      <div className="hero-main overflow-hidden h-[400px] relative">
        <img
          className="absolute top-0 left-0 w-full  h-full object-cover "
          src={
            `https://imgs.search.brave.com/apfydBbgRkBXfQQ6VwxAF9MtpgzPR9ViKc7fx2FIcgI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGV4ZXJ0by5jb20v/Y2RuLWNnaS9pbWFn/ZS93aWR0aD0zODQw/LHF1YWxpdHk9NzUs/Zm9ybWF0PWF1dG8v/aHR0cHM6Ly9lZGl0/b3JzLmRleGVydG8u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzA5LzA1L2Nh/bGwtb2YtZHV0eS1t/b2Rlcm4td2FyZmFy/ZS0zLTIwMjMtb2Zm/aWNpYWwtcHJvbW8t/YXJ0LTEwMjR4NTc2/LmpwZw` ||
            logo
          }
          alt="banner"
        />
        <div className="w-full left-0 top-0 h-full absolute bg-gradient-to-l  from-slate-800 to-black opacity-60"></div>

        <div className="absolute top-1/2 left-10 -translate-y-1/2 hero-text z-20 ">
          <h6 className="hero-subtitle md:text-xl">Welcome To Cyborg</h6>
          <h4 className="hero-title text-3xl md:text-5xl">
            <em>Browse</em> Our Popular Games Here
          </h4>

          <Buttons text="browse" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
