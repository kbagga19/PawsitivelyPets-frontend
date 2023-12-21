import { useState } from "react";
import "../styles/DogCard.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DogCard = ({ dog }) => {
  const [imageSrc, setImageSrc] = useState('')
  const { _id, img, name, age, location, owner, breed } = dog;
  
  useEffect(() => {
    if (img.data) {
      const buffer = new Uint8Array(img.data);
      const blob = new Blob([buffer], { type: 'image/*' });

      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [img.data]);


  // console.log(img)

  return (
    <div className="dog-card">
      <img
        className="dog-image"
        src={imageSrc}
        // src="https://assets.thepetnest.com/W4eaLBwPeVNL6cpwE6s5bwCy?response-content-disposition=inline%3B+filename%3Dpet-image-ac61.jpeg%3B+filename%2A%3DUTF-8%27%27pet-image-ac61.jpeg&response-content-type=image%2Fjpeg&Expires=1703095145&Signature=bdvTVD8vGZ2uVXqXKJQiNBeBUrV8xz0W3Ad7jlXiRCZvyf9ZFtHJ-HXwSNrbGijy1R9DJsoy8K62jgC~4P0DthusayiL-F0IeMJqdtM9kjPFiPcoZGmVfpLjjRRsb0ePj8pdG-ki5mJvz0WNvvRDlw39cDq6qiZsidmPxjbSBbmnsvFlUmrZjkjmc5FsFrgTCs5RprxpkDpwtl3~vGSkYDTzv3B9lDs9eftFCoJ07PsBEhRzqadKG5Gmm2EfQt9R~~VS4KB96cPwT333uPNExNqrEkxb7Q1DFso0iJcQLJLhPDzfx68IjtE3Ww3YZ6jeS3M5CbBa3M4VEI-u9KE0zQ__&Key-Pair-Id=APKAQBSFVNAXXGJKQ7XK"
        alt={name}
      />
      <div className="dog-details">
        <h2 className="dog-name">{name}</h2>
        <p>Age: {age}</p>
        <p>
          Breed: {breed}
        </p>
        <div className="owner-details">
          <hr className="owner-line" />
          <p>Location: {location}</p>
          {/* <p>Contact: {owner.phone}</p> */}
        </div>
      </div>
      <Link to={`/pets/${_id}`}>
        <button>View more</button>
      </Link>
    </div>
  );
};

export default DogCard;
