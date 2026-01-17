import { motion } from "framer-motion";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZUIwbOnu3BUSDCwFBdeYe2vSgeL2_ldxlA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaLPEw9qbGQ7jPs-Je4ruVQyhGbYbdNWdag&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6PDUViaJL8LP5_6UY4KEuyzQvd5PH9tx0g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6RDXISgzS6ato6wLRwcRQlJq7J1oj_EtUQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7sQqm2T-mA_ha8JsWkDVwcqiBm30Upkkbuw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7BJuqV4bY_vxyTnJJBh9Gg55qmKvu9UySCg&s",
];

export default function ImageSection() {
  return (
    <div style={container}>
      {images.map((imgSrc, index) => (
        <motion.div
          key={index}
          style={box}
          /**
           * Setting the initial keyframe to "null" will use
           * the current value to allow for interruptable keyframes.
           */
          whileHover={{
            scale: [null, 1.1, 1.2],
            transition: {
              duration: 0.5,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <img
            src={imgSrc}
            alt={`Product ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

const container = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  overflowX: "auto",
  maxWidth: "100%",
};

const box = {
  minWidth: "180px",
  width: "180px",
  height: "180px",
  backgroundColor: "#ccc",
  borderRadius: 5,
  overflow: "hidden",
  flexShrink: 0,
};
