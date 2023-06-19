-- create positions table

CREATE TABLE positions (
  id INT AUTO_INCREMENT,
  lat DECIMAL(9,6),
  lon DECIMAL(9,6),
  alt DECIMAL(5,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


-- delete
DROP TABLE positions;


-- add
INSERT INTO positions (lat, lon, alt)
VALUES (51.0867612, -114.05966, 0.156);


-- create positions logs
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_type VARCHAR(50),
    message TEXT
);