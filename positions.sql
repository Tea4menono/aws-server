CREATE TABLE positions (
  id INT AUTO_INCREMENT,
  lat DECIMAL(9,6),
  lon DECIMAL(9,6),
  alt DECIMAL(5,2),
  timestamp_column TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


-- delete

DROP TABLE positions;


-- add
INSERT INTO positions (lat, lon, alt)
VALUES (51.0867612, -114.05966, 0.156);
