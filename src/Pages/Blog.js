import React from "react";
import "../Style/BlogPage.css";

const Blog = () => {
  return (
    <div className="blog-page">
      <h1>Latest Fashion Trends</h1>
      <section className="trend">
        <h2>1. Sustainable Fashion</h2>
        <p>
          Sustainable fashion is all about creating a system which can be
          supported indefinitely in terms of human impact on the environment and
          social responsibility. Brands are now focusing on eco-friendly
          materials and ethical production processes.
        </p>
      </section>
      <section className="trend">
        <h2>2. Bold Colors</h2>
        <p>
          This season, bold and vibrant colors are making a statement. From
          bright yellows to deep blues, incorporating bold colors into your
          wardrobe can add a fresh and energetic vibe.
        </p>
      </section>
      <section className="trend">
        <h2>3. Vintage Revival</h2>
        <p>
          Vintage fashion is making a comeback. From retro prints to classic
          silhouettes, vintage-inspired pieces are becoming a staple in modern
          wardrobes.
        </p>
      </section>
      <section className="trend">
        <h2>4. Athleisure</h2>
        <p>
          Athleisure continues to dominate the fashion scene. Combining comfort
          with style, athleisure pieces are perfect for both workouts and casual
          outings.
        </p>
      </section>
      <section className="trend">
        <h2>5. Statement Accessories</h2>
        <p>
          Accessories are taking center stage this season. From oversized hats
          to chunky jewelry, statement accessories can elevate any outfit.
        </p>
      </section>
    </div>
  );
};

export default Blog;
