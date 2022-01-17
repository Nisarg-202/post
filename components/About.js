import Image from "next/image";
import classes from "./About.module.css";

export default function About() {
  return (
    <div className={classes.ImageContainerStyle}>
      <div className="text-center">
        <div className={classes.ImageContainer}>
          <Image
            src="/images/profile-image.jpg"
            height={200}
            width={200}
            className={classes.imageStyle}
          />
        </div>
      </div>
      <h3 className="mt-4 text-center">I'm Nisarg!</h3>
    </div>
  );
}
