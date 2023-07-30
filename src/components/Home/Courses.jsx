import React from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import randomImg from "../../assets/photo-1510915228340-29c85a43dcfe.avif";

const CourseCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const courseData = [
  {
    title: "Course 1 Title",
    instructor: "Jose Portilla",
    rating: "4.6 (472,470 reviews)",
    currentPrice: "$13.99",
    originalPrice: "$74.99",
  },
  {
    title: "Course 2 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },
  {
    title: "Course 3 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },
  {
    title: "Course 4 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },
  {
    title: "Course 4 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },
  {
    title: "Course 5 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },
  {
    title: "Course 6 Title",
    instructor: "John Doe",
    rating: "4.8 (1000 reviews)",
    currentPrice: "$19.99",
    originalPrice: "$89.99",
  },

  // Add more courses here...
];

const Courses = () => (
  <Row gutter={[16, 16]}>
    {courseData.map((course, index) => (
      <Col key={index} xs={24} sm={12} md={8} lg={6}>
        <CourseCard>
          <img src={randomImg} alt={`Course ${index + 1}`} />
          <h3>{course.title}</h3>
          <p>Instructor: {course.instructor}</p>
          <p>Rating: {course.rating}</p>
          <p>Current price: {course.currentPrice}</p>
          <p>Original price: {course.originalPrice}</p>
        </CourseCard>
      </Col>
    ))}
  </Row>
);

export default Courses;
