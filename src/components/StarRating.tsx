import { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const statContainerStyle = {
  display: "flex",
};

const StarRating = ({
  max = 5,
  defaultRating = 0,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  onSetRating,
}: {
  max: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  onSetRating: (rating: number) => void;
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating: number) => {
    setRating(rating);
    onSetRating(rating);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={statContainerStyle}>
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === max ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
