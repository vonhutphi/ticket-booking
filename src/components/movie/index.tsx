import React, { useEffect } from "react";
import { Carousel, Row, Col } from "antd";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMovieListAction } from "../../redux/movieSlice";
import * as Styled from "./styled";
import MovieItem from "./movie-item";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PrevArrow = ({ onClick }: any) => {
  return (
    <div className="arrow left-arrow" onClick={onClick}>
      <LeftOutlined />
    </div>
  );
};

const NextArrow = ({ onClick }: any) => {
  return (
    <div className="arrow right-arrow" onClick={onClick}>
      <RightOutlined />
    </div>
  );
};
const MovieList = () => {
  const {
    movie: { data },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Styled.MovieList className="container">
      <Carousel draggable arrows {...settings}>
        {_.chunk(data, 8).map((m, idx) => {
          return (
            <div className="movie-slide" key={idx}>
              <Row gutter={[40, 40]}>
                {m.map((movie, index) => {
                  return (
                    <Col span={6} key={index}>
                      <MovieItem movie={movie} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        })}
      </Carousel>
    </Styled.MovieList>
  );
};

export default MovieList;
