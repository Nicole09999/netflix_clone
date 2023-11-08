import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonMediaGrid from "../components/common/PersonMediaGrid";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import personApi from "../api/modules/person.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import sentimentAnalysisApi from '../api/sentimentalapi.js';


const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.detail({ personId });
      dispatch(setGlobalLoading(false));

      if (err) {
        toast.error(err.message);
      } else if (response) {
        setPerson(response);
        // Perform sentiment analysis on the person's biography
        if (response.biography) {
          try {
            const sentimentAnalysisResult = await sentimentAnalysisApi.analyzeSentiment(response.biography);
            console.log('Sentiment Analysis Result:', sentimentAnalysisResult);
            // Handle the sentiment analysis result as needed
            if (sentimentAnalysisResult && sentimentAnalysisResult.sentiment) {
              if (sentimentAnalysisResult.sentiment === 'positive') {
                // Update the UI or perform actions for positive sentiment
                console.log('The person has a positive sentiment.');
              } else if (sentimentAnalysisResult.sentiment === 'negative') {
                // Update the UI or perform actions for negative sentiment
                console.log('The person has a negative sentiment.');
              } else {
                // Update the UI or perform actions for neutral sentiment
                console.log('The sentiment is neutral or undefined.');
              }
            }
          } catch (error) {
            console.error('Error handling sentiment analysis result:', error);
            // Handle errors related to the sentiment analysis result
          }
        }
      }
    };

    getPerson();
  }, [dispatch, personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" }
            }}>
              <Box sx={{
                width: { xs: "50%", md: "20%" }
              }}>
                <Box sx={{
                  paddingTop: "160%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`
                }} />
              </Box>
              <Box sx={{
                width: { xs: "100%", md: "80%" },
                padding: { xs: "1rem 0", md: "1rem 2rem" }
              }}>
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${person.birthday && person.birthday.split("-")[0]}`}
                    {person.deathday && ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;