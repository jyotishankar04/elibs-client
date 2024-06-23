import banner from "../assets/banner.png";

function Banner() {
  return (
    <div className="w-full mt-3 rounded-lg overflow-hidden ">
      <img
        src={banner}
        alt="Photo by Drew Beamer"
        className="rounded-md object-cover object-center w-full max-h-72"
      />
    </div>
  );
}

export default Banner;
