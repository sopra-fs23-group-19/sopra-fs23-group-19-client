import "styles/views/Login.scss";
import cats from "styles/images/cats1.png";
import BaseContainer from "components/ui/BaseContainer";
const Maintenance = () => {
  return (
    <BaseContainer>
      <div className="login pic">
        <img src={cats} alt="" />
      </div>
      <div className="login title">
        <div class="login writing-letters">
          <span>D</span>
          <span>r</span>
          <span>a</span>
          <span>w</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>&</span>
          <span>G</span>
          <span>u</span>
          <span>e</span>
          <span>s</span>
          <span>s</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
      <div className="login container">
        <h1 className="login label_1">We&rsquo;ll be back soon!</h1>
        <div>
          <label className="login label_1">
            Sorry for the inconvenience, but we&rsquo;re performing some
            maintenance at the moment. If you need help, you can always{" "}
            <a href="mailto:runze.li@uzh.ch">contact us</a>, otherwise
            we&rsquo;ll be back online shortly!
          </label>
          <p className="login label_1">&mdash; The Team</p>
        </div>
      </div>
    </BaseContainer>
  );
};
export default Maintenance;
