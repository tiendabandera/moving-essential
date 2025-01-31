import Button from "@/components/Button";
import img from "../assets/img/404-V2.png";

const NotFoundPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 md:flex-row gap-9 lg:gap-x-40">
      <div className="flex flex-col items-center text-center gap-3 md:items-start md:text-left">
        <h3 className="font-medium text-color-1">Page Not Found</h3>
        <h1 className="h1 font-extrabold">
          Oops, buddy! <br /> You’re lost!
        </h1>
        <p>Sorry, we’re unable to locate what you’re looking for.</p>
        <Button href="/" orange>
          Go Home
        </Button>
      </div>
      <img src={img} alt="404" className="w-1/2 md:w-1/3 lg:w-1/4" />
    </div>
  );
};

export default NotFoundPage;
