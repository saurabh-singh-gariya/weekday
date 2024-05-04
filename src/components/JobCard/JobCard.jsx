/* eslint-disable react/prop-types */
import { useState } from "react";
import "./JobCard.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const JobCard = ({ jobDetails }) => {
  const {
    jobRole,
    companyName,
    location,
    jobDetailsFromCompany,
    minExp,
    maxExp,
    jdLink,
    logoUrl,
  } = jobDetails;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" className="card-main">
      <CardContent className="card-body">
        <div className="company-details">
          <img
            src={logoUrl}
            alt={companyName ?? "logo"}
            width={35}
            height={45}
          />
          <div>
            <div className="info-container">
              <h3>{companyName}</h3>
              <h2>{jobRole}</h2>
            </div>
            {location && (
              <Typography color="textSecondary" gutterBottom>
                Location: {location}
              </Typography>
            )}
          </div>
        </div>
        {minExp && maxExp && (
          <Typography color="textSecondary" gutterBottom>
            Experience: {minExp} - {maxExp} years
          </Typography>
        )}
        {jobDetailsFromCompany && (
          <Typography variant="body2" component="p">
            Description: {`${jobDetailsFromCompany.slice(0, 302)}...`}
            <Button size="small" onClick={toggleExpand}>
              Show more
            </Button>
          </Typography>
        )}
      </CardContent>
      <CardActions className="card-footer">
        {jdLink && (
          <Button
            style={{
              width: "100%",
            }}
            variant="contained"
            href={jdLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default JobCard;
